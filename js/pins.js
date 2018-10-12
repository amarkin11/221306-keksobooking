'use strict';

(function () {
  var MAP_PIN_TEMPLATE = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var MAP_PINS = document.querySelector('.map__pins');
  var MAX_PINS_AMOUNT = 5;

  var createPin = function (ad) {
    var MAP_PIN = MAP_PIN_TEMPLATE.cloneNode(true);
    MAP_PIN.style.left = ad.location.x + 'px';
    MAP_PIN.style.top = ad.location.y + 'px';
    MAP_PIN.querySelector('img').src = ad.author.avatar;
    MAP_PIN.querySelector('img').alt = ad.offer.title;

    MAP_PIN.addEventListener('click', function () {
      window.card.showAdPopup(ad);
    });

    return MAP_PIN;
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    ads.slice(0, MAX_PINS_AMOUNT).forEach(function (ad) {
      fragment.appendChild(createPin(ad));
    });

    MAP_PINS.appendChild(fragment);
  };

  var removePins = function () {
    document
      .querySelectorAll('.map__pin[type="button"]')
      .forEach(function (pin) {
        pin.remove();
      });
  };

  window.pins = {
    renderPins: renderPins,
    removePins: removePins
  };
})();
