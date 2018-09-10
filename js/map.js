'use strict';

var AVATAR_NUMBERS = ['1', '2', '3', '4', '5', '6', '7', '8'];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MIN_ROOMS = 1;
var MAX_ROOMS = 5;
var CHEKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_LOCATION_X = 0;
var MAX_LOCATION_X = 1200;
var MIN_LOCATION_Y = 130;
var MAX_LOCATION_Y = 630;

var map = document.querySelector('.map');
var mapPinsList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

var ads = [
  {
    author: {
      avatar: 'img/avatars/user0' + AVATAR_NUMBERS[0] + '.png'
    },
    offers: {
      title: TITLES[0],
      // address:,
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: TYPES[0],
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(1, 10),
      checkin: CHEKINS[0],
      checkout: CHECKOUTS[0],
      features: FEATURES[0],
      description: '',
      photos: PHOTOS[0],
    },
    location: {
      x: getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X),
      y: getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y)
    }
  },
  {
    author: {
      avatar: 'img/avatars/user0' + AVATAR_NUMBERS[1] + '.png'
    },
    offers: {
      title: TITLES[1],
      address: getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X) + ', ' + getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y),
      price: getRandomNumber(MIN_PRICE, MAX_PRICE),
      type: TYPES[1],
      rooms: getRandomNumber(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomNumber(1, 10),
      checkin: CHEKINS[1],
      checkout: CHECKOUTS[1],
      features: FEATURES[1],
      description: '',
      photos: PHOTOS[1],
    },
    location: {
      x: getRandomNumber(MIN_LOCATION_X, MAX_LOCATION_X),
      y: getRandomNumber(MIN_LOCATION_Y, MAX_LOCATION_Y)
    }
  }
];

var renderPin = function (ad) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = ad.location.x + 'px';
  pinElement.style.top = ad.location.y + 'px';
  pinElement.querySelector('img').src = ad.author.avatar;
  pinElement.querySelector('img').alt = ad.offers.title;

  return pinElement;
}

var fragmentPin = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragmentPin.appendChild(renderPin(ads[i]));
}

mapPinsList.appendChild(fragmentPin);

var renderCard = function (ad) {
  var cardElement = cardTemplate.cloneNode(true);
  cardTemplate.querySelector('.popup__title').textContent = ad.offers.title;
  cardTemplate.querySelector('.popup__text--address').textContent = ad.offers.adress;
  cardTemplate.querySelector('.popup__text--price').textContent = ad.offers.price + '₽/ночь';
  cardTemplate.querySelector('.popup__type').textContent = ad.offers.type;
  cardTemplate.querySelector('.popup__text--capacity').textContent = ad.offers.rooms + ' комнаты для ' + ad.offers.guests + ' гостей';
  cardTemplate.querySelector('.popup__text--time').textContent = 'Заезд после ' + ad.offers.checkin + ' , выезд до ' + ad.offers.checkout;
  cardTemplate.querySelector('.popup__features').textContent = ad.offers.features;
  cardTemplate.querySelector('.popup__description').textContent = ad.offers.description;
  // var popupPhoto = cardElement.querySelector('.popup__photos').querySelector('img').cloneNode(true);
  // popupPhoto.src = ad.offers.photos;
  cardTemplate.querySelector('.popup__avatar').src = ad.author.avatar;

  return cardElement;
}

var fragmentCard = document.createDocumentFragment();

for (var i = 0; i < ads.length; i++) {
  fragmentCard.appendChild(renderCard(ads[i]));
}

map.appendChild(fragmentCard);

