'use strict';

(function () {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  var upload = function (data, onLoad, OnError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventLIstener('load', function () {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function (onLoad, OnError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventLIstener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        OnError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventLIstener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventLIstener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс')
    });

    xhr.timeout = 10000;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var MAIN_BLOCK = document.querySelector('main');
  var SUCCESS_MESSAGE_TEMPLATE = document.querySelector('#success').content.querySelector('.success');
  var ERROR_MESSAGE_TEMPLATE = document.querySelector('#error').content.querySelector('.error');
  // var ERROR_BUTTON = document.querySelector('#error').content.querySelector('.error__button');

  var createSuccessMessage = function () {
    var successMessage = SUCCESS_MESSAGE_TEMPLATE.cloneNode(true);
    MAIN_BLOCK.appendChild(successMessage);
  };

  var showSuccessMessage = function () {
    createSuccessMessage();
    document.addEventListener('keydown', onEscKeydown);
    document.addEventListener('click', onClickWindow);
  }

  var createErrorMessage = function () {
    var errorMessage = ERROR_MESSAGE_TEMPLATE.cloneNode(true);
    MAIN_BLOCK.appendChild(errorMessage);
  };

  var showErrorMessage = function () {
    createErrorMessage();
    // document.addEventListener('keydown', onEscKeydown);
    // window.addEventListener('click', onClickWindow);
    // ERROR_BUTTON.addEventListener('click', onClickButtonError);
  };

  var onEscKeydown = function (evt) {
    if (evt.keyCode === 27) {
      MAIN_BLOCK.removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  var onClickWindow = function () {
    MAIN_BLOCK.removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onClickWindow);
  };

  // var onClickButtonError = function () {
  //   MAIN_BLOCK.removeChild(document.querySelector('.error'));
  //   console.log('rabotai');
  // };

  window.backend = {
    upload: upload,
    load: load,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };

  // showErrorMessage();
  // showSuccessMessage();
})();
