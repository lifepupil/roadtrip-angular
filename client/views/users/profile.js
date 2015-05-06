'use strict';

angular.module('ROADTRIP')
.controller('ProfileCtrl', function($scope, $window, User){
	User.get()
	.then(function(response) {
		$scope.user = response.data;
	});


	$scope.update = function(obj) {
		var user = new User(obj);
		user.save()
		.then(function(){
      $window.swal({title: 'Profile updated', text: 'Congradulations, your profile was updated.', type: 'success'});
		})
		.catch(function(){
      $window.swal({title: 'Profile Save Error', text: 'Warning, there was a problem saving your profile.', type: 'error'});
		});
	};

});
