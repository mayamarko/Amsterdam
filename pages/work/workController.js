angular.module("myApp")
    .controller("workController", function ($window, $scope, $http) {

        $scope.workIt = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/private/getInterests',
                headers:{
                    'x-auth-token':$window.sessionStorage.getItem("token")
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
            });
        };


    });