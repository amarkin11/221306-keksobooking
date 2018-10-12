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

  var MinPrice = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };

  var setAppInitialState = function () {
    AD_FORM.reset();
    window.map.setMainPinToInitialPosition();
    window.card.closeAdPopup();
    window.pins.removePins();
    window.map.disableMap();
    disableForm();
  };

  var disableForm = function () {
    AD_FORM.classList.add('ad-form--disabled');
    FIELDSETS.forEach(function (fieldset) {
      fieldset.disabled = true;
    });
  };

  var enableForm = function () {
    AD_FORM.classList.remove('ad-form--disabled');
    FIELDSETS.forEach(function (fieldset) {
      fieldset.disabled = false;
    });
    restrictCapcity(ROOMS_OPTIONS.value);
  };

  var setAdressValue = function (address) {
    if (INPUT_ADDRESS.value === '') {
      INPUT_ADDRESS.defaultValue = address;
    }
    INPUT_ADDRESS.value = address;
  };

  var onSelectTypeChange = function () {
    var minPrice = MinPrice[SELECT_TYPE.value];
    INPUT_PRICE.placeholder = minPrice;
    INPUT_PRICE.min = minPrice;
  };

  var onTimeChange = function (evt) {
    INPUT_TIME_IN.value = evt.target.value;
    INPUT_TIME_OUT.value = evt.target.value;
  };

  var onRoomsOptionChange = function (evt) {
    restrictCapcity(evt.target.value);
  };

  var restrictCapcity = function (roomsAmount) {
    CAPACITY_OPTIONS.forEach(function (option) {
      var isForGuests = option.value !== '0';
      var isOptionAvailable =
        roomsAmount === '100'
          ? !isForGuests
          : roomsAmount >= option.value && isForGuests;
      option.disabled = !isOptionAvailable;
      option.selected = isOptionAvailable;
    });
  };

  var formSuccessUpload = function () {
    setAppInitialState();
    window.backend.showSuccessMessage();
  };

  var onFormSubmit = function (evt) {
    evt.preventDefault();
    window.backend.upload(new FormData(AD_FORM), formSuccessUpload, window.backend.showErrorMessage);
  };

  SELECT_TYPE.addEventListener('change', onSelectTypeChange);
  FIELDSET_TIME.addEventListener('change', onTimeChange);
  ROOMS_OPTIONS.addEventListener('change', onRoomsOptionChange);
  AD_FORM.addEventListener('submit', onFormSubmit);

  window.form = {
    AD_FORM: AD_FORM,
    FIELDSETS: FIELDSETS,
    setAdressValue: setAdressValue,
    enableForm: enableForm
  };
})();
