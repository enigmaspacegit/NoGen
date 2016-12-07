var app = angular.module("appName", ['ngRoute']);

app.config(function($routeProvider,$locationProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'UI.html',
			controller: 'appController'
		})
		.when('/analysis', {
			templateUrl: 'analysis.html',
			controller: 'analysisController'
		})
		.otherwise({
			redirectTo: 'view1'
		});	

	$locationProvider.html5Mode(true);
});