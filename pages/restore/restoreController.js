angular.module("myApp")
    .controller("restoreController", function ($scope, $http, $window) {
        $scope.logIn = function () {
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/restore',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: {
                    username: $scope.username,
                    question: $scope.question,
                    answer: $scope.answer
                }
            }
            $http(req).then(function (response) {
                $scope.pass.value = response.data;
            });
        };

        $scope.restorePassword = function () {

        };
    });



