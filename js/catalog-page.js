const catalogContainer = document.querySelector('.catalog .row');
const filters = document.querySelector('.filters');

document.addEventListener('DOMContentLoaded', function(){
  renderCatalog();

  if (window.innerWidth <= 1024) {
    changeOrderInTabletCatalog();
  }
  if (window.innerWidth < 768) {
    changeOrderInMobileCatalog()
  }
});

window.addEventListener('resize', function(){
  if (window.innerWidth <= 1024) {
    changeOrderInTabletCatalog();
  }
  if (window.innerWidth < 768) {
    changeOrderInMobileCatalog();
  }
  if (window.innerWidth > 1024) {
    returnOrderInCatalog();
  }
});

filters.addEventListener('click', function (e) {
  if (e.target.closest('.filter-option')) {
    select(e.target);
  }
});

function changeOrderInTabletCatalog() {
  const catalogList = Array.from(catalogContainer.children);
  catalogList.forEach((el, pos) => {
    el.style.order = pos;
  });
  catalogList[3].style.order = 4;
  catalogList[4].style.order = 3;
}

function changeOrderInMobileCatalog() {
  const catalogList = Array.from(catalogContainer.children);
  catalogList.forEach((el, pos) => {
    el.style.order = pos;
  });
  catalogList[2].style.order = 3;
  catalogList[3].style.order = 4;
  catalogList[4].style.order = 2;
}

function returnOrderInCatalog() {
  const catalogList = Array.from(catalogContainer.children);
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

function renderCatalog() {
  const currentArr = window.catalog.filter(el => {
    return el.category === 'women' && el.fashion === 'Casual style';
  });

  currentArr.sort( function (a, b) {
    return new Date(b.dateAdded) - new Date(a.dateAdded);
  });

  currentArr.forEach(item => {
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
                      <span>£${(item.discountedPrice || item.price).toFixed(2)}</span>
                  </div>
              </div>
          </a>
      </div>
    `;

    catalogContainer.insertAdjacentHTML('beforeend', template);
  })
}