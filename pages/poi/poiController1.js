// poi controller
angular.module("myApp")
.controller("poiController", function ($scope,$http,$window) {
    self = this;
    self.pois=[];

    $scope.ab = function () {
        let stringArr="abc,def";
        let arr=stringArr.split(',');
           $scope.name=arr[i];
           $scope.name2=arr[i];

    }





    // stringArr = "Sumo,Rijksmuseum,Vondelpark";
    // arr=stringArr.split(',');
    // for(i=0;i<arr.length;i++) {
    //     let req = {
    //         method: 'GET',
    //         url: 'http://localhost:3000/private/getAllPOIBN',
    //         //
    //         params: {
    //             name: arr[i],
    //         }
    //     }
    //     let b=9;
    //     $http(req).then(function (response) {
    //         let a=8;
    //         if (response.data === false) {
    //
    //         } else {
    //             pois.push({name:response.data[0].poiname,rnk:response.data[0].rnk, category:response.data[0].category,desc:response.data[0].descr,view: response.data[0].viw,img: response.data[0].picture});
    //
    //         }
    //     });
    // }
    // self.cities = {
    //     1: {name:"Paris", state: "France", image: "https://media-cdn.tripadvisor.com/media/photo-s/0d/f5/7c/f2/eiffel-tower-priority.jpg"},
    //     2: {name:"Jerusalem", state: "Israel", image: "https://cdni.rt.com/files/2017.12/article/5a3fe04efc7e93cd698b4567.jpg"},
    //     3: {name:"London", state: "England", image: "http://www.ukguide.co.il/Photos/England/London/British-Royal-Tour.jpg"}
    // }

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

    $scope.showFav = function ($scope,$http,$window) {
        let stringArr="";
        let arr;
        if ($window.sessionStorage.getItem("favoritesname") !== null) {
            stringArr = $window.sessionStorage.getItem("favoritesname");
            stringArr = "Sumo,Rijksmuseum,Vondelpark";
            if (stringArr !== "") {
                arr=stringArr.split(',');
                for(i=0;i<arr.length;i++){
                    let req = {
                        method: 'GET',
                        url: 'http://localhost:3000/private/getAllPOIBN',
                        headers: {
                            'x-auth-token': $window.sessionStorage.getItem("token")
                        },
                        params: {
                            name: arr[i],
                        }
                    }
                    $http(req).then(function (response) {
                        if (response.data === false) {

                        } else {
                            pois.push({name:response.data[0].poiname,rnk:response.data[0].rnk, category:response.data[0].category,desc:response.data[0].descr,view: response.data[0].viw,img: response.data[0].picture});

                            // $scope.poiname = response.data[0].poiname;
                            // $scope.rnk = response.data[0].rnk;
                            // $scope.category = response.data[0].category;
                            // $scope.desc = response.data[0].descr;
                            // $scope.view = response.data[0].viw;
                            // $scope.src = response.data[0].picture;

                        }
                    });
                }


            }
        }
    }
});