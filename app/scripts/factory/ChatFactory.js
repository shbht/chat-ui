"use strict";

angular.module("chatUiApp")
.factory("ChatFactory", ["socketFactory", function (socketFactory) {

  var socket = io('http://localhost:8020');

  return socketFactory({
    ioSocket: socket,
    prefix: ""
  });
}]);
