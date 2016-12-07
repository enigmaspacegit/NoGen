var app = angular.module("appName", []);

app.controller("appController", function($scope, $http, $filter) {

    $scope.humidity = "";
    $scope.temperature = "";
    $scope.last_day_sleep_hours = "";
    $scope.week_sleep_hours = "";
    $scope.pref_light_slider = 50;
    $scope.pref_light_auto = "";
    $scope.pref_fan_slider = 0;
    $scope.pref_fan_auto  = "";
    $scope.pref_servo_auto = "";
    $scope.pref_sleep_time = "";
    $scope.pref_wakeup_time = "";

    //..........................................
    var date = new Date();
    var dd = date.getDate() - 1;
    var mm = date.getMonth() + 1;
    var yy = date.getFullYear();
    var count1 = "";
    if (dd <= 0) {
        dd = 30;
        mm = mm - 1;
    }

    var index = "";
    date = dd + "-" + mm + "-" + yy;
    var date_sleepTime = mm + "-" + dd + "-" + yy;


    var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";
    var url1 = couldantString + "firsttry/_design/count_temp/_view/count_temp?group=true"; //countTemp
    var url2 = couldantString + "firsttry/_design/sum_temp/_view/sum_temp_view?group=true"; //sumTemp
    var url3 = couldantString + "firsttry/_design/sum_humidity/_view/sum_humidity?group=true"; //sumHumidity
    var url4 = couldantString + "sleeptime/_design/sleep/_search/sleeptime?q=date:" //sleepTime
    var url5 = couldantString + "userpreference/_design/preference/_search/preference?q=uname:harsh"

    $scope.temp = function() {
        $http.get(url1).
        success(function(response) {
            for (i = 0; i < response.rows.length; i++) {
                if (date == response.rows[i].key) {
                    index = i;
                    count1 = response.rows[i].value;
                    break;
                }
            }
            $http.get(url2).success(function(response) {
                $scope.temperature = response.rows[index].value / count1;
            });

            $http.get(url3).success(function(response) {
                $scope.humidity = response.rows[index].value / count1;
            });
        });
    }

    $scope.last_day_sleep_func = function() {
        url4 = url4 + date;
        $http.get(url4).success(function(response) {
            $scope.parseTime(response.rows[0].fields.end_time, response.rows[0].fields.start_time);
        });
    }

    $scope.parseTime = function(end_time, start_time) {
        var date1 = new Date(end_time);
        var date2 = new Date(start_time);

        var date3 = new Date(date1 - date2);

        $scope.last_day_sleep_hours = date3.getHours() + ":" + date3.getMinutes();

    }

    $scope.sliders_init = function() {
        $http.get(url5).success(function(response) {
        	$scope.pref_fan_auto = response.rows[0].fields.fan_auto;
        	$scope.pref_servo_auto = response.rows[0].fields.servo_auto;
        	$scope.pref_light_auto = response.rows[0].fields.light_auto;
        	$scope.pref_fan_slider = response.rows[0].fields.fan;
        	$scope.pref_light_slider = response.rows[0].fields.light_intensity;
        	console.log($scope.pref_light_slider);
        	$scope.pref_wakeup_time = response.rows[0].fields.wakeup_time;
        	$scope.pref_start_time = response.rows[0].fields.start_time;
        });
    }

    $scope.init = function() {
        $scope.temp();
        $scope.last_day_sleep_func();
        $scope.sliders_init();
    }
    $scope.init();
});
