'use strict';

(function () {
  var AD_FORM = document.querySelector('.ad-form');
  var FIELDSETS = document.querySelectorAll('fieldset');
  var INPUT_ADDRESS = document.querySelector('#address');
  var SELECT_TYPE = document.querySelector('#type');
  var INPUT_PRICE = document.querySelector('#price');
  var FIELDSET_TIME = document.querySelector('.ad-form__element--time');
  var INPUT_TIME_IN = document.querySelector('#timein');
  var INPUT_TIME_OUT = document.querySelector('#timeout');
  var ROOMS_OPTIONS = document.querySelector('#room_number');
  var CAPACITY_OPTIONS = document.querySelectorAll('#capacity option');
  var BUTTON_FORM_RESET = document.querySelector('.ad-form__reset');

  var setAdressValue = function () {
    INPUT_ADDRESS.value = window.map.PIN_MAIN.offsetLeft + ', ' + window.map.PIN_MAIN.offsetTop;
  };

  var setMinPrice = function (value) {
    INPUT_PRICE.placeholder = value;
    INPUT_PRICE.setAttribute('min', value);
  };

  var changeSelectType = function () {
    switch (SELECT_TYPE.value) {
      case 'bungalo':
        setMinPrice('0');
        break;
      case 'flat':
        setMinPrice('1000');
        break;
      case 'house':
        setMinPrice('5000');
        break;
      case 'palace':
        setMinPrice('10000');
        break;
    }
  };

  SELECT_TYPE.addEventListener('change', changeSelectType);

  var setSelectTime = function (evt) {
    INPUT_TIME_IN.value = evt.target.value;
    INPUT_TIME_OUT.value = evt.target.value;
  };

  FIELDSET_TIME.addEventListener('change', setSelectTime);

  var onRoomsOptionChange = function (evt) {
    restrictCapcity(evt.target.value);
  };

  var restrictCapcity = function (roomsAmount) {
    CAPACITY_OPTIONS.forEach(function (option) {
      var isForGuests = option.value !== '0';
      var isOptionAvailable = roomsAmount === '100' ? !isForGuests : roomsAmount >= option.value && isForGuests;
      option.disabled = !isOptionAvailable;
      option.selected = isOptionAvailable;
    });
  };

  ROOMS_OPTIONS.addEventListener('change', onRoomsOptionChange);

  AD_FORM.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(AD_FORM), window.backend.showSuccessMessage, window.beckend.showErrorMessage);
    evt.preventDefault();
  });

  BUTTON_FORM_RESET.addEventListener('click', function () {
    AD_FORM.reset();
  });

  window.form = {
    AD_FORM: AD_FORM,
    FIELDSETS: FIELDSETS,
    setAdressValue: setAdressValue
  };
})();
