"use strict";

angular.module("chatUiApp")
  .directive("fbLogin", function () {

    return {
      template: '<div class="fb-login-button" data-max-rows="1" data-size="xlarge" data-show-faces="false"' +
                'data-auto-logout-link="false" onlogin=""></div>',
      restrict: 'E',
      link: function ($scope, element, attrs, ctrl) {
        console.log(attrs);
      }
    }
  });
