'use strict';

(function () {
  var MAP_PIN_TEMPLATE = document
    .querySelector('#pin')
    .content.querySelector('.map__pin');
  var MAP_PINS = document.querySelector('.map__pins');

  var createPin = function (ad, index) {
    var MAP_PIN = MAP_PIN_TEMPLATE.cloneNode(true);
    MAP_PIN.style.left = ad.location.x + 'px';
    MAP_PIN.style.top = ad.location.y + 'px';
    MAP_PIN.querySelector('img').src = ad.author.avatar;
    MAP_PIN.querySelector('img').alt = ad.offer.title;
    MAP_PIN.dataset.ad = index;

    MAP_PIN.addEventListener('click', function () {
      window.card.showAdPopup(index);
    });

    return MAP_PIN;
  };

  var renderPins = function (ads) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(createPin(ads[i], i));
    }

    MAP_PINS.appendChild(fragment);
    window.filter.enableFilter();
  };

  var removePins = function () {
    document.querySelectorAll('.map__pin[data-ad]').forEach(function (pin) {
      pin.remove();
    });
  };

  window.pin = {
    MAP_PINS: MAP_PINS,
    renderPins: renderPins,
    removePins: removePins
  };
})();

