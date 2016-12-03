var app = angular.module("appName", ['ngRoute']);

app.config(function($routeProvider) {

	$routeProvider
		.when('/', {
			templateUrl: 'UI.html',
			controller: 'appController'
		})
		.when('/analysis.html', {
			templateUrl: 'analysis.html',
			controller: 'analysisController'
		})
		.otherwise({
			redirectTo: '/view1'
		});
});