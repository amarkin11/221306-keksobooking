'use strict';

(function () {
  var activePopup;

  var OFFER_TYPES = {
    flat: 'Квартира',
    palace: 'Дворец',
    house: 'Домик',
    bungalo: 'Бунгало'
  };

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

  var getPopupFeatureList = function (features) {
    var fragment = document.createDocumentFragment();
    features.forEach(function (feature) {
      var item = FEATURE_TEMPLATE.cloneNode(true);
      item.classList.add('popup__feature--' + feature);
      fragment.appendChild(item);
    });
    return fragment;
  };

  var generatePopupPhotos = function (photos) {
    var fragment = document.createDocumentFragment();
    photos.forEach(function (photo) {
      var item = POPUP_PHOTO.cloneNode(true);
      item.src = photo;
      fragment.appendChild(item);
    });
    return fragment;
  };

  var createCard = function (ad, index) {
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
    popupCard.classList.add('visually-hidden');
    popupCard.dataset.ad = index;

    return popupCard;
  };

  var renderCards = function (ads) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < ads.length; i++) {
      fragment.appendChild(createCard(ads[i], i));
    }
    window.map.MAP.insertBefore(fragment, window.map.MAP_FILTERS);
  };

  var hideActivePopup = function () {
    if (activePopup !== undefined) {
      activePopup.classList.add('visually-hidden');
    }
    document.removeEventListener('keydown', onEscKeydown);
  };

  var showAdPopup = function (index) {
    hideActivePopup();
    var popup = document.querySelector('.popup.visually-hidden[data-ad="' + index + '"]');
    popup.classList.remove('visually-hidden');
    activePopup = popup;
    document.addEventListener('keydown', onEscKeydown);
  };

  var onClosePopupClick = function () {
    var closePopup = document.querySelectorAll('.popup__close');
    for (var i = 0; i < closePopup.length; i++) {
      closePopup[i].addEventListener('click', hideActivePopup);
    }
  };

  var onEscKeydown = function (evt) {
    if (evt.keyCode === 27) {
      hideActivePopup();
    }
  };

  window.card = {
    renderCards: renderCards,
    showAdPopup: showAdPopup,
    onClosePopupClick: onClosePopupClick
  };
})();

