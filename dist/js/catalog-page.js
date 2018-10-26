'use strict';

var catalogContainer = document.querySelector('.catalog .row');
var aside = catalogContainer.querySelector('aside');
var filters = document.querySelector('.filters');

document.addEventListener('DOMContentLoaded', function () {
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

window.addEventListener('resize', function () {
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
    var mobileFilter = e.target.closest('.mobile-filter');
    mobileFilter.classList.add('mobile-open');
  }
  if (e.target.closest('.mobile-filter .filter-option')) {
    mobileSelect(e.target);
  }
  if (e.target.closest('.close')) {
    var _mobileFilter = e.target.closest('.mobile-filter');
    _mobileFilter.classList.remove('mobile-open');
  }
});

function select(option) {
  var select = option.closest('.filter-item');
  var btnValue = select.querySelector('.selected-value');
  var options = select.querySelectorAll('.filter-option');

  options.forEach(function (opt) {
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

function mobileSelect(option) {
  var list = option.closest('ul').querySelectorAll('li');
  var value = option.innerText;
  var dataset = option.closest('.mobile-filter-options').dataset.select;
  var btnValue = filters.querySelector('[data-select="' + dataset + '"]');

  list.forEach(function (opt) {
    opt.classList.remove('active');
  });
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
  var currentArr = window.catalog.filter(function (el) {
    return el.category === 'women' && el.fashion === 'Casual style';
  });

  currentArr.sort(function (a, b) {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  currentArr.forEach(function (item) {
    catalogContainer.insertAdjacentHTML('beforeend', createCard(item));
  });
}

function setOrder() {
  var catalogList = catalogContainer.querySelectorAll('.card');
  catalogList.forEach(function (el, pos) {
    el.style.order = pos;
  });
}