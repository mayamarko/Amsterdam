angular.module("myApp")
    .controller("searchController", function ($scope, $http, $window) {
        $scope.searchIt = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOIBN',
                params: {
                    name: $scope.search,
                }
            }
            $http(req).then(function (response) {
                if (response.data === false) {
                    $scope.error = "There is no point of interest with that name."
                    $scope.sho = true;
                    $scope.show1 = false;
                    $scope.es = true;
                    $scope.ms = true;
                    $scope.ts = true;
                    $scope.ps = true;
                    $scope.rs = false;
                } else {
                    $scope.all = response.data[0];
                    $scope.poiname = response.data[0].poiname;
                    $scope.rnk = response.data[0].rnk;
                    $scope.category = response.data[0].category;
                    $scope.desc = response.data[0].descr;
                    $scope.view = response.data[0].viw;
                    $scope.src = response.data[0].picture;
                    $scope.poid = response.data[0].poiId;
                    $scope.all.isSelected = false;
                    if ($window.sessionStorage.getItem("favorites") !== null) {
                        let array = $window.sessionStorage.getItem("favorites").split(",");
                        $scope.all.isSelected = array.includes($scope.poid.toString());
                    }
                    $scope.rs = false;
                    $scope.es = true;
                    $scope.ms = true;
                    $scope.ts = true;
                    $scope.ps = true;
                    $scope.show1 = true;
                    $scope.sho = false;
                }
            });
        };
        $scope.getByCategory = function (category) {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOIBCat',
                params: {
                    category: category,
                }
            }
            $http(req).then(function (response) {
                let needCheck = false;
                let array;
                if ($window.sessionStorage.getItem("favorites") !== null) {
                    array = $window.sessionStorage.getItem("favorites").split(",");
                    needCheck = true;
                }
                if (category === "Eatings") {
                    $scope.pois = response.data;
                    for (let i = 0; i < 5; i++) {
                        $scope.pois[i].isSelected = needCheck && array.includes($scope.pois[i].poiId.toString());
                    }
                } else if (category === "Museum") {
                    $scope.pois1 = response.data;
                    for (let i = 0; i < 5; i++) {
                        $scope.pois1[i].isSelected = needCheck && array.includes($scope.pois1[i].poiId.toString());
                    }
                } else if (category === "Tours") {
                    $scope.pois2 = response.data;
                    for (let i = 0; i < 5; i++) {
                        $scope.pois2[i].isSelected = needCheck && array.includes($scope.pois2[i].poiId.toString());
                    }
                } else if (category === "Nature and Parks") {
                    $scope.pois3 = response.data;
                    for (let i = 0; i < 5; i++) {
                        $scope.pois3[i].isSelected = needCheck && array.includes($scope.pois3[i].poiId.toString());
                    }
                }
                if($window.sessionStorage.getItem("num")!==null){
                    $scope.number=$window.sessionStorage.getItem("num");
                }
            });
        };

        $scope.rowClick = function (selected) {
            $scope.selectedpoi = selected;
        }

        $scope.selCat = function () {
            let needCheck = false;
            let array;
            if ($window.sessionStorage.getItem("favorites") !== null) {
                array = $window.sessionStorage.getItem("favorites").split(",");
                needCheck = true;
            }
            $scope.show1 = false;
            $scope.sho = false;
            if ($scope.cat === "Eatings") {
                $scope.es = false;
                $scope.ms = true;
                $scope.ts = true;
                $scope.ps = true;
                $scope.rs = false;
                for (let i = 0; i < 5; i++) {
                    $scope.pois[i].isSelected = needCheck && array.includes($scope.pois[i].poiId.toString());
                }
            } else if ($scope.cat === "Museum") {
                $scope.es = true;
                $scope.ms = false;
                $scope.ts = true;
                $scope.ps = true;
                $scope.rs = false;
                for (let i = 0; i < 5; i++) {
                    $scope.pois1[i].isSelected = needCheck && array.includes($scope.pois1[i].poiId.toString());
                }
            } else if ($scope.cat === "Tours") {
                $scope.ts = false;
                $scope.ms = true;
                $scope.es = true;
                $scope.ps = true;
                $scope.rs = false;
                for (let i = 0; i < 5; i++) {
                    $scope.pois2[i].isSelected = needCheck && array.includes($scope.pois2[i].poiId.toString());
                }
            } else if ($scope.cat === "Nature and Parks") {
                $scope.ps = false;
                $scope.ms = true;
                $scope.ts = true;
                $scope.es = true;
                $scope.rs = false;
                for (let i = 0; i < 5; i++) {
                    $scope.pois3[i].isSelected = needCheck && array.includes($scope.pois3[i].poiId.toString());
                }
            } else {
                $scope.es = false;
                $scope.ms = false;
                $scope.ts = false;
                $scope.ps = false;
                $scope.rs = false;
                for (let i = 0; i < 5; i++) {
                    $scope.pois[i].isSelected = needCheck && array.includes($scope.pois[i].poiId.toString());
                    $scope.pois1[i].isSelected = needCheck && array.includes($scope.pois1[i].poiId.toString());
                    $scope.pois2[i].isSelected = needCheck && array.includes($scope.pois2[i].poiId.toString());
                    $scope.pois3[i].isSelected = needCheck && array.includes($scope.pois3[i].poiId.toString());
                }
            }
        }

        $scope.byRank = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOIRnk',
            }
            $http(req).then(function (response) {
                let needCheck = false;
                let array;
                if ($window.sessionStorage.getItem("favorites") !== null) {
                    array = $window.sessionStorage.getItem("favorites").split(",");
                    needCheck = true;
                }
                $scope.pois4 = response.data;
                for (let i = 0; i < 20; i++) {
                    $scope.pois4[i].isSelected = needCheck && array.includes($scope.pois4[i].poiId.toString());
                }
                $scope.sho = false;
                $scope.show1 = false;
                $scope.rs = true;
                $scope.es = true;
                $scope.ms = true;
                $scope.ts = true;
                $scope.ps = true;

            });
        }

        $scope.toFavorites = function (selectedpoi) {
            let arr;
            let poiId = selectedpoi.poiId;
            if ($window.sessionStorage.getItem("favorites") !== null) {
                arr = $window.sessionStorage.getItem("favorites");
                // if (arr.indexOf(poiId) === -1) {
                if (arr === "") {
                    arr = poiId;
                } else {
                    arr = arr + "," + poiId;
                }
                selectedpoi.isSelected = true;
                $scope.number++;
                // } else {
                //     selectedpoi.isSelected = false;
                // }
            } else {
                arr = poiId;
                selectedpoi.isSelected = true;
                $scope.number = 1;
            }
            $window.sessionStorage.setItem("favorites", arr);
            $window.sessionStorage.setItem("num", $scope.number);
        }
        $scope.unFavorites = function (selectedpoi) {
            let arr;
            let poiId = selectedpoi.poiId;
            if ($window.sessionStorage.getItem("favorites") !== null) {
                arr = $window.sessionStorage.getItem("favorites");
                let x = arr.indexOf(poiId);
                let b = arr.substring(0, x - 1);
                let c = arr.substring(x + 1);
                if (x === 0) {
                    c = arr.substring(x + 2);
                }
                if (poiId > 9) {
                    c = arr.substring(x + 2);
                }
                arr = b + c;
                $scope.number--;
                selectedpoi.isSelected = false;
                $window.sessionStorage.setItem("favorites", arr);
                $window.sessionStorage.setItem("num", $scope.number);
            }
        }
    });