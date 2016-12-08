var app = angular.module("appName",[]);

app.controller("preferenceController", function($scope, $http, $filter) 
{
	$scope.monday_checkbox = false;
	$scope.tuesday_checkbox = false;
	$scope.wednesday_checkbox = false;
	$scope.thursday_checkbox = false;
	$scope.friday_checkbox = false;
	$scope.saturday_checkbox = false;
	$scope.sunday_checkbox = false;

});