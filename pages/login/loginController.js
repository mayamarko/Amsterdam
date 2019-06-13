angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window) {
        $scope.logIn = function () {
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/login',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin':'*',
                    "Access-Control-Allow-Methods":'GET, POST, PUT, DELETE, OPTIONS;'
                },
                data: {
                    username: $scope.username,
                    password: $scope.password
                }
            }
            $http(req).then(function (response) {
                $scope.myWelcome = response.data;
                $window.sessionStorage.setItem("token", response.data);
                $window.sessionStorage.setItem("name", $scope.username);
            });
        };

        $scope.restorePassword = function () {

        };
    });



