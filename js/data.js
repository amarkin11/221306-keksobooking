'use strict';

(function() {
  var onDataLoad = function(ads) {
    if (!window.data.ads) {
      window.data.ads = ads;
    }
  };

  window.backend.load(onDataLoad, function() {
    console.log('ERROR HAPPENED');
  });

  window.data = {
    ads: undefined
  };
})();
