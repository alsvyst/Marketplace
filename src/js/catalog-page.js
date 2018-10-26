const catalogContainer = document.querySelector('.catalog .row');
const aside = catalogContainer.querySelector('aside');
const filters = document.querySelector('.filters');

document.addEventListener('DOMContentLoaded', function(){
  renderCatalog();
  setOrder();

  aside.style.order = '4';

  if (window.innerWidth <= 1024 && window.innerWidth >= 768) {
    aside.style.order = '3';
  }
  if (window.innerWidth < 768) {
    aside.style.order = '2';
  }
});

window.addEventListener('resize', function(){
  if (window.innerWidth < 768) {
    aside.style.order = '2';
  }
  if (window.innerWidth <= 1024 && window.innerWidth >= 768) {
    aside.style.order = '3';
  }
  if (window.innerWidth > 1024) {
    aside.style.order = '4';
  }
});

filters.addEventListener('click', function (e) {
  if (e.target.closest('.main-filter .filter-option')) {
    select(e.target);
  }
  if (e.target.closest('.mobile-filter .filter-item')) {
    const mobileFilter = e.target.closest('.mobile-filter');
    mobileFilter.classList.add('mobile-open');
  }
  if (e.target.closest('.mobile-filter .filter-option')) {
    mobileSelect(e.target);
  }
  if (e.target.closest('.close')) {
    const mobileFilter = e.target.closest('.mobile-filter');
    mobileFilter.classList.remove('mobile-open');
  }
});

function select(option) {
  const select = option.closest('.filter-item');
  const btnValue = select.querySelector('.selected-value');
  const options = select.querySelectorAll('.filter-option');

  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove('active');
  }

  if (option.innerText === 'Not selected') {
    select.classList.remove('selected');
    btnValue.innerText = '';
  } else {
    option.classList.add('active');
    select.classList.add('selected');

    btnValue.innerText = option.innerText;
  }
}

function mobileSelect(option) {
  const list = option.closest('ul').querySelectorAll('li');
  const value = option.innerText;
  const dataset = option.closest('.mobile-filter-options').dataset.select;
  const btnValue = filters.querySelector(`[data-select="${dataset}"]`);

  for (let i = 0; i < list.length; i++) {
    list[i].classList.remove('active');
  }
  option.classList.add('active');

  if (value === 'Not selected') {
    btnValue.innerText = option.closest('.mobile-filter-options').querySelector('span').innerText;
    btnValue.classList.remove('active');
  } else {
    btnValue.innerText = value;
    btnValue.classList.add('active');
  }
}

function renderCatalog() {
  const currentArr = window.catalog.filter(el => {
    return el.category === 'women' && el.fashion === 'Casual style';
  });

  currentArr.sort( function (a, b) {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  currentArr.forEach(item => {
    catalogContainer.insertAdjacentHTML('beforeend', createCard(item));
  })
}

function setOrder() {
  const catalogList = catalogContainer.querySelectorAll('.card');
  for (let i = 0; i < catalogList.length; i++) {
    catalogList[i].style.order = i;
  }
}