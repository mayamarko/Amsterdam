angular.module("myApp")
    .controller("restoreController", function ($scope, $http, $window) {
        $scope.logIn = function() {
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/login',
                headers: {
                    'Content-Type': 'application/json'
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

        $scope.restorePassword = function() {

        };
    });



