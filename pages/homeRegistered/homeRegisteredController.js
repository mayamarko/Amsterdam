angular.module("myApp")
    .controller("homeRegisteredController", function ($scope, $window, $http, views) {
        self = this;
        $scope.getByInterests = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/private/getPOIbyInterests',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            }
            $http(req).then(function (response) {
                if (response.data === false) {

                } else {
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
                }
            });
        };

        $scope.getSaved = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/private/getSavedPOI',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            }
            $http(req).then(function (response) {
                if (response.data === false) {
                    $scope.hide1 = true;
                    $scope.show1 = true;
                } else {
                    $scope.poiname3 = response.data[0].poiname;
                    $scope.rnk3 = response.data[0].rnk;
                    $scope.category3 = response.data[0].category;
                    $scope.desc3 = response.data[0].descr;
                    $scope.view3 = response.data[0].viw;
                    $scope.src3 = response.data[0].picture;
                    $scope.poid3 = response.data[0];

                    $scope.poiname4 = response.data[1].poiname;
                    $scope.rnk4 = response.data[1].rnk;
                    $scope.category4 = response.data[1].category;
                    $scope.desc4 = response.data[1].descr;
                    $scope.view4 = response.data[1].viw;
                    $scope.src4 = response.data[1].picture;
                    $scope.poid4 = response.data[1];
                }
            });
        };

        $scope.update = function (poi) {
            views.updateViews(poi);
        }
    });
