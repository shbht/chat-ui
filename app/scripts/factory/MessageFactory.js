"use strict";

angular.module("chatUiApp")
  .factory("MessageFactory", ["$http", function ($http) {

    return {
      getHistory: function () {
        return $http.get("http://localhost:8020/chat-api/v1/messages");
      }
    }
  }]);
