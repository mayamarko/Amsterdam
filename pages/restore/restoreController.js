angular.module("myApp")
    .controller("restoreController", function ($scope, $http, $window) {
        $scope.restore = function () {
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/restore',
                data: {
                    username: $scope.username,
                    question: $scope.question,
                    answer: $scope.answer
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                $scope.pass = {
                    label: response.data
            }
                $scope.show = true;
            });
        };

        $scope.restorePassword = function () {

        };
    });



