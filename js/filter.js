'use strict';

(function () {
  var FILTER = document.querySelector('.map__filters');
  var FILTER_TIMEOUT = 500;
  var COMMODITY_FILTERS = ['type', 'rooms', 'guests'];

  var Price = {
    low: 10000,
    high: 50000
  };

  var filterCriteria = {
    type: 'any',
    rooms: 'any',
    guests: 'any',
    price: 'any',
    features: []
  };

  var disableFilter = function () {
    for (var i = 0; i < FILTER.elements.length; i++) {
      FILTER.elements[i].disabled = true;
    }
    FILTER.removeEventListener('change', onFilterChange);
    FILTER.removeEventListener('keydown', onFilterChange);
  };

  var enableFilter = function () {
    for (var i = 0; i < FILTER.elements.length; i++) {
      FILTER.elements[i].disabled = false;
    }

    FILTER.addEventListener('change', onFilterChange);
    FILTER.addEventListener('keydown', onFilterChange);
  };

  var applyFilter = function (offers) {
    var filtredOffers = filterOffers(offers);
    window.card.closeAdPopup();
    window.pins.removePins();
    window.pins.renderPins(filtredOffers);
  };

  var removeFeature = function (feature) {
    filterCriteria.features.splice(filterCriteria.features.indexOf(feature), 1);
  };

  var filterFeatures = function (offers) {
    if (filterCriteria.features.length === 0) {
      return offers;
    }

    return offers.filter(function (offerItem) {
      return filterCriteria.features.every(function (feature) {
        return offerItem.offer.features.indexOf(feature) !== -1;
      });
    });
  };

  var filterSelect = function (offers) {
    return COMMODITY_FILTERS.reduce(function (acc, currentFilter) {
      return filterCriteria[currentFilter] === 'any'
        ? acc
        : acc.filter(function (it) {
          return it.offer[currentFilter] === filterCriteria[currentFilter];
        });
    }, offers);
  };

  var filterPrice = function (offers) {
    return offers.filter(function (elem) {
      switch (filterCriteria.price) {
        case 'low':
          return elem.offer.price <= Price.low;
        case 'middle':
          return elem.offer.price > Price.low && elem.offer.price < Price.high;
        case 'high':
          return elem.offer.price >= Price.high;
        default:
          return true;
      }
    });
  };

  var filterOffers = function (offers) {
    var res = filterSelect(offers);
    res = filterPrice(res);
    res = filterFeatures(res);
    return res;
  };

  var setFilterCriteria = function (filterNode) {
    var filterKey = filterNode.id.split('-')[1];

    if (filterNode.tagName === 'SELECT') {
      filterCriteria[filterKey] = Number.isNaN(parseInt(filterNode.value, 10))
        ? filterNode.value
        : parseInt(filterNode.value, 10);
      return;
    }

    if (filterNode.checked) {
      filterCriteria.features.push(filterKey);
    } else {
      removeFeature(filterKey);
    }
  };

  var onFilterChange = function (evt) {
    var target = evt.target;
    if (target.classList.contains('map__checkbox') && evt.code === 'Enter') {
      target.checked = !target.checked;
    }
    return window.utils.debounce(function () {
      setFilterCriteria(target);
      applyFilter(window.data.ads);
    }, FILTER_TIMEOUT);
  };

  disableFilter();

  window.filter = {
    disableFilter: disableFilter,
    enableFilter: enableFilter
  };
})();
