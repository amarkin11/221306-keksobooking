'use strict';

(function () {
  var onDataLoad = function (ads) {
    if (!window.data.ads) {
      window.data.ads = ads;
    }
  };

  window.backend.load(onDataLoad, window.backend.showErrorMessage);

  window.data = {
    ads: undefined
  };
})();
