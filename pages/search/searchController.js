angular.module("myApp")
    .controller("searchController", function ($scope, $http) {

        $scope.searchIt = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOIBN',
                params: {
                    name: $scope.search,
                }
            }
            $http(req).then(function (response) {
                $scope.poiname = response.data[0].poiname;
                $scope.rnk = response.data[0].rnk;
                $scope.category = response.data[0].category;
                $scope.desc = response.data[0].descr;
                $scope.view = response.data[0].viw;
                $scope.show = true;
            });
        };


    });