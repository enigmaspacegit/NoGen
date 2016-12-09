var app = angular.module("appName", []);

app.controller("preferenceController", function($scope, $http, $filter) {

    $scope.sleeptimeHR = "0";
    $scope.sleeptimeMin = "0";
    $scope.waketimeMin = "0";
    $scope.waketimeHR = "0";
    $scope.environment = "Beach"
    $scope.rev = "notHere";
    var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";



    $scope.sendPrefData = function() {
        var light_slider = angular.element(document.querySelector('#set1')).val();
        var days = [];
        var fan_slider = angular.element(document.querySelector('#set2')).val();
        var sleepTime = $scope.sleeptimeHR + ":" + $scope.sleeptimeMin;
        var wakeTime = $scope.waketimeHR + ":" + $scope.waketimeMin;
        console.log(sleepTime);
        console.log(wakeTime);


        var data = {
            "_id": "harshshah",
            "fan": {
                "auto": true,
                "fan": fan_slider
            },
            "light": {
                "auto": true,
                "light_intensity": light_slider
            },
            "servo_motor": {
                "auto": true
            },
            "sleep_time": sleepTime,
            "wakeup_time": wakeTime,
            "sleep_environment": $scope.environment,
            "days": days
        }

        var config = {
                headers: {
                    'Content-Type': 'application/json;'
                }
            }
		var url = couldantString + "userpreference";
        if ($scope.rev != "notHere") {
            data["_rev"] = $scope.rev;
            $http.put(url,data,config).
            success(function(data, status, headers, config){
            	console.log("LALALALA");
            })
        } else {
            
            $http.post(url, data, config)
                .success(function(data, status, headers, config) {
                    console.log("DHDHDHDHD");
                    console.log(data);
                })

        }


        //var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";


    }

    $scope.getInitial = function() {
        var url = couldantString + "userpreference/harshshah";
        $http.get(url)
            .success(function(response) {
                changeLightPref(response["light"]["light_intensity"]);
                changeFanPref(response["fan"]["fan"]);
                $scope.environment = response["sleep_environment"];
                var sleep_time = response["sleep_time"];
                $scope.sleeptimeHR = sleep_time.split(':')[0];
                $scope.sleeptimeMin = sleep_time.split(':')[1];
                var wakeup_time = response["wakeup_time"];
                $scope.waketimeHR = wakeup_time.split(':')[0];
                $scope.waketimeMin = wakeup_time.split(':')[1];
                $scope.rev = response["_rev"];
            }).error(function(response) {
                console.log(response);
            })
    }


    $scope.getInitial();

});
