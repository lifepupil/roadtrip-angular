'use strict';

angular.module('roadtrip')
.factory('Trip', function($http, nodeUrl){

  function Trip(obj){
    this._id = obj._id;
    this.name = obj.name;
    this.departure = obj.departure;
  }

  Trip.removeStop = function(tripId, stopId) {
    console.log('in trip factory - tripId', tripId, 'and stopId', stopId);
    // console.log('in trip factory - ', nodeUrl + '/trips/' + tripId + '/stops/' + stopId);

    return $http.delete(nodeUrl + '/trips/' + tripId + '/stops/' + stopId);
  };

  Trip.show = function(tripId){
    return $http.get(nodeUrl + '/trips/' + tripId);
  };

  Trip.find = function(){
    return $http.get(nodeUrl + '/trips');
  };


  Trip.prototype.addStop = function(stop) {
    return $http.post(nodeUrl + '/trips/' + this._id + '/stops', stop);
  };

  Trip.prototype.save = function(){
    return $http.post(nodeUrl + '/trips', this);
  };

  return Trip;
});
