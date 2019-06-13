angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window) {
        $scope.logIn = function () {
                let req = {
                    method: 'POST',
                    url: "http://localhost:3000/login",
                    data: {
                        username: $scope.username,
                        password: $scope.password
                    }
                }
                $http(req).then(function (response) {
                    $scope.myWelcome = response.data;
                    $window.sessionStorage.setItem("token", response.data);
                    $window.sessionStorage.setItem("name", $scope.username);
                    //edit the username name and turn off the button
                    $window.location.href="#!about";
                });
            };

    });



