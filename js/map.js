'use strict';

var AVATAR_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var MIN_GUEST = 1;
var MAX_GUEST = 10;
var CHEKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
// var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
// var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var PIN_WIDTH = 50;
// var PIN_HEIGHT = 70;
var MIN_LOCATION_X = 0 + PIN_WIDTH;
var MAX_LOCATION_X = 1200 - PIN_WIDTH;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;

var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var mapFilters = document.querySelector('.map__filters-container');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var fragment = document.createDocumentFragment();

var ads = [];

var getRandomInteger = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var getRandomValue = function (arr) {
  return arr[getRandomInteger(0, arr.length)];
};

// var generateFeature = function () {
//   var features = [];
//   for (var i = 0; i < FEATURES.length; i++) {
//     features.push(FEATURES[i]);
//   }
// };

// var shuffleArray = function (arr) {
//   for (i = arr.length - 1; i > 0; i--) {
//     var j = Math.floor(Math.random() * (i + 1));
//     var shuffle = arr[i];
//     arr[i] = arr[j];
//     arr[j] = shuffle;
//   }
//   return arr;
// };

var generateRandomAd = function () {
  var randomAd = {
    author: {},
    offer: {},
    location: {}
  };
  var locationX = getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X);
  var locationY = getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);
  randomAd.author.avatar = 'img/avatars/user0' + AVATAR_NUMBERS[i] + '.png';
  randomAd.offer.title = TITLES[i];
  randomAd.offer.address = locationX + ', ' + locationY;
  randomAd.offer.price = getRandomInteger(MIN_PRICE, MAX_PRICE);
  randomAd.offer.type = getRandomValue(TYPES);
  randomAd.offer.rooms = getRandomInteger(MIN_ROOMS, MAX_ROOMS);
  randomAd.offer.guests = getRandomInteger(MIN_GUEST, MAX_GUEST);
  randomAd.offer.checkin = getRandomValue(CHEKINS);
  randomAd.offer.checkout = getRandomValue(CHECKOUTS);
  // randomAd.offer.features = generateFeature;
  randomAd.offer.description = '';
  // randomAd.offer.photos = shuffleArray(PHOTOS);
  randomAd.location.x = locationX;
  randomAd.location.y = locationY;

  return randomAd;
};

for (var i = 0; i < 8; i++) {
  ads.push(generateRandomAd());
}

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offer.title;

  return pinElement;
};

var createPins = function () {
  for (i = 0; i < ads.length; i++) {
    fragment.appendChild(renderPin(ads[i]));
  }
  mapPinsList.appendChild(fragment);
};

var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardTemplate.querySelector('.popup__title').textContent = ad.offer.title;
  cardTemplate.querySelector('.popup__text--address').textContent = ad.offer.address;
  cardTemplate.querySelector('.popup__text--price').textContent = ad.offer.price + '₽/ночь';
  if (ad.offer.type === 'palace') {
    cardTemplate.querySelector('.popup__type').textContent = 'Дворец';
  }
  if (ad.offer.type === 'flat') {
    cardTemplate.querySelector('.popup__type').textContent = 'Квартира';
  }
  if (ad.offer.type === 'house') {
    cardTemplate.querySelector('.popup__type').textContent = 'Дом';
  }
  if (ad.offer.type === 'bungalo') {
    cardTemplate.querySelector('.popup__type').textContent = 'Бунгало';
  }
  cardTemplate.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' комнаты для ' + ad.offer.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offer.checkin + ' , выезд до ' + ad.offer.checkout;
  var feature = cardTemplate.querySelector('.popup__features');
  if (ad.offer.features === 'wifi') {
    feature.querySelector('.popup__feature--wifi').textContent = 'wifi';
  }
  if (ad.offer.features === 'dishwasher') {
    feature.querySelector('.popup__feature--dishwasher').textContent = 'dishwasher';
  }
  if (ad.offer.features === 'parking') {
    feature.querySelector('.popup__feature--parking').textContent = 'parking';
  }
  if (ad.offer.features === 'washer') {
    feature.querySelector('.popup__feature--washer').textContent = 'washer';
  }
  if (ad.offer.features === 'elevator') {
    feature.querySelector('.popup__feature--elevator').textContent = 'elevator';
  }
  if (ad.offer.features === 'conditioner') {
    feature.querySelector('.popup__feature--conditioner').textContent = 'conditioner';
  }

  cardTemplate.querySelector('.popup__description').textContent = ad.offer.description;
  var popupPhoto = cardElement.querySelector('.popup__photos').querySelector('img').cloneNode(true);
  // popupPhoto.src = ad.offer.photos;
  cardElement.querySelector('.popup__photos').removeChild(cardElement.querySelector('.popup__photos').querySelector('img'));
  cardElement.querySelector('.popup__photos').appendChild(popupPhoto);
  cardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
};

var createCards = function () {
  for (i = 0; i < ads.length; i++) {
    fragment.appendChild(renderCard(ads[i]));
  }
  map.insertBefore(fragment, mapFilters);
};

createPins();
createCards();

