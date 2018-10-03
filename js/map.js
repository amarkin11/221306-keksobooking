'use strict';

var ADS_AMOUNT = 8;
var OFFER_TYPES = {
  flat: 'Квартира',
  palace: 'Дворец',
  house: 'Домик',
  bungalo: 'Бунгало'
};

var TITLES = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'
];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUEST = 1;
var MAX_GUEST = 10;
var CHEKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];
var PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];
var PIN_WIDTH = 50;
// var PIN_HEIGHT = 70;
var MIN_LOCATION_X = 0 + PIN_WIDTH;
var MAX_LOCATION_X = 1200 - PIN_WIDTH;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;

var MAP = document.querySelector('.map');
var MAP_PIN_TEMPLATE = document
  .querySelector('#pin')
  .content.querySelector('.map__pin');
var MAP_PINS = document.querySelector('.map__pins');
var MAP_FILTERS = document.querySelector('.map__filters-container');
var CARD_TEMPLATE = document
  .querySelector('#card')
  .content.querySelector('.map__card');

var FEATURE_TEMPLATE = document.createElement('li');
FEATURE_TEMPLATE.classList.add('popup__feature');

var POPUP_PHOTO = document.createElement('img');
POPUP_PHOTO.classList.add('popup__photo');
POPUP_PHOTO.width = 45;
POPUP_PHOTO.height = 40;
POPUP_PHOTO.alt = 'Фотография жилья';

var getRandomInteger = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomValue = function(arr) {
  return arr[getRandomInteger(0, arr.length)];
};

var generateFeatureList = function() {
  return FEATURES.slice(getRandomInteger(0, FEATURES.length));
};

var getPopupFeatureList = function(features) {
  var fragment = document.createDocumentFragment();
  features.forEach(function(feature) {
    var item = FEATURE_TEMPLATE.cloneNode(true);
    item.classList.add('popup__feature--' + feature);
    fragment.appendChild(item);
  });
  return fragment;
};

var generatePopupPhotos = function(photos) {
  var fragment = document.createDocumentFragment();
  photos.forEach(function(photo) {
    var item = POPUP_PHOTO.cloneNode(true);
    item.src = photo;
    fragment.appendChild(item);
  });
  return fragment;
};

var shuffleArray = function(arr) {
  var newArray = arr.concat();
  var j;
  var x;
  var i;
  for (i = newArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    x = newArray[i];
    newArray[i] = newArray[j];
    newArray[j] = x;
  }
  return newArray;
};

var generateRandomAd = function(index) {
  var randomAd = {
    author: {},
    offer: {},
    location: {}
  };
  randomAd.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
  randomAd.offer.title = TITLES[index];
  randomAd.offer.address =
    getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X) +
    ', ' +
    getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);
  randomAd.offer.price = getRandomInteger(MIN_PRICE, MAX_PRICE);
  randomAd.offer.type = getRandomValue(TYPES);
  randomAd.offer.rooms = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
  randomAd.offer.guests = getRandomInteger(MIN_GUEST, MAX_GUEST);
  randomAd.offer.checkin = getRandomValue(CHEKINS);
  randomAd.offer.checkout = getRandomValue(CHECKOUTS);
  randomAd.offer.features = generateFeatureList();
  randomAd.offer.description = '';
  randomAd.offer.photos = shuffleArray(PHOTOS);
  randomAd.location.x = getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X);
  randomAd.location.y = getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);

  return randomAd;
};

var getAds = function() {
  var ads = [];

  for (var i = 0; i < ADS_AMOUNT; i++) {
    ads.push(generateRandomAd(i));
  }

  return ads;
};

var createCards = function(ad) {
  var popupCard = CARD_TEMPLATE.cloneNode(true);

  popupCard.querySelector('.popup__title').textContent = ad.offer.title;
  popupCard.querySelector('.popup__text--address').textContent =
    ad.offer.address;
  popupCard.querySelector('.popup__text--price').textContent =
    ad.offer.price + '₽/ночь';
  popupCard.querySelector('.popup__type').textContent =
    OFFER_TYPES[ad.offer.type];
  popupCard.querySelector('.popup__text--capacity').textContent =
    ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  popupCard.querySelector('.popup__text--time').textContent =
    'Заезд после ' + ad.offer.checkin + ', выезд до ' + ad.offer.checkout;
  popupCard.querySelector('.popup__features').innerHTML = '';
  popupCard
    .querySelector('.popup__features')
    .appendChild(getPopupFeatureList(ad.offer.features));

  popupCard.querySelector('.popup__description').textContent =
    ad.offer.description;

  popupCard
    .querySelector('.popup__photos')
    .appendChild(generatePopupPhotos(ad.offer.photos));
  popupCard.querySelector('.popup__avatar').src = ad.author.avatar;

  return popupCard;
};

var renderCards = function(ad) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < ad.length; i++) {
    fragment.appendChild(createCards(ad[i]));
  }
  MAP.insertBefore(fragment, MAP_FILTERS);
};

var createPin = function(ad) {
  var MAP_PIN = MAP_PIN_TEMPLATE.cloneNode(true);
  MAP_PIN.style.left = ad.location.x + 'px';
  MAP_PIN.style.top = ad.location.y + 'px';
  MAP_PIN.querySelector('img').src = ad.author.avatar;
  MAP_PIN.querySelector('img').alt = ad.offer.title;

  return MAP_PIN;
};

var renderPins = function(ad) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < ad.length; i++) {
    fragment.appendChild(createPin(ad[i]));
  }

  MAP_PINS.appendChild(fragment);
};

var ads = getAds();
renderPins(ads);
renderCards(ads);
