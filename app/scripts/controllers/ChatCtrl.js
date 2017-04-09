"use strict";

angular.module("chatUiApp")
  .controller("ChatCtrl", ["$rootScope", "ChatFactory", "ezfb", "$state", "$q", "MessageFactory",
    function ($rootScope, ChatFactory, ezfb, $state, $q, MessageFactory) {

    this.messages = [];
    this.history = [];
    this.text = "";

    $rootScope.user = JSON.parse(sessionStorage.getItem("user"));

    var _this = this;

    ChatFactory.emit('add user', $rootScope.user);

    ChatFactory.on("send", function (event) {
      _this.messages.push(event);
    });

    this.getMessages = function () {
      return this.messages;
    };

    this.getHistory = function () {
      MessageFactory.getHistory()
        .then(function (msgs) {
          _this.history = msgs.data;
        })
        .catch(function (err) {
          alert("Error occurred in fetching history ");
          console.log("Error occurred in fetching history ", err);
        });
    };

    this.send = function (event) {
      if (event.keyCode === 13) {
        var message = {date: new Date(), text: this.text, user: $rootScope.user.name, type:"msg"};
        ChatFactory.emit("stop typing", $rootScope.user);
        ChatFactory.emit("new message", message);
        this.messages.push(message);
        this.text = "";
      } else {
        ChatFactory.emit("typing", {});
      }
    };

    this.logout = function () {
      ChatFactory.emit('user disconnect', $rootScope.user);
      getLoginStatus()
        .then(function () {
          ezfb.logout(function () {
            $rootScope.user = "";
            $state.go("login");
          });
        })
        .catch(function () {
          $rootScope.user = "";
          $state.go("login");
        });
    };

    function getLoginStatus() {
      var deferred = $q.defer();
      FB.getLoginStatus(function(response) {
        if (response && response.status === 'connected') {
          console.log("user is logged in.", response);
          deferred.resolve();
        } else {
          console.log("user is not logged in.");
          deferred.reject();
        }
      });
      return deferred.promise;
    }
  }]);
