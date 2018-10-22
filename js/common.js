const catalog = document.querySelector('.catalog .row');
const header = document.querySelector('header');
const body = document.querySelector('body');

document.addEventListener('DOMContentLoaded', function(){
  if (window.innerWidth <= 1024 && catalog) {
    changeOrderInTabletCatalog();
  }
  if (window.innerWidth < 768 && catalog) {
    changeOrderInMobileCatalog()
  }
  if (window.innerWidth < 768 && !document.querySelector('.mobile-menu-btn')) {
    addMobileMenu();
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
  if (window.innerWidth <= 767 && !document.querySelector('.mobile-menu-btn')) {
    addMobileMenu();
  }
});

header.addEventListener('click', function (e) {
  if (e.target.classList.contains('mobile-menu-btn')) {
    e.preventDefault();
    header.querySelector('.mobile-menu-content').style.display = header.querySelector('.mobile-menu-content').style.display === 'flex' ? 'none' : 'flex';
    body.style.overflowY = body.style.overflowY === 'hidden' ? 'scroll' : 'hidden';
  }
});

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

function addMobileMenu() {
  const container = document.querySelector('.header-top');
  const menuContent = document.querySelector('.mobile-menu-content');

  const template = `
        <div class="mobile-menu">
              <button class="mobile-menu-btn">
                    <span></span>
                    <span></span>
                    <span></span>
              </button>
              ${menuContent.outerHTML}
        </div>
    <!-- /.mobile-menu -->
  `;

  container.insertAdjacentHTML('beforeend', template);
  menuContent.style.display = 'none';
};