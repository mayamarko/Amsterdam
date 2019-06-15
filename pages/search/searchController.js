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
                if (response.data === false) {
                    $scope.error = "There is no point of interest with that name."
                    $scope.sho = true;
                    $scope.show = false;
                    $scope.es = true;
                    $scope.ms = true;
                    $scope.ts = true;
                    $scope.ps = true;
                    $scope.rs = false;
                } else {
                    $scope.poiname = response.data[0].poiname;
                    $scope.rnk = response.data[0].rnk;
                    $scope.category = response.data[0].category;
                    $scope.desc = response.data[0].descr;
                    $scope.view = response.data[0].viw;
                    $scope.src = response.data[0].picture;
                    $scope.rs = false;
                    $scope.es = true;
                    $scope.ms = true;
                    $scope.ts = true;
                    $scope.ps = true;
                    $scope.show = true;
                    $scope.sho = false;
                }
                if(sort.checked){
                    sort.click();
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
                if (category === "Eatings") {
                    $scope.pois = response.data;
                } else if (category === "Museum") {
                    $scope.pois1 = response.data;
                } else if (category === "Tours") {
                    $scope.pois2 = response.data;
                } else if (category === "Nature and Parks") {
                    $scope.pois3 = response.data;
                }
            });
        };

        $scope.rowClick = function (selected) {
            $scope.selectedpoi = selected;
        }

        $scope.selCat = function () {
            $scope.show = false;
            $scope.sho = false;
            if(sort.checked){
                sort.click();
            }
            if ($scope.cat === "Eatings") {
                $scope.es = false;
                $scope.ms = true;
                $scope.ts = true;
                $scope.ps = true;
                $scope.rs = false;
            } else if ($scope.cat === "Museum") {
                $scope.es = true;
                $scope.ms = false;
                $scope.ts = true;
                $scope.ps = true;
                $scope.rs = false;
            } else if ($scope.cat === "Tours") {
                $scope.ts = false;
                $scope.ms = true;
                $scope.es = true;
                $scope.ps = true;
                $scope.rs = false;
            } else if ($scope.cat === "Nature and Parks") {
                $scope.ps = false;
                $scope.ms = true;
                $scope.ts = true;
                $scope.es = true;
                $scope.rs = false;
            } else {
                $scope.es = false;
                $scope.ms = false;
                $scope.ts = false;
                $scope.ps = false;
                $scope.rs = false;
            }
        }

        $scope.byRank = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOIRnk',
            }
            $http(req).then(function (response) {
                $scope.pois4 = response.data;
                if(sort.checked) {
                    $scope.rs = true;
                    $scope.es = true;
                    $scope.ms = true;
                    $scope.ts = true;
                    $scope.ps = true;
                }else{
                    $scope.rs = false;
                    $scope.es = false;
                    $scope.ms = false;
                    $scope.ts = false;
                    $scope.ps = false;
                }
            });
        }
    });