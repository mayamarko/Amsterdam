angular.module("myApp")
    .controller("loginController", function ($scope, $http, $window) {
        $scope.logIn = function () {
            let usernamep=$scope.username;
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
                    $window.sessionStorage.setItem("token", response.data);
                    $window.sessionStorage.setItem("name", usernamep);
                    //edit the username name and turn off the button
                    $scope.$emit('userLogged', {username: usernamep});
                    $window.location.href="#!homeRegistered";

                });
            };

    });



