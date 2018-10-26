'use strict';

var bag = document.querySelector('.shopping-bag');
var bagList = bag.querySelector('.shopping-bag-list .container');
var clearBagBtn = document.querySelector('#empty');
var byBtn = document.querySelector('#byNow');
var totalBagPrice = document.querySelector('.total-price .total .price');
var totalBagDiscount = document.querySelector('.total-price .discount');

(function () {
  var bag = getShoppingBag();
  if (bag.items.length) {
    renderBagCards();
    setTotalPrice(bag);
  } else {
    showMessage('Your shopping bag is empty. Use Catalog to add new items');
  }
})();

bag.addEventListener('click', function (e) {
  if (e.target.closest('.quantity-plus') || e.target.closest('.quantity-minus')) {
    e.preventDefault();
    var card = e.target.closest('.card');
    var title = card.querySelector('.card-title').innerText;
    var color = card.querySelector('.color').innerText.slice(7);
    var size = card.querySelector('.size').innerText.slice(6);
    var input = e.target.closest('.quantity').querySelector('input');
    if (e.target.closest('.quantity-plus')) {
      setTotalPrice(recountNumbers(title, color, size));
      input.value = +input.value + 1;
    } else if (input.value !== '1') {
      setTotalPrice(recountNumbers(title, color, size, -1));
      input.value = +input.value - 1;
    }
  }

  if (e.target.closest('.remove')) {
    e.preventDefault();
    removeItem(e.target.closest('.card'));
  }
});

clearBagBtn.addEventListener('click', function (e) {
  e.preventDefault();
  clearBag();
  showMessage('Your shopping bag is empty. Use Catalog to add new items');
});

byBtn.addEventListener('click', function (e) {
  e.preventDefault();
  clearBag();
  showMessage('Thank you for your purchase');
});

function showMessage(message) {
  if (!bagList.querySelector('.text-empty')) {
    bagList.innerHTML = '<p class="text-empty">' + message + '</p>';
  }
}

function clearBag() {
  var bag = getShoppingBag();
  bag.items = [];
  bag.discount = false;
  recountTotalBagCost(bag);
  setTotalPrice(bag);
  localStorage.setItem('bag', JSON.stringify(bag));
}

function removeItem(item) {
  var title = item.querySelector('.card-title').innerText;
  var color = item.querySelector('.color').innerText.slice(7);
  var size = item.querySelector('.size').innerText.slice(6);
  var bag = getShoppingBag();

  bag.items = bag.items.filter(function (item) {
    return !(item.title === title && item.toBag.color === color && item.toBag.size === size);
  });

  recountTotalBagCost(bag);
  setTotalPrice(bag);
  localStorage.setItem('bag', JSON.stringify(bag));

  item.outerHTML = '';

  if (!bagList.children.length) {
    showMessage('Your shopping bag is empty. Use Catalog to add new items');
  }
}

function renderBagCards() {
  var bag = getShoppingBag();
  bag.items.forEach(function (item) {
    var template = '\n                <div class="card  ' + (item.hasNew ? 'new' : '') + '">\n                    <a href="item.html">\n                        <div class="card-image">\n                            <img src="' + item.thumbnail + '" alt="">\n                        </div>\n                        <div class="card-title">\n                            <span>' + item.title + '</span>\n                        </div>\n                    </a>\n                    <div class="card-price">\n                        <span>\xA3' + item.discountedPrice.toFixed(2) + '</span>\n                    </div>\n                    <div class="card-options">\n                        <span class="color">Color: ' + item.toBag.color + '</span>\n                        <span class="size">Size: ' + item.toBag.size + '</span>\n                        <div class="quantity">\n                            <span>Quantity:</span>\n                            <button class="quantity-minus"><img src="img/icons/minus.png" alt=""></button>\n                            <input type="number" value="' + item.toBag.number + '" readonly>\n                            <button class="quantity-plus"><img src="img/icons/plus.png" alt=""></button>\n                        </div>\n                    </div>\n                    <button class="remove title">Remove item</button>\n                </div>\n    ';

    bagList.insertAdjacentHTML('beforeend', template);
  });
}

function setTotalPrice(bag) {
  totalBagDiscount.innerHTML = bag.discount ? '\n  <span>Applied discount:</span>\n  <span class="price">\xA3' + window.bestOffer.discount.toFixed(2) + '</span>\n  ' : '';
  totalBagPrice.innerText = '\xA3' + (bag.totalCost - (bag.discount ? window.bestOffer.discount : 0)).toFixed(2);
}