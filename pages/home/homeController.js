angular.module("myApp")
    .controller("homeController", function ($scope, $window, $http, views) {
        self = this;
        $scope.reg = function () {
            $window.location.href = "#!register";
        };
        $scope.log = function () {
            $window.location.href = "#!login";
        };
        $scope.getRandomPOI = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getRandomPoi',
            }
            $http(req).then(function (response) {
                $scope.poiname1 = response.data[0].poiname;
                $scope.rnk1 = response.data[0].rnk;
                $scope.category1 = response.data[0].category;
                $scope.desc1 = response.data[0].descr;
                $scope.view1 = response.data[0].viw;
                $scope.src1 = response.data[0].picture;
                $scope.poid1 = response.data[0];

                $scope.poiname2 = response.data[1].poiname;
                $scope.rnk2 = response.data[1].rnk;
                $scope.category2 = response.data[1].category;
                $scope.desc2 = response.data[1].descr;
                $scope.view2 = response.data[1].viw;
                $scope.src2 = response.data[1].picture;
                $scope.poid2 = response.data[1];

                $scope.poiname3 = response.data[2].poiname;
                $scope.rnk3 = response.data[2].rnk;
                $scope.category3 = response.data[2].category;
                $scope.desc3 = response.data[2].descr;
                $scope.view3 = response.data[2].viw;
                $scope.src3 = response.data[2].picture;
                $scope.poid3 = response.data[2];
            });
        };
        $scope.update = function (poi) {
            views.updateViews(poi);
        }
    });


