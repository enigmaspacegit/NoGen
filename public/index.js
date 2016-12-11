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


        if ($scope.username != "" && $scope.password != "") {
            var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";
            var url = couldantString + "registration/_design/registration/_search/existSearch?q=uname:\"" + $scope.username + "\" AND password:\"" + $scope.password + "\"";

            var config = {
                headers: {
                    'Content-Type': 'application/json;charset=utf-8;'
                }
            }

            $http.get(url)
                .success(function(data, status, headers, config) {
                    console.log(data);
                    console.log(data.total_rows);
                    if (data.total_rows == 1) {
                        $scope.username = "";
                        $scope.password = "";
                        $window.location.href = '/home.html';
                    } else {
                        $scope.error_invalid_login = "Something's Wrong. Please try again!";
                    }
                })
                .error(function(data, status, header, config) {
                    console.log("Data: " + data +
                        "<hr />status: " + status +
                        "<hr />headers: " + header +
                        "<hr />config: " + config);
                    $scope.username = "";
                    $scope.password = "";
                    $scope.error_invalid_login = "Something's Wrong. Please try again!";
                });
        }
        else
            $scope.error_invalid_login = "Something's Wrong. Please try again!";



    }
}).controller("signupController", function($scope, $http, $window) {
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
                $window.location.href = '/home.html';

            })
            .error(function(data, status, header, config) {
                console.log("Data: " + data +
                    "<hr />status: " + status +
                    "<hr />headers: " + header +
                    "<hr />config: " + config);
                $scope.username = "";
                $scope.error_invalid_username = "Username Already Present";
            });
    }
});


mainApp.controller('AnalysisController', function($scope, $http) {

    $scope.arraytemp = [];
    $scope.arrayHumTemp = [];
    $scope.countArray = [];
    $scope.filterField = 1;
    $scope.dataHumidity = [];
    $scope.tempSumArray = [];
    $scope.humiditySumArray = [];
    $scope.dataTemperature = [];

    $scope.rangeOptions = {
        "1": "First Week",
        "2": "Second Week",
        "3": "Third Week",
        "4": "Fourth Week"
    }
    $scope.label_name = "First Week Chart";
    $scope.updateBar = function() {
        $scope.selectedField = $scope.filterField;
        $scope.data = [];
        if ($scope.selectedField == 1) {
            //$scope.labels = ["1/11", "2/11", "3/11", "4/11", "5/11", "6/11", "7/11"];
            // $scope.data = [5, 8, 1, 10, 4, 8, 3];
            $scope.sortFunction(1);
            $scope.label_name = "First Week Chart";
        } else if ($scope.selectedField == 2) {
            //$scope.labels = ["8/11", "9/11", "10/11", "11/11", "12/11", "13/11", "14/11"];
            $scope.sortFunction(2);
            $scope.label_name = "Second Week Chart";
        } else if ($scope.selectedField == 3) {
            // $scope.labels = ["15/11", "16/11", "17/11", "18/11", "19/11", "20/11", "21/11"];
            $scope.sortFunction(3);
            $scope.label_name = "Third Week Chart";
        } else if ($scope.selectedField == 4) {
            //$scope.labels = ["22/11", "23/11", "24/11", "25/11", "26/11", "27/11", "28/11"];
            $scope.sortFunction(4);
            $scope.label_name = "Last Week Chart";
        }
        alertMe();
    }

    var calculateHours = function(end_time, start_time) {
        var date1 = new Date(end_time);
        var date2 = new Date(start_time);

        var date3 = new Date(date1 - date2);
        var subDate = new Date(date3.getTime() - (330 * 60 * 1000))

        return (subDate.getHours() + "." + (subDate.getMinutes() * 5 / 3));
    }

    $scope.sortFunction = function(value) {
        var start_index = (value - 1) * 7;
        var end_index = (value * 7) - 1;
        var temp_label = [];
        var temp_sleep_hour = [];
        var temp_temp = [];
        var temp_humidity = [];
        for (i = start_index; i <= end_index; i++) {
            temp_label.push($scope.arraytemp[i]["doc"]["d"]["day"].substring(0, 5));
            temp_sleep_hour.push(parseFloat(calculateHours($scope.arraytemp[i]["doc"]["d"]["end_time"], $scope.arraytemp[i]["doc"]["d"]["start_time"])));
            temp_temp.push(($scope.tempSumArray[i]["value"]) / ($scope.countArray[i]["value"]));
            temp_humidity.push(($scope.humiditySumArray[i]["value"]) / ($scope.countArray[i]["value"]));
        }

        $scope.labels = temp_label;
        $scope.data = temp_sleep_hour;
        $scope.dataTemperature = temp_temp;
        $scope.dataHumidity = temp_humidity;
    }



    $scope.getData = function() {
        var end_date = new Date();
        var dd = end_date.getDate() - 1;
        var mm = end_date.getMonth() + 1;
        var yy = end_date.getFullYear();
        if (dd <= 0) {
            dd = 30;
            mm = mm - 1;
        }
        dd = ("0" + dd).slice(-2);
        mm = ("0" + mm).slice(-2);
        var start_date = new Date(end_date.getTime() - (30 * 24 * 60 * 60 * 1000));

        end_date = mm + "-" + dd + "-" + yy;


        dd = start_date.getDate() - 1;
        mm = start_date.getMonth() + 1;
        yy = start_date.getFullYear();
        if (dd <= 0) {
            dd = 30;
            mm = mm - 1;
        }
        dd = ("0" + dd).slice(-2);
        mm = ("0" + mm).slice(-2);
        start_date = mm + "-" + dd + "-" + yy;
        console.log(start_date);

        var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";

        var url = couldantString + "sleeptime/_all_docs?endkey=\"" + end_date + "\"&startkey=\"" + start_date + "\"&include_docs=true";
        var url1 = couldantString + "firsttry/_design/count_temp/_view/count_temp?group=true&endkey=\"" + end_date + "\"&startkey=\"" + start_date + "\"";
        var url2 = couldantString + "firsttry/_design/sum_temp/_view/sum_temp_view?group=true&endkey=\"" + end_date + "\"&startkey=\"" + start_date + "\"";
        var url3 = couldantString + "firsttry/_design/sum_humidity/_view/sum_humidity?group=true&endkey=\"" + end_date + "\"&startkey=\"" + start_date + "\"";

        $http.get(url).success(function(response) {
            console.log(response);
            $scope.arraytemp = response.rows.reverse();
        });

        $http.get(url1).success(function(response) {
            $scope.countArray = response.rows.reverse();

            $http.get(url2).success(function(response) {
                $scope.tempSumArray = response.rows.reverse();
                console.log($scope.tempSumArray);
                $http.get(url3).success(function(response) {
                    $scope.humiditySumArray = response.rows.reverse();
                    $scope.sortFunction(1);
                    alertMe();
                })
            })

        });


    }

    $scope.getData();
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
    $scope.checkbox_audio = true;
    $scope.uname = "";
    $scope.manual_environment = "Beach";



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
    dd = ("0" + dd).slice(-2);
    mm = ("0" + mm).slice(-2);

    var index = "";
    date = mm + "-" + dd + "-" + yy;
    var date_sleepTime = mm + "-" + dd + "-" + yy;


    var couldantString = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/";
    var url1 = couldantString + "firsttry/_design/count_temp/_view/count_temp?group=true"; //countTemp
    var url2 = couldantString + "firsttry/_design/sum_temp/_view/sum_temp_view?group=true"; //sumTemp
    var url3 = couldantString + "firsttry/_design/sum_humidity/_view/sum_humidity?group=true"; //sumHumidity
    var url4 = couldantString + "sleeptime/_design/sleep/_search/sleeptime?q=date:" //sleepTime
    var url5 = couldantString + "userpreference/_design/preference/_search/preference?q=uname:harsh";


    $scope.sendDataLight = function() {
        var light_slider = angular.element(document.querySelector('#range1')).val();
        if (!$scope.checkbox_light) {
            var url7 = "http://sangamesh-somawar-1.mybluemix.net/setled?intensity=" + light_slider;
            $http.get(url7).success(function(response) {
                console.log("DONE DANA DONE");
            });
        }
    }

    //playaudioui?filename= 
    //stopaudioui

    $scope.sendDataFan = function() {
        var fan_slider = angular.element(document.querySelector('#range2')).val();
        if (!$scope.checkbox_fan)
            console.log("sendDataFan " + fan_slider);
    }

    $scope.sendDataServo = function() {
        var blinds_switch = document.querySelector('#blinds_switch');
        var urlopen = "http://sangamesh-somawar-1.mybluemix.net/blindsopen";
        var urlclose = "http://sangamesh-somawar-1.mybluemix.net/blindsclose";
        if (blinds_switch.checked) {
            $http.get(urlopen).success(function(response) {
                console.log("DONE DONE DONE");
            });
        } else {
            $http.get(urlclose).success(function(response) {
                console.log("DONE DONE DONE");
            });
        }
        console.log(blinds_switch.checked);
    }

    $scope.playaudio = function() {
        var filename = $scope.manual_environment + ".mp3";
        var url = "http://sangamesh-somawar-1.mybluemix.net/playaudioui?filename=" + filename;
        $http.get(url).success(function(response) { console.log("asdasdasd"); });
    }

    $scope.stopaudio = function() {
        var url = "http://sangamesh-somawar-1.mybluemix.net/stopaudioui";
        $http.get(url).success(function(response) { console.log("asdasdasd"); });
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
                $scope.temperature = (response.rows[index].value / count1).toFixed(2);
            });

            $http.get(url3).success(function(response) {
                $scope.humidity = (response.rows[index].value / count1).toFixed(2);
            });
        });
    }

    $scope.last_day_sleep_func = function() {
        url4 = url4 + date;
        $http.get(url4).success(function(response) {
            $scope.parseTime(response.rows[0].fields.end_time, response.rows[0].fields.start_time, false);
        });
    }

    $scope.week_sleep_func = function() {
        end_date = date;
        var start_date = new Date(new Date().getTime() - (8 * 24 * 60 * 60 * 1000));
        dd = start_date.getDate() - 1;
        mm = start_date.getMonth() + 1;
        yy = start_date.getFullYear();
        if (dd <= 0) {
            dd = 30;
            mm = mm - 1;
        }
        dd = ("0" + dd).slice(-2);
        mm = ("0" + mm).slice(-2);
        start_date = mm + "-" + dd + "-" + yy;

        var url6 = couldantString + "sleeptime/_all_docs?endkey=\"" + end_date + "\"&startkey=\"" + start_date + "\"&include_docs=true";
        $http.get(url6).success(function(response) {
            console.log(response);
            var sum = 0.0;
            for (i = 0; i < response.rows.length; i++) {
                sum = sum + parseFloat($scope.parseTime(response.rows[i]["doc"]["d"].end_time, response.rows[i]["doc"]["d"].start_time, true));
            }

            console.log(sum);

            $scope.week_sleep_hours = sum.toFixed(2);
        })
    }

    $scope.parseTime = function(end_time, start_time, bool) {

        var date1 = new Date(end_time);
        var date2 = new Date(start_time);

        var date3 = new Date(date1 - date2);
        var subDate = new Date(date3.getTime() - (330 * 60 * 1000))
        if (bool) {
            return subDate.getHours() + "." + subDate.getMinutes() * 100 / 60;
        } else {
            $scope.last_day_sleep_hours = subDate.getHours() + ":" + subDate.getMinutes();
        }


    }


    $scope.sliders_init = function() {
        $http.get(url5).success(function(response) {
            console.log(response);
            $scope.checkbox_servo = response.rows[0].fields.servo_auto;

            $scope.checkbox_light = (response.rows[0].fields.light_auto === "true");
            changeLightAutoStatus($scope.checkbox_light);

            $scope.checkbox_fan = (response.rows[0].fields.fan_auto === "true")
            changeFanAutoStatus($scope.checkbox_fan);

            $scope.checkbox_servo = (response.rows[0].fields.servo_auto === "true")
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
        $scope.week_sleep_func();
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
            "sleep_environment": $scope.environment
        }

        var config = {
            headers: {
                'Content-Type': 'application/json;'
            }
        }
        var url = couldantString + "userpreference";



        if ($scope.rev != "notHere") {
            data["_rev"] = $scope.rev;
            var url1 = url + "/harshshah";
            $http.put(url1, data, config).
            success(function(data, status, headers, config) {
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
