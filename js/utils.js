'use strict';

(function () {
  var shuffleArray = function (arr) {
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

  var lastTimeout;
  var debounce = function (func, timeout) {
    if (lastTimeout) {
      clearTimeout(lastTimeout);
    }
    lastTimeout = setTimeout(func, timeout);
  };

  window.utils = {
    shuffleArray: shuffleArray,
    debounce: debounce
  };
})();
