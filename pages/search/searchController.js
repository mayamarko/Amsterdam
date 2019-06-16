angular.module("myApp")
    .controller("searchController", function ($scope, $http, $window, $q, views) {

        $scope.searchIt = function () { //for searching by name
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOIBN',
                params: {
                    name: $scope.search,
                }
            }
            $http(req).then(function (response) { //turning off the ng-show/hide
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
                        $scope.all.isSelected = ($scope.isSaved($scope.poid)) || (array.includes($scope.poid.toString()));
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
        $scope.getByCategory = function (category) { //first function that works - showing by category the poi && handles the favorites
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
                    $scope.defer = $q.defer();
                    $scope.defer.promise.then(function () {
                        for (let i = 0; i < 5; i++) {
                            $scope.pois[i].isSelected = ($scope.isSaved($scope.pois[i].poiId)) || (needCheck && array.includes($scope.pois[i].poiId.toString()));
                        }
                    });
                } else if (category === "Museum") {
                    $scope.pois1 = response.data;
                    $scope.defer1 = $q.defer();
                    $scope.defer1.promise.then(function () {
                        for (let i = 0; i < 5; i++) {
                            $scope.pois1[i].isSelected = ($scope.isSaved($scope.pois1[i].poiId)) || (needCheck && array.includes($scope.pois1[i].poiId.toString()));
                        }
                    });
                } else if (category === "Tours") {
                    $scope.pois2 = response.data;
                    $scope.defer2 = $q.defer();
                    $scope.defer2.promise.then(function () {
                        for (let i = 0; i < 5; i++) {
                            $scope.pois2[i].isSelected = ($scope.isSaved($scope.pois2[i].poiId)) || (needCheck && array.includes($scope.pois2[i].poiId.toString()));
                        }
                    });
                } else if (category === "Nature and Parks") {
                    $scope.pois3 = response.data;
                    $scope.defer3 = $q.defer();
                    $scope.defer3.promise.then(function () {
                        for (let i = 0; i < 5; i++) {
                            $scope.pois3[i].isSelected = ($scope.isSaved($scope.pois3[i].poiId)) || (needCheck && array.includes($scope.pois3[i].poiId.toString()));
                        }
                    });
                }
                if ($window.sessionStorage.getItem("num") !== null) {
                    $scope.number = $window.sessionStorage.getItem("num");
                }
            });
        };

        $scope.rowClick = function (selected) { //for modal function - to know which poi was clicked
            $scope.selectedpoi = selected;
            views.updateViews(selected);
        }

        $scope.selCat = function () { //for the selection by category. supporting back to all categories as well.
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
        };

        $scope.byRank = function () { //sorting the poi by rank ascending
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
                    $scope.pois4[i].isSelected = ($scope.isSaved($scope.pois4[i].poiId)) || (needCheck && array.includes($scope.pois4[i].poiId.toString()));
                }
                $scope.sho = false;
                $scope.show1 = false;
                $scope.rs = true;
                $scope.es = true;
                $scope.ms = true;
                $scope.ts = true;
                $scope.ps = true;

            });
        };

        //click hurt to save and double click to un save
        $scope.toFavorites = function (selectedpoi) {
            let arr;
            let arr2;
            let poiId = selectedpoi.poiId;
            if ($window.sessionStorage.getItem("favorites") !== null) {
                arr = $window.sessionStorage.getItem("favorites");
                arr2 = $window.sessionStorage.getItem("favoritesname");
                // if (arr.indexOf(poiId) === -1) {
                if (arr === "") {
                    arr = poiId;
                    arr2 = selectedpoi.poiname;
                } else {
                    arr = arr + "," + poiId;
                    arr2 = arr2 + "," + selectedpoi.poiname;
                }
                selectedpoi.isSelected = true;
                $scope.number++;
                // } else {
                //     selectedpoi.isSelected = false;
                // }
            } else {
                arr = poiId;
                arr2 = selectedpoi.poiname;
                selectedpoi.isSelected = true;
                $scope.number = 1;
            }
            $window.sessionStorage.setItem("favorites", arr);
            $window.sessionStorage.setItem("favoritesname", arr2);
            $window.sessionStorage.setItem("num", $scope.number);
        };
        $scope.unFavorites = function (selectedpoi) {
            let arr;
            let arr2;
            let poiId = selectedpoi.poiId;
            if ($window.sessionStorage.getItem("favorites") !== null) {
                arr = $window.sessionStorage.getItem("favorites");
                arr2 = $window.sessionStorage.getItem("favoritesname");
                arr2 = arr2.replace(selectedpoi.poiname + ",", "");
                arr2 = arr2.replace("," + selectedpoi.poiname, "");
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
                $window.sessionStorage.setItem("favoritesname", arr2);
                $window.sessionStorage.setItem("num", $scope.number);
            }
        };

        //getting from db all the pois of user that are saved
        //if it is a unregistered user, it won't do the GET.
        $scope.saved = function () {
            let token = 0;
            if ($window.sessionStorage.getItem("token") != null) {
                token = $window.sessionStorage.getItem("token");
            }
            if (token !== 0) {
                let req = {
                    method: 'GET',
                    url: 'http://localhost:3000/private/getAllPOIBu',
                    headers: {
                        'x-auth-token': token
                    }
                }
                $http(req).then(function (response) {
                    $scope.savedPoi = response.data;
                    console.log($scope.savedPoi);
                    if ($scope.defer != null) {
                        $scope.defer.resolve();
                    }
                    if ($scope.defer1 != null) {
                        $scope.defer1.resolve();
                    }
                    if ($scope.defer2 != null) {
                        $scope.defer2.resolve();
                    }
                    if ($scope.defer3 != null) {
                        $scope.defer3.resolve();
                    }
                });
            } else { //it is unregistered user
                $scope.savedPoi = [{poiId: 50}, {poiId: 50}, {poiId: 50}, {poiId: 50}];
            }
        };
        //checking if poi is saved
        $scope.isSaved = function (id) {
            let saved = $scope.savedPoi;
            for (let x = 0; x < saved.length; x++) {
                if (saved[x].poiId === id) {
                    return true;
                }
            }
            return false;
        }

    });