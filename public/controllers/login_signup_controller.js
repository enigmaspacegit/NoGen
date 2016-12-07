var app = angular.module("appName", []);

app.controller("loginController", function($scope, $http) {
    $scope.call = function() {
        var url = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/firsttry/_design/date/_search/newSearch?q=day:\"3-12-2016\""
        $http.get(url).success(function(response) {
            console.log(tiledata);
        }).error(function(error, status) {
            console.log(error);
        });
    }
}).controller("signupController", function($scope, $http) {
    $scope.username = "";
    $scope.password = "";
    $scope.email = "";
    $scope.age = "";
    $scope.city = "";

    $scope.call = function() {
        var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/"
        var url = couldantString + "firsttry/"
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
            })
            .error(function(data, status, header, config) {
                console.log ("Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config);

                $scope.error_invalid_username = "Username Already Present";
            });
    }

});
