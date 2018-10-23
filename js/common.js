const header = document.querySelector('header');
const mobileMenu = header.querySelector('.mobile-menu-content');
const search = header.querySelector('.search-form');
const searchBtn = search.querySelector('button');
const addBtns = document.querySelectorAll('.add-to');
const totalCost = header.querySelector('#totalCost');
const totalItems = header.querySelector('#totalItems');
const photography = document.querySelector('.item-photography');

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

      const itemTitle = e.target.closest('.item-info').querySelector('.item-title').innerText;

      recountHeaderBag(getItem(itemTitle).discountedPrice);
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

function recountHeaderBag(itemCost, symbol = 1, quantity = 1) {
  totalItems.innerText = +totalItems.innerText + symbol * quantity;
  totalCost.innerText = '£' + (+totalCost.innerText.slice(1) + itemCost * symbol * quantity).toFixed(2);
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

function changePreviewImage(element) {
  const list = photography.querySelectorAll('.preview-image');
  const full = photography.querySelector('.full');

  list.forEach(el => {
    el.classList.remove('active-image');
  });
  full.innerHTML = element.innerHTML;
  element.classList.add('active-image');
};