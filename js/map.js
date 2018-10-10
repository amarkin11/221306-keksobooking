'use strict';

(function () {
	var MAP = document.querySelector('.map');
	// var MIN_LOCATION_X = 0 + window.pin.PIN_WIDTH;
	// var MAX_LOCATION_X = 1200 - window.pin.PIN_WIDTH;
	// var MIN_LOCATION_Y = 130;
	// var MAX_LOCATION_Y = 630;
	var MAP_X_COORD_MIN = MAP.getBoundingClientRect().left + window.data.PIN_MAIN_WIDTH / 2;
	var MAP_X_COORD_MAX = MAP.getBoundingClientRect().right - window.data.PIN_MAIN_WIDTH / 2;
	var MAP_Y_COORD_MIN = window.data.MIN_LOCATION_Y;
	var MAP_Y_COORD_MAX = window.data.MAX_LOCATION_Y;
	// var MAP_PINS = document.querySelector('.map__pins');
  var PIN_MAIN = document.querySelector('.map__pin--main');
  var MAP_FILTERS = document.querySelector('.map__filters-container');

	var mapActive = function () {
	  MAP.classList.remove('map--faded');
	  window.form.AD_FORM.classList.remove('ad-form--disabled');

	  for (var i = 0; i < window.form.FIELDSETS.length; i++) {
	    window.form.FIELDSETS[i].disabled = false;
	  }
	};

	var onMainPinMouseUp = function () {
	  mapActive();
	  window.pin.renderPins(window.data.ads);
	  window.card.renderCards(window.data.ads);
	  window.form.setAdressValue();
	  window.card.onClosePopupClick();
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

	    if (!(startCoords.x <= MAP_X_COORD_MIN || startCoords.x >= MAP_X_COORD_MAX)) {
	      PIN_MAIN.style.left = PIN_MAIN.offsetLeft - shift.x + 'px';
	    }
	    if (!(startCoords.y <= MAP_Y_COORD_MIN || startCoords.y >= MAP_Y_COORD_MAX)) {
	      PIN_MAIN.style.top = PIN_MAIN.offsetTop - shift.y + 'px';
	    }

	    // PIN_MAIN.style.left = (PIN_MAIN.offsetLeft - shift.x) + 'px';
	    // PIN_MAIN.style.top = (PIN_MAIN.offsetTop - shift.y) + 'px';
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
    MAP : MAP,
    PIN_MAIN : PIN_MAIN,
    MAP_FILTERS : MAP_FILTERS
    // MIN_LOCATION_X : MIN_LOCATION_X,
    // MAX_LOCATION_X : MAX_LOCATION_X,
    // MIN_LOCATION_Y : MIN_LOCATION_Y,
    // MAX_LOCATION_Y : MAX_LOCATION_Y
  };

})();
