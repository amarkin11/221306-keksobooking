'use strict';

(function () {
  var MAP = document.querySelector('.map');

  var PIN_MAIN_WIDTH = 65;
  var MAP_X_COORD_MIN = MAP.getBoundingClientRect().left + PIN_MAIN_WIDTH / 2;
  var MAP_X_COORD_MAX = MAP.getBoundingClientRect().right - PIN_MAIN_WIDTH / 2;
  var MAP_Y_COORD_MIN = 130;
  var MAP_Y_COORD_MAX = 630;

  var PIN_MAIN = document.querySelector('.map__pin--main');
  var PIN_MAIN_START_X = PIN_MAIN.offsetLeft;
  var PIN_MAIN_START_Y = PIN_MAIN.offsetTop;
  var MAP_FILTERS = document.querySelector('.map__filters-container');

  var disableMap = function () {
    MAP.classList.add('map--faded');
  };

  var enableMap = function () {
    MAP.classList.remove('map--faded');
  };

  var setMainPinToInitialPosition = function () {
    PIN_MAIN.style.left = PIN_MAIN_START_X + 'px';
    PIN_MAIN.style.top = PIN_MAIN_START_Y + 'px';
  };

  var onMainPinMouseUp = function () {
    enableMap();
    window.pins.renderPins(window.data.ads);
    window.form.setAdressValue(PIN_MAIN.offsetLeft + ', ' + PIN_MAIN.offsetTop);
    window.filter.enableFilter();
    window.form.enableForm();
  };

  PIN_MAIN.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (
        !(startCoords.x <= MAP_X_COORD_MIN || startCoords.x >= MAP_X_COORD_MAX)
      ) {
        PIN_MAIN.style.left = PIN_MAIN.offsetLeft - shift.x + 'px';
      }
      if (
        !(startCoords.y <= MAP_Y_COORD_MIN || startCoords.y >= MAP_Y_COORD_MAX)
      ) {
        PIN_MAIN.style.top = PIN_MAIN.offsetTop - shift.y + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      onMainPinMouseUp();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  window.map = {
    MAP: MAP,
    MAP_FILTERS: MAP_FILTERS,
    setMainPinToInitialPosition: setMainPinToInitialPosition,
    disableMap: disableMap
  };
})();
