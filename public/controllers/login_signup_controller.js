var app = angular.module("appName", []);

app.controller("loginController", function($scope, $http, $window) {

	 $scope.username = "";
    $scope.password = "";
    $scope.call = function() {

    	var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";
        var url = couldantString + "registration/_design/registration/_search/existSearch?q=uname:\""+$scope.username+"\" AND password:\""+$scope.password+"\""
        // var data = {
        //     "_id": $scope.username,
        //     "d": {
        //         "password": $scope.password,
        //     }
        // }

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
                	$window.location.href = '/home/akshay/Desktop/Enigma/NoGen/public/UI.html';
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
