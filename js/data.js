'use strict';

(function () {
	var ADS_AMOUNT = 8;

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
  var PIN_MAIN_WIDTH = 65;
  var MIN_LOCATION_X = 0 + PIN_WIDTH;
  var MAX_LOCATION_X = 1200 - PIN_WIDTH;
  var MIN_LOCATION_Y = 130;
  var MAX_LOCATION_Y = 630;

  var generateFeatureList = function () {
    return FEATURES.slice(window.util.getRandomInteger(0, FEATURES.length));
  };

	var generateRandomAd = function (index) {
	  var randomAd = {
	    author: {},
	    offer: {},
	    location: {}
	  };
	  randomAd.author.avatar = 'img/avatars/user0' + (index + 1) + '.png';
	  randomAd.offer.title = TITLES[index];
	  randomAd.offer.address =
	    window.util.getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X) +
	    ', ' +
	    window.util.getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);
	  randomAd.offer.price = window.util.getRandomInteger(MIN_PRICE, MAX_PRICE);
	  randomAd.offer.type = window.util.getRandomValue(TYPES);
	  randomAd.offer.rooms = window.util.getRandomInteger(MIN_ROOMS, MAX_ROOMS);
	  randomAd.offer.guests = window.util.getRandomInteger(MIN_GUEST, MAX_GUEST);
	  randomAd.offer.checkin = window.util.getRandomValue(CHEKINS);
	  randomAd.offer.checkout = window.util.getRandomValue(CHECKOUTS);
	  randomAd.offer.features = generateFeatureList();
	  randomAd.offer.description = '';
	  randomAd.offer.photos = window.util.shuffleArray(PHOTOS);
	  randomAd.location.x = window.util.getRandomInteger(MIN_LOCATION_X, MAX_LOCATION_X);
	  randomAd.location.y = window.util.getRandomInteger(MIN_LOCATION_Y, MAX_LOCATION_Y);

	  return randomAd;
	};

	var getAds = function () {
	  var ads = [];

	  for (var i = 0; i < ADS_AMOUNT; i++) {
	    ads.push(generateRandomAd(i));
	  }

	  return ads;
	};

	var ads = getAds();

	window.data = {
		ads: ads,
    PIN_MAIN_WIDTH : PIN_MAIN_WIDTH,
    MIN_LOCATION_Y : MIN_LOCATION_Y,
    MAX_LOCATION_Y : MAX_LOCATION_Y
	};
})();
