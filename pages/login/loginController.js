angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window) {
        $scope.logIn = function () {
            let usernamep = $scope.username;
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
                console.log(response.data);
                if (response.data === false) {
                    $scope.fal="One or more details are incorrect!"
                    $scope.show=true;
                } else {
                    $scope.show=false;
                    $window.sessionStorage.setItem("token", response.data);
                    $window.sessionStorage.setItem("name", usernamep);
                    $scope.$emit('userLogged', {username: usernamep});
                    $window.location.href = "#!homeRegistered";
                }
            });
        };

    });



