'use strict';

var header = document.querySelector('header');
var mobileMenu = header.querySelector('.mobile-menu-content');
var search = header.querySelector('.search-form');
var searchBtn = search.querySelector('button');
var addBtns = document.querySelectorAll('.add-to');
var totalCost = header.querySelector('#totalCost');
var totalItems = header.querySelector('#totalItems');
var photography = document.querySelector('.item-photography');

if (window.Element && !Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this;
    do {
      i = matches.length;
      while (--i >= 0 && matches.item(i) !== el) {};
    } while (i < 0 && (el = el.parentElement));
    return el;
  };
}

(function () {
  var bag = getShoppingBag();
  setHeaderBagCost(bag.totalCost - (bag.discount ? bestOffer.discount : 0), bag.totalItems);
})();

header.addEventListener('click', function (e) {
  if (e.target.closest('.mobile-menu-btn')) {
    e.preventDefault();
    mobileMenu.classList.toggle('open');
  }
});

searchBtn.addEventListener('click', function (e) {
  e.preventDefault();
  if (window.innerWidth <= 1024 && window.innerWidth > 767) {
    search.classList.toggle('open');
  }
});

if (addBtns.length) {
  addBtns.forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      var info = e.target.closest('.item-info');
      var itemTitle = info.querySelector('.item-title').innerText;
      var size = 'UK ' + info.querySelector('#itemSize input:checked').value;
      var color = info.querySelector('#itemColor input:checked').value;

      if (!recountNumbers(itemTitle, color, size, 1)) {
        var item = getItem(itemTitle);
        item.toBag = {
          color: color,
          size: size,
          number: 1
        };
        addToBag(item);
      }
    });
  });
}

if (photography) {
  photography.addEventListener('click', function (e) {
    if (e.target.closest('.preview-image')) {
      var element = e.target.closest('.preview-image');
      changePreviewImage(element);
    }
  });
}

function setHeaderBagCost(price, quantity) {
  totalItems.innerText = quantity;
  totalCost.innerText = price ? '\xA3' + price.toFixed(2) : '';
}

function recountTotalBagCost(bag) {
  bag.totalCost = 0;
  bag.totalItems = 0;
  bag.discount = false;

  var discountCounter = 0;

  bag.items.forEach(function (item) {
    bag.totalCost += item.discountedPrice * item.toBag.number;
    bag.totalItems = bag.totalItems + item.toBag.number;

    if (window.bestOffer.left.some(function (id) {
      return id === item.id;
    })) {
      discountCounter++;
    }

    if (window.bestOffer.right.some(function (id) {
      return id === item.id;
    })) {
      discountCounter++;
    }
  });

  if (discountCounter >= 2) {
    bag.discount = true;
  }

  setHeaderBagCost(bag.totalCost - (bag.discount ? window.bestOffer.discount : 0), bag.totalItems);
}

function getItem(title) {
  var currentItem = void 0;
  window.catalog.forEach(function (item) {
    if (item.title === title) {
      currentItem = item;
    }
  });

  return currentItem;
}

function getItemById(id) {
  var currentItem = void 0;
  window.catalog.forEach(function (item) {
    if (item.id === id) {
      currentItem = item;
    }
  });

  return currentItem;
}

function changePreviewImage(element) {
  var list = photography.querySelectorAll('.preview-image');
  var full = photography.querySelector('.full');

  list.forEach(function (el) {
    el.classList.remove('active-image');
  });
  full.innerHTML = element.innerHTML;
  element.classList.add('active-image');
}

function createCard(item) {
  var template = '\n      <div class="card ' + (item.hasNew ? 'new' : '') + '">\n          <a href="item.html">\n              <div class="card-image">\n                  <img src="' + item.thumbnail + '" alt="">\n              </div>\n              <div class="card-description">\n                  <div class="card-title">\n                      <span>' + item.title + '</span>\n                  </div>\n                  <div class="card-price">\n                      <span class="line-through">' + (item.price !== item.discountedPrice ? item.price.toFixed(2) : '') + '</span><span>\xA3' + item.discountedPrice.toFixed(2) + '</span>\n                  </div>\n              </div>\n          </a>\n      </div>\n    ';

  return template;
}

function addToBag(item) {
  var currentBag = getShoppingBag();

  currentBag.items.push(item);
  recountTotalBagCost(currentBag);

  localStorage.setItem('bag', JSON.stringify(currentBag));

  return currentBag;
}

function getShoppingBag() {
  var shoppingBag = void 0;
  if (!localStorage.getItem('bag')) {
    shoppingBag = {
      items: [],
      totalCost: 0,
      totalItems: 0,
      discount: false
    };
  } else {
    shoppingBag = JSON.parse(localStorage.getItem('bag'));
  }

  return shoppingBag;
}

function recountNumbers(title, color, size) {
  var symbol = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  var result = 0;

  var bag = getShoppingBag();
  bag.items.forEach(function (item) {
    if (item.title === title && item.toBag.color === color && item.toBag.size === size) {

      if (item.number === 1 && symbol === -1) {
        return;
      }

      item.toBag.number = item.toBag.number + symbol;
      recountTotalBagCost(bag);
      localStorage.setItem('bag', JSON.stringify(bag));
      result = bag;
    }
  });

  return result;
}