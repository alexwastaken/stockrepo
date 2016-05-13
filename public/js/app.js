angular.module('myApp', []);

angular.module('myApp').controller('mainController', ['$scope', function($scope) {

	$scope.people = clientPeople;

}]);

console.log('app.js is attached')