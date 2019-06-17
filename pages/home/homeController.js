angular.module("myApp")
    .controller("homeController", function ($scope, $window, $http, views, $q) {
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
                if ($scope.reviews[response.data[0].poiId] !== false) {
                    $scope.poid1.reviews = $scope.reviews[response.data[0].poiId];
                }

                $scope.poiname2 = response.data[1].poiname;
                $scope.rnk2 = response.data[1].rnk;
                $scope.category2 = response.data[1].category;
                $scope.desc2 = response.data[1].descr;
                $scope.view2 = response.data[1].viw;
                $scope.src2 = response.data[1].picture;
                $scope.poid2 = response.data[1];
                if ($scope.reviews[response.data[1].poiId] !== false) {
                    $scope.poid2.reviews = $scope.reviews[response.data[1].poiId];
                }

                $scope.poiname3 = response.data[2].poiname;
                $scope.rnk3 = response.data[2].rnk;
                $scope.category3 = response.data[2].category;
                $scope.desc3 = response.data[2].descr;
                $scope.view3 = response.data[2].viw;
                $scope.src3 = response.data[2].picture;
                $scope.poid3 = response.data[2];
                if ($scope.reviews[response.data[2].poiId] !== false) {
                    $scope.poid3.reviews = $scope.reviews[response.data[2].poiId];
                }
            });
        };

        $scope.rowClick = function (selected) { //for modal function - to know which poi was clicked
            $scope.selectedpoi = selected;
            views.updateViews(selected);
        }

        $scope.getAllReviews = function () {
            var promises = [];
            let rvws = new Array(20);
            rvws[0] = false;
            for (let i = 1; i <= 20; i++) {
                let req = {
                    method: 'GET',
                    url: 'http://localhost:3000/getReviewPOI',
                    params: {
                        poiId: i,
                    }
                }
                let promise = $http(req).then(function (response) {
                    let send = response.data;
                    rvws[i] = send;
                    // console.log(send);
                });
                promises.push(promise);
            }
            $q.all(promises).then(function (resp) {
                $scope.reviews = rvws;
            });
        }
    });


