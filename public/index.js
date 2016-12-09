var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			redirectTo: '/home'
		})
		.when('/analysis', {
			templateUrl: 'analysis.html',
		})
		.when('/home', {
			templateUrl: 'UI.html',
		})		
        .when('/preference', {
            templateUrl: 'preferences.html',
        })      
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


mainApp.controller("appController", function($scope, $http, $filter) {

    $scope.humidity = "";
    $scope.temperature = "";
    $scope.last_day_sleep_hours = "";
    $scope.week_sleep_hours = "";
    $scope.pref_light_slider = 50;
    $scope.pref_fan_slider = 0;
    $scope.pref_sleep_time = "";
    $scope.pref_wakeup_time = "";
    $scope.checkbox_light = true;
    $scope.checkbox_fan = true;
    $scope.checkbox_servo = true;
    $scope.checkbox4 = true;
    $scope.uname = "";



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
    var url5 = couldantString + "userpreference/_design/preference/_search/preference?q=uname:harsh";

    $scope.sendDataLight = function() {
         var light_slider = angular.element(document.querySelector( '#range1' )).val();
         if(!$scope.checkbox_light){
                 var url7 = "http://sangamesh-somawar-1.mybluemix.net/setled?intensity="+light_slider;
         $http.get(url7).success(function(response) {
            console.log("DONE DANA DONE");
        });
         }
    }

    $scope.sendDataFan = function(){
         var fan_slider = angular.element(document.querySelector( '#range2' )).val();
         if(!$scope.checkbox_fan)
                 console.log("sendDataFan "+ fan_slider);
    }

    $scope.sendDataServo = function(){
         var blinds_switch = angular.element(document.querySelector( '#blinds_switch' ));
         console.log(blinds_switch);
    }

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
         console.log(response);
            $scope.checkbox_servo = response.rows[0].fields.servo_auto;

            $scope.checkbox_light = (response.rows[0].fields.light_auto === "true");
            changeLightAutoStatus($scope.checkbox_light);

            $scope.checkbox_fan = (response.rows[0].fields.fan_auto === "true")
            changeFanAutoStatus($scope.checkbox_fan);

            $scope.checkbox_servo  = (response.rows[0].fields.servo_auto === "true")
            console.log($scope.checkbox_servo);

            $scope.uname = response.rows[0].fields.uname;

            $scope.pref_fan_slider = response.rows[0].fields.fan;
            changeFan($scope.pref_fan_slider);

            $scope.pref_light_slider = response.rows[0].fields.light_intensity;
            changeLight($scope.pref_light_slider);

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

mainApp.controller("preferenceController", function($scope, $http, $filter) {

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
            var url1 = url+"/harshshah";
            $http.put(url1,data,config).
            success(function(data, status, headers, config){
                $scope.rev = data["rev"];
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