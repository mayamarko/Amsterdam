angular.module("myApp")
    .controller("restoreController", function ($scope, $http) {
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
                if (response.data === false) {
                    $scope.pass = {
                        label: "One or more Details are in correct!"
                    }
                } else {
                    $scope.pass = {
                        label: response.data
                    }
                    $scope.show1 = true;
                }
                $scope.show = true;
            });
        };

    });



