'use strict';

(function() {
  var URL_UPLOAD = 'https://js.dump.academy/keksobooking';
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var MAIN_BLOCK = document.querySelector('main');
  var SUCCESS_MESSAGE_TEMPLATE = document
    .querySelector('#success')
    .content.querySelector('.success');
  var ERROR_MESSAGE_TEMPLATE = document
    .querySelector('#error')
    .content.querySelector('.error');
  var REQUEST_TIMEOUT = 10000;
  var Code = {
    SUCCESS: 200
  };

  var ESC_KEYCODE = 27;

  var upload = function(data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      onLoad(xhr.response);
    });

    xhr.open('POST', URL_UPLOAD);
    xhr.send(data);
  };

  var load = function(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function() {
      if (xhr.status === Code.SUCCESS) {
        onLoad(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function() {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function() {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = REQUEST_TIMEOUT;

    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var createErrorMessage = function() {
    var errorMessage = ERROR_MESSAGE_TEMPLATE.cloneNode(true);
    MAIN_BLOCK.appendChild(errorMessage);
  };

  var showErrorMessage = function() {
    createErrorMessage();
  };

  var onEscKeydown = function(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      MAIN_BLOCK.removeChild(document.querySelector('.success'));
      document.removeEventListener('keydown', onEscKeydown);
      document.removeEventListener('click', onDocumentClick);
    }
  };

  var onDocumentClick = function() {
    MAIN_BLOCK.removeChild(document.querySelector('.success'));
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscKeydown);
  };

  var showSuccessMessage = function() {
    var successMessage = SUCCESS_MESSAGE_TEMPLATE.cloneNode(true);
    MAIN_BLOCK.appendChild(successMessage);
    document.addEventListener('keydown', onEscKeydown);
    document.addEventListener('click', onDocumentClick);
  };

  window.backend = {
    upload: upload,
    load: load,
    showSuccessMessage: showSuccessMessage,
    showErrorMessage: showErrorMessage
  };
})();
