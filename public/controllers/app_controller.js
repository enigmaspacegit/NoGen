var app = angular.module("appName",[]);

app.controller("appController",function($scope,$http)
{
	$scope.humidity = "32";
	$scope.temperature = "";
	$scope.last_day_sleep_hours = "";
	$scope.week_sleep_hours = "";
	$scope.call = function(){
		var url = "https://6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix:08c0c7801afd410eea51d5913a2a81bdaeecc480de508954f54c3388873c64a6@6e3a252f-2d39-4b3e-a820-b8d3e9c08a9e-bluemix.cloudant.com/firsttry/_design/date/_search/newSearch?q=day:\"3-12-2016\""
		$http.get(url).success(function(response) {
       	$scope.tiledata = response;
       	console.log($scope.tiledata);
       	console.log($scope.tiledata.rows[0].fields.humidity);
       });
   }

   $scope.call()
});
