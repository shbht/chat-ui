"use strict";

angular.module('chatUiApp')
  .controller("LoginCtrl", ["$state", "ezfb", "$rootScope", function ($state, ezfb, $rootScope) {

    this.login = function () {
      ezfb.login(function (res) {
        if (res.authResponse) {
          getUserInfo();
        }
      });
    };

    function getUserInfo() {
      ezfb.api('/me', function (res) {
        sessionStorage.setItem("user", JSON.stringify(res));
        $state.go("chat");
      });
    }
  }]);
