'use strict';

var bestOffer = document.querySelector('.best-offer');
var oldPrice = bestOffer.querySelector('.discount-price .old-price span');
var newPrice = bestOffer.querySelector('.discount-price .new-price span');
var bestOfferBtn = bestOffer.querySelector('#bestOfferBtn');

var counter = {
  left: bestOfferCounter('left'),
  right: bestOfferCounter('right')
};

var offer = offerState();

(function () {
  recountBestOfferPrice(offer());
  renderBestOfferCard(offer().left, bestOffer.querySelector('.best-offer-item-left .best-offer-card-container'));
  renderBestOfferCard(offer().right, bestOffer.querySelector('.best-offer-item-right .best-offer-card-container'));
})();

bestOffer.addEventListener('click', function (e) {
  if (e.target.closest('.step-btn')) {
    var element = e.target.closest('.best-offer-item');
    var position = element.dataset.position;
    var container = element.querySelector('.best-offer-card-container');
    var number = +e.target.closest('.step-btn').dataset.step;

    var state = offer(position, counter[position](number));

    recountBestOfferPrice(state);
    renderBestOfferCard(state[position], container);
  }
});

bestOfferBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var leftItem = offer().left;
  if (!recountNumbers(leftItem.title, leftItem.colors[0], leftItem.sizes[0])) {
    leftItem.toBag = {
      color: leftItem.colors[0],
      size: leftItem.sizes[0],
      number: 1
    };
    addToBag(leftItem);
  }

  var rightItem = offer().right;
  if (!recountNumbers(rightItem.title, rightItem.colors[0], rightItem.sizes[0])) {
    rightItem.toBag = {
      color: rightItem.colors[0],
      size: rightItem.sizes[0],
      number: 1
    };
    addToBag(rightItem);
  }
});

function bestOfferCounter(position) {
  var currentCount = 0;

  return function () {
    var symbol = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

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

  var currentOffer = {
    left: getItemById(window.bestOffer.left[0]),
    right: getItemById(window.bestOffer.right[0])
  };

  return function (position, index) {

    if (arguments.length === 0) {
      return currentOffer;
    }
    var id = window.bestOffer[position][index];
    currentOffer[position] = getItemById(id);

    return currentOffer;
  };
}

function renderBestOfferCard(card, container) {
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', createCard(card));
}

function recountBestOfferPrice(state) {
  var sum = state.left.discountedPrice + state.right.discountedPrice;
  oldPrice.innerText = '£' + sum.toFixed(2);
  newPrice.innerText = '£' + (sum - window.bestOffer.discount).toFixed(2);
}