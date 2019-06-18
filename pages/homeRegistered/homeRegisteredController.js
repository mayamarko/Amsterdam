angular.module("myApp")
    .controller("homeRegisteredController", function ($scope, $window, $http, views, $q) {
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
                    $scope.src1 = response.data[0].picture;
                    $scope.poid1 = response.data[0];
                    if ($scope.reviews[response.data[0].poiId] !== false) {
                        $scope.poid1.reviews = $scope.reviews[response.data[0].poiId];
                    }

                    $scope.poiname2 = response.data[1].poiname;
                    $scope.src2 = response.data[1].picture;
                    $scope.poid2 = response.data[1];
                    if ($scope.reviews[response.data[1].poiId] !== false) {
                        $scope.poid2.reviews = $scope.reviews[response.data[1].poiId];
                    }
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
                    $scope.poid3 = response.data;
                    if ($scope.reviews[response.data[0].poiId] !== false) {
                        $scope.poid3[0].reviews = $scope.reviews[response.data[0].poiId];
                    }
                    if ($scope.poid3.length > 1 && $scope.reviews[response.data[0].poiId] !== false) {
                        $scope.poid3[1].reviews = $scope.reviews[response.data[0].poiId];
                    }
                }
            });
        };

        // $scope.update = function (poi) {
        //     views.updateViews(poi);
        // }
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
                });
                promises.push(promise);
            }
            $q.all(promises).then(function (resp) {
                $scope.reviews = rvws;
            });
        }

    });
