const header = document.querySelector('header');
const mobileMenu = header.querySelector('.mobile-menu-content');
const search = header.querySelector('.search-form');
const searchBtn = search.querySelector('button');
const catalog = document.querySelector('.catalog .row');
const filters = document.querySelector('.filters');
const addBtns = document.querySelectorAll('.add-to');
const totalCost = header.querySelector('#totalCost');
const totalItems = header.querySelector('#totalItems');

document.addEventListener('DOMContentLoaded', function(){
  if (window.innerWidth <= 1024 && catalog) {
    changeOrderInTabletCatalog();
  }
  if (window.innerWidth < 768 && catalog) {
    changeOrderInMobileCatalog()
  }
});

window.addEventListener('resize', function(){
  if (window.innerWidth <= 1024 && catalog) {
    changeOrderInTabletCatalog();
  }
  if (window.innerWidth < 768 && catalog) {
    changeOrderInMobileCatalog();
  }
  if (window.innerWidth > 1024 && catalog) {
    returnOrderInCatalog();
  }
});

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

if (filters) {
  filters.addEventListener('click', function (e) {
    if (e.target.closest('.filter-option')) {
      select(e.target);
    }
  });
}

if (addBtns.length) {
  addBtns.forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      addToBag();
    })
  })
}

function changeOrderInTabletCatalog() {
  const catalogList = Array.from(catalog.children);
  catalogList.forEach((el, pos) => {
    el.style.order = pos;
  });
  catalogList[3].style.order = 4;
  catalogList[4].style.order = 3;
}

function changeOrderInMobileCatalog() {
  const catalogList = Array.from(catalog.children);
  catalogList.forEach((el, pos) => {
    el.style.order = pos;
  });
  catalogList[2].style.order = 3;
  catalogList[3].style.order = 4;
  catalogList[4].style.order = 2;
}

function returnOrderInCatalog() {
  const catalogList = Array.from(catalog.children);
  catalogList.forEach((el, pos) => {
    el.style.order = pos;
  });
}

function select(option) {
  const select = option.closest('.filter-item');
  const btnValue = select.querySelector('.selected-value');
  const options = select.querySelectorAll('.filter-option');

  options.forEach(opt => {
    opt.classList.remove('active');
  });

  if (option.innerText === 'Not selected') {
    select.classList.remove('selected');
    btnValue.innerText = '';
  } else {
    option.classList.add('active');
    select.classList.add('selected');

    btnValue.innerText = option.innerText;
  }
}

function addToBag() {
  let itemCost;
  window.catalog.forEach(item => {
    if (item.title === 'Dark classic fit suit') {
      itemCost = item.discountedPrice;
    }
  });

  totalItems.innerText = +totalItems.innerText + 1;
  totalCost.innerText = '£' + (+totalCost.innerText.slice(1) + itemCost).toFixed(2);
}