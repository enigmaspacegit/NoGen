var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/home'
		})
		.when('/analysis', {
			templateUrl: 'analysis.html',
		})
		.when('/analysis', {
			templateUrl: 'analysis.html',
		})
		.when('/home', {
			templateUrl: 'UI.html',
		});		
});

mainApp.controller('IndexController', function($scope) {
	$scope.message = "Welcome To Index Page";
});

mainApp.controller('signupController', function($scope) {
	$scope.message = "Welcome To Index Page";
});

mainApp.controller("loginController", function($scope, $http, $window) {

	 $scope.username = "";
    $scope.password = "";
    $scope.call = function() {

    	var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";
        var url = couldantString + "registration/_design/registration/_search/existSearch?q=uname:\""+$scope.username+"\" AND password:\""+$scope.password+"\"";

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }

        $http.get(url)
            .success(function(data, status, headers, config) {
                console.log(status);
                console.log(data.total_rows);
                if(data.total_rows==1){
                	$scope.username = "";
                	$scope.password = "";
                	$window.location.href = '/home.html';
                }
                else
                	$scope.error_invalid_login = "Something's Wrong. Please try again!";
            })
            .error(function(data, status, header, config) {
                console.log ("Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config);
                $scope.username = "";
                $scope.password = "";
                $scope.error_invalid_login = "Something's Wrong. Please try again!";
            });
       
    }
}).controller("signupController", function($scope, $http,$window) {
    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    $scope.age = "";
    $scope.city = "";

    $scope.call = function() {
        var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/"
        var url = couldantString + "registration/"
        var data = {
            "_id": $scope.username,
            "d": {
                "email": $scope.email,
                "password": $scope.password,
                "age": $scope.age,
                "date": $scope.city
            }
        }

        var config = {
            headers: {
                'Content-Type': 'application/json;charset=utf-8;'
            }
        }

        $http.post(url, data, config)
            .success(function(data, status, headers, config) {
                console.log(status);
                $scope.username = "";
                $scope.password = "";
                $scope.email = "";
                $scope.age = "";
                $scope.city = "";
                $window.location.href = '/home/akshay/Desktop/Enigma/NoGen/public/UI.html';

            })
            .error(function(data, status, header, config) {
                console.log ("Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config);
                $scope.username = "";
                $scope.error_invalid_username = "Username Already Present";
            });
    }
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
