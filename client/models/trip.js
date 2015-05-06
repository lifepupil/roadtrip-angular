'use strict';

angular.module('ROADTRIP')
.factory('Trip', function($http, nodeUrl){

  function Trip(obj){
    this.name = obj.name;
    this.departure = obj.departure;
  }

  Trip.show = function() {
    
  };


  Trip.find = function() {
    return $http.get(nodeUrl + '/trips');
  };

  Trip.prototype.save = function() {
    return $http.post(nodeUrl + '/trips', this);
  };



  return Trip;
});
