const header = document.querySelector('header');
const mobileMenu = header.querySelector('.mobile-menu-content');
const search = header.querySelector('.search-form');
const searchBtn = search.querySelector('button');
const addBtns = document.querySelectorAll('.add-to');
const totalCost = header.querySelector('#totalCost');
const totalItems = header.querySelector('#totalItems');
const photography = document.querySelector('.item-photography');

(function () {
  const bag = getShoppingBag();
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
  addBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();

      const info = e.target.closest('.item-info');
      const itemTitle = info.querySelector('.item-title').innerText;
      const size = info.querySelector('#itemSize input:checked').value;
      const color = info.querySelector('#itemColor input:checked').value;

      if (!recountNumbers(itemTitle, color, size, 1)) {
        const item = getItem(itemTitle);
        item.toBag = {
          color: color || item.colors[0],
          size: size || item.sizes[0],
          number: 1
        };
        addToBag(item);
      }
    })
  })
}

if (photography) {
  photography.addEventListener('click', function (e) {
    if (e.target.closest('.preview-image')) {
      const element = e.target.closest('.preview-image');
      changePreviewImage(element);
    }
  })
}

function setHeaderBagCost(price, quantity) {
  totalItems.innerText = quantity;
  totalCost.innerText = `£${price.toFixed(2)}`;
}

function recountTotalBagCost(bag) {
  bag.totalCost = 0;
  bag.totalItems = 0;
  bag.items.forEach(item => {
    bag.totalCost += item.discountedPrice * item.toBag.number;
    bag.totalItems = bag.totalItems + item.toBag.number;
  });

  setHeaderBagCost(bag.totalCost - (bag.discount ? window.bestOffer.discount : 0), bag.totalItems);
}

function getItem(title) {
  let currentItem;
  window.catalog.forEach(item => {
    if (item.title === title) {
      currentItem = item;
    }
  });

  return currentItem;
}

function getItemById(id) {
  let currentItem;
  window.catalog.forEach(item => {
    if (item.id === id) {
      currentItem = item;
    }
  });

  return currentItem;
}

function changePreviewImage(element) {
  const list = photography.querySelectorAll('.preview-image');
  const full = photography.querySelector('.full');

  list.forEach(el => {
    el.classList.remove('active-image');
  });
  full.innerHTML = element.innerHTML;
  element.classList.add('active-image');
}

function createCard(item) {
  const template = `
      <div class="card ${item.hasNew ? 'new' : ''}">
          <a href="item.html">
              <div class="card-image">
                  <img src="${item.thumbnail}" alt="">
              </div>
              <div class="card-description">
                  <div class="card-title">
                      <span>${item.title}</span>
                  </div>
                  <div class="card-price">
                      <span class="line-through">${item.price !== item.discountedPrice ? (item.price).toFixed(2) : ''}</span><span>£${(item.discountedPrice).toFixed(2)}</span>
                  </div>
              </div>
          </a>
      </div>
    `;

  return template;
}

function addToBag(item) {
  const currentBag = getShoppingBag();

  currentBag.items.push(item);
  recountTotalBagCost(currentBag);

  localStorage.setItem('bag', JSON.stringify(currentBag));

  return currentBag;
}

function getShoppingBag() {
  let shoppingBag;
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

function recountNumbers(title, color, size, symbol = 1) {
  let result = 0;

  const bag = getShoppingBag();
  bag.items.forEach(item => {
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