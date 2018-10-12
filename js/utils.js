'use strict';

(function () {
  var getRandomInteger = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };

  var getRandomValue = function (arr) {
    return arr[getRandomInteger(0, arr.length)];
  };

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
    getRandomInteger: getRandomInteger,
    getRandomValue: getRandomValue,
    shuffleArray: shuffleArray,
    debounce: debounce
  };
})();

