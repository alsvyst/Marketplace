const bag = document.querySelector('.shopping-bag');
const bagList = bag.querySelector('.shopping-bag-list .container');
const clearBagBtn = document.querySelector('#empty');
const byBtn = document.querySelector('#byNow');
const totalBagPrice = document.querySelector('.total-price .total .price');
const totalBagDiscount = document.querySelector('.total-price .discount');

(function () {
  const bag = getShoppingBag();
  if (bag.items.length) {
    renderBagCards();
    setTotalPrice(bag);
  } else {
    showMessage('Your shopping bag is empty. Use Catalog to add new items');
  }
})();

bag.addEventListener('click', (e) => {
  if (e.target.closest('.quantity-plus') || e.target.closest('.quantity-minus')) {
    e.preventDefault();
    const card = e.target.closest('.card');
    const title = card.querySelector('.card-title').innerText;
    const color = card.querySelector('.color').innerText.slice(7);
    const size = card.querySelector('.size').innerText.slice(6);
    const input = e.target.closest('.quantity').querySelector('input');
    if (e.target.closest('.quantity-plus')) {
      setTotalPrice(recountNumbers(title, color, size));
      input.value = +(input.value) + 1;
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

clearBagBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearBag();
  showMessage('Your shopping bag is empty. Use Catalog to add new items');
});

byBtn.addEventListener('click', (e) => {
  e.preventDefault();
  clearBag();
  showMessage('Thank you for your purchase');
});

function showMessage(message) {
  if (!bagList.querySelector('.text-empty')) {
    bagList.innerHTML = `<p class="text-empty">${message}</p>`;
  }
}

function clearBag() {
  const bag = getShoppingBag();
  bag.items = [];
  bag.discount = false;
  recountTotalBagCost(bag);
  setTotalPrice(bag);
  localStorage.setItem('bag', JSON.stringify(bag));
}

function removeItem(item) {
  const title = item.querySelector('.card-title').innerText;
  const color = item.querySelector('.color').innerText.slice(7);
  const size = item.querySelector('.size').innerText.slice(6);
  const bag = getShoppingBag();

  bag.items = bag.items.filter(item => {
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
  const bag = getShoppingBag();
  bag.items.forEach(item => {
    const template = `
                <div class="card  ${item.hasNew ? 'new' : ''}">
                    <a href="item.html">
                        <div class="card-image">
                            <img src="${item.thumbnail}" alt="">
                        </div>
                        <div class="card-title">
                            <span>${item.title}</span>
                        </div>
                    </a>
                    <div class="card-price">
                        <span>£${(item.discountedPrice).toFixed(2)}</span>
                    </div>
                    <div class="card-options">
                        <span class="color">Color: ${item.toBag.color}</span>
                        <span class="size">Size: ${item.toBag.size}</span>
                        <div class="quantity">
                            <span>Quantity:</span>
                            <button class="quantity-minus"><img src="img/icons/minus.png" alt=""></button>
                            <input type="number" value="${item.toBag.number}" readonly>
                            <button class="quantity-plus"><img src="img/icons/plus.png" alt=""></button>
                        </div>
                    </div>
                    <button class="remove title">Remove item</button>
                </div>
    `;

    bagList.insertAdjacentHTML('beforeend', template);
  })
}

function setTotalPrice(bag) {
  totalBagDiscount.innerHTML = bag.discount ? `
  <span>Applied discount:</span>
  <span class="price">£${(window.bestOffer.discount).toFixed(2)}</span>
  ` : '';
  totalBagPrice.innerText = `£${(bag.totalCost - (bag.discount ? window.bestOffer.discount : 0)).toFixed(2)}`;
}