/* jshint camelcase: false */

'use strict';

angular.module('roadtrip')
.controller('TripsShowCtrl', function($scope, $state, Trip, Map, $window){

  Trip.show($state.params.tripId)
  .then(function(response){
    $scope.trip = response.data;
    addMarkers();
  });

  $scope.removeStop = function(stop) {
    console.log('remove stop', stop._id, ' trip ', $scope.trip);
    Trip.removeStop($scope.trip._id, stop._id)
    .then(function(reply) {
      // console.log('inside removestop callback ', reply.data);
      $window._.remove($scope.trip.stops, {_id: reply.data});
      addMarkers();
    });
  };



  $scope.create = function(stop) {
    Map.geocode(stop.name, function(results) {
      if(results && results.length) {
        stop.name = results[0].formatted_address;
        stop.lat = results[0].geometry.location.lat();
        stop.lng = results[0].geometry.location.lng();

        var trip = new Trip($scope.trip);
        trip.addStop(stop)
        .then(function(response) {
          $scope.trip = response.data;
          addMarkers();
        });
      }

    });
  };

  var map = Map.create('#map', 37.54, -121.98, 8);
  var markers = [];

  function addMarkers() {
    clearMarkers();
    markers = $scope.trip.stops.map(function(s) {
      return Map.addMarker(map, s.lat, s.lng, s.name, '/assets/markerflag.png');
    });
  }

  function clearMarkers() {
    markers.forEach(function(m) {
      m.setMap(null);
    });
    markers = [];
  }


});
