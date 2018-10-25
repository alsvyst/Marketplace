const bestOffer = document.querySelector('.best-offer');
const oldPrice = bestOffer.querySelector('.discount-price .old-price span');
const newPrice = bestOffer.querySelector('.discount-price .new-price span');

const counter = {
  left: bestOfferCounter('left'),
  right: bestOfferCounter('right')
};

const offer = offerState();

bestOffer.addEventListener('click', function (e) {
  if (e.target.closest('.step-btn')) {
    const element = e.target.closest('.best-offer-item');
    const position = element.dataset.position;
    const container = element.querySelector('.best-offer-card-container');
    const number = +e.target.closest('.step-btn').dataset.step;

    const state = offer(position, counter[position](number));

    recountBestOfferPrice(state);
    renderBestOfferCard(state[position], container);
  }
});

function bestOfferCounter(position) {
  let currentCount = 0;

  return function(symbol = 1) {
    if (currentCount === window.bestOffer[position].length - 1 && symbol === 1) {
      return currentCount = 0;
    } else if (currentCount === 0 && symbol === -1) {
      return currentCount = window.bestOffer[position].length - 1;
    } else {
      return currentCount = currentCount + symbol;
    }
  };
}

function offerState() {

  const currentOffer = {
    left: getItemById(window.bestOffer.left[0]),
    right: getItemById(window.bestOffer.right[0])
  };

  return function (position, index) {

    if (arguments.length === 0) {
      return currentOffer;
    }
    const id = window.bestOffer[position][index];
    currentOffer[position] = getItemById(id);

    return currentOffer;
  }
}

function renderBestOfferCard(card, container) {
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', createCard(card));
}

function recountBestOfferPrice(state) {
  const sum = state.left.discountedPrice + state.right.discountedPrice;
  oldPrice.innerText = '£' + sum.toFixed(2);
  newPrice.innerText = '£' + (sum - window.bestOffer.discount).toFixed(2);
}

(function () {

  recountBestOfferPrice(offer());
  renderBestOfferCard(offer().left, bestOffer.querySelector('.best-offer-item-left .best-offer-card-container'));
  renderBestOfferCard(offer().right, bestOffer.querySelector('.best-offer-item-right .best-offer-card-container'));
})();