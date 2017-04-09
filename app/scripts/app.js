"use strict";

/**
 * @ngdoc overview
 * @name chatUiApp
 * @description
 * # chatUiApp
 *
 * Main module of the application.
 */
angular
  .module("chatUiApp", ["ui.router", "ezfb", "btford.socket-io"])
  .config(["$stateProvider", "ezfbProvider", "$urlRouterProvider",
    function ($stateProvider, ezfbProvider, $urlRouterProvider) {

      ezfbProvider.setInitParams({
        appId: '1738358569758448'
      });

      $stateProvider
      .state("login", {
        url: "/login",
        templateUrl: "views/login.html",
        controller: "LoginCtrl",
        controllerAs: "login"
      })
      .state("chat", {
        url: "/chat",
        templateUrl: "views/chat.html",
        controller: "ChatCtrl",
        controllerAs: "chat"
      });

    $urlRouterProvider.otherwise("/login");
  }]);

