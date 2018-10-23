const bag = document.querySelector('.shopping-bag');
const bagList = bag.querySelector('.shopping-bag-list .container');
const clearBagBtn = document.querySelector('#empty');
const byBtn = document.querySelector('#byNow');
const totalBagPrice = document.querySelector('.total-price .total .price');
const totalBagDiscout = document.querySelector('.total-price .discount .price');

bag.addEventListener('click', (e) => {
  if (e.target.closest('.quantity-plus') || e.target.closest('.quantity-minus')) {
    e.preventDefault();
    if (e.target.closest('.quantity-plus')) {
      recountBag(e.target.closest('.card'));
    } else {
      recountBag(e.target.closest('.card'), -1);
    }
  }

  if (e.target.closest('.remove')) {
    e.preventDefault();
    removeItem(e.target.closest('.card'));
  }
});

clearBagBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearBag('Your shopping bag is empty. Use Catalog to add new items');
});

byBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearBag('Thank you for your purchase');
});

function recountBag(card, symbol = 1) {
  const input = card.querySelector('input');

  if (+input.value <= 1 && symbol === -1) {
    return;
  }

  const itemTitle = card.querySelector('.card-title').innerText;
  const itemPrice = getItem(itemTitle).discountedPrice;


  recountHeaderBag(itemPrice, symbol);
  recountTotalPrice(itemPrice, symbol);

  input.value = +(input.value) + symbol;
}

function clearBag(message) {

  if (!bagList.querySelector('.text-empty')) {
    bagList.innerHTML = `<p class="text-empty">${message}</p>`;

    totalCost.innerText = '';
    totalItems.innerText = '0';

    totalBagPrice.innerText = '0';
    totalBagDiscout.innerText = '0';
  }
}

function recountTotalPrice(itemCost, symbol = 1, quantity = 1) {
  totalBagDiscout.innerText = '£15.00';
  totalBagPrice.innerText = '£' + (+totalBagPrice.innerText.slice(1) + itemCost * symbol * quantity).toFixed(2);
}

function removeItem(item) {
  const title = item.querySelector('.card-title').innerText;
  const quantity = +item.querySelector('input').value;
  const itemsPrice = getItem(title).discountedPrice;

  recountTotalPrice(itemsPrice, -1, quantity);
  recountHeaderBag(itemsPrice, -1, quantity);

  item.outerHTML = '';

  if (!bagList.children.length) {
    clearBag('Your shopping bag is empty. Use Catalog to add new items');
  }
}