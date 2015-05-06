'use strict';

angular.module('ROADTRIP')
.factory('User', function($rootScope, $http, nodeUrl){

  function User(obj){
    this.email = obj.email;
    this.avatar = obj.avatar;
  }

  User.prototype.save = function() {
    $http.put(nodeUrl + '/users', this);
  };

  User.findOrCreate = function() {
    return $http.post(nodeUrl + '/users');
  };

  User.oauth = function(provider) {
    return $rootScope.afAuth.$authWithOAuthPopup(provider);
  };

  User.register = function(user){
    return $rootScope.afAuth.$createUser(user);
  };

  User.login = function(user){
    return $rootScope.afAuth.$authWithPassword(user);
  };

  User.logout = function(){
    return $rootScope.afAuth.$unauth();
  };

  return User;
});
