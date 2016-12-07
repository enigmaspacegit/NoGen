var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/home'
		})
		.when('/analysis', {
			templateUrl: 'analysis.html',
		})
		.otherwise({
			redirectTo: '/home'
		});
});

mainApp.controller('IndexController', function($scope) {
	$scope.message = "Welcome To Index Page";
});
mainApp.controller('AnalysisController', function($scope) {
	
	$scope.rangeOptions = 
	{
		"1":"First Week",
		"2":"Second Week",
		"3":"Third Week",
		"4":"Fourth Week"
	}
	$scope.label_name  ="First Week Chart";
	$scope.updateBar = function() {
		$scope.selectedField = $scope.filterField;
		$scope.data = [];
		if ($scope.selectedField == 1){
			$scope.labels  = ["1/11", "2/11", "3/11", "4/11", "5/11", "6/11", "7/11"];
			$scope.data = [5,8,1,10,4,8,3];
			$scope.label_name = "First Week Chart";
		}
		else if ($scope.selectedField == 2){
			$scope.labels  = ["8/11", "9/11", "10/11", "11/11", "12/11", "13/11", "14/11"];
			$scope.data = [5,8,1,10,4,8,3];
			$scope.label_name = "Second Week Chart";
		}
		else if ($scope.selectedField == 3){
			$scope.labels  = ["15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11"];
			$scope.data = [5,2,6,1,4,10,3];
			$scope.label_name = "Third Week Chart";
		}
		else if ($scope.selectedField == 4){
			$scope.labels  = ["22/11", "23/11", "24/11", "25/11", "26/11", "27/11", "28/11"];
			$scope.data = [9,2,10,1,2,4,5];
			$scope.label_name = "Last Week Chart";
		}
		alertMe();
	}
});
