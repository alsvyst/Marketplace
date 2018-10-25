const catalogContainer = document.querySelector('.catalog .row');
const filters = document.querySelector('.filters');
const aside = catalogContainer.querySelector('aside');

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
  if (e.target.closest('.filter-option')) {
    select(e.target);
  }
});

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
  catalogList.forEach((el, pos) => {
    el.style.order = pos;
  });
}