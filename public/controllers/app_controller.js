var app = angular.module("appName", []);

app.controller("appController", function($scope, $http, $filter) {

    $scope.humidity = "";
    $scope.temperature = "";
    $scope.last_day_sleep_hours = "";
    $scope.week_sleep_hours = "";
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


    var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";
    var url1 = couldantString + "firsttry/_design/count_temp/_view/count_temp?group=true"; //countTemp
    var url2 = couldantString + "firsttry/_design/sum_temp/_view/sum_temp_view?group=true"; //sumTemp
    var url3 = couldantString + "firsttry/_design/sum_humidity/_view/sum_humidity?group=true"; //sumHumidity

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
        });
    }

    $scope.humidityfunc = function() {
          
            $http.get(url3).success(function(response) {
                $scope.humidity = response.rows[index].value / count1;
        });
    }



    $scope.init = function() {
        $scope.temp();
        $scope.humidityfunc();
    }
    $scope.init();
});
