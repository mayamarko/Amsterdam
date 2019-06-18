angular.module("myApp")
    .controller("poiController", function ($scope, $http, $window, $q) {
        $scope.poiShow = [];
        $scope.init = function () {
            let stringArr = "";
            let arr=[];
            if ($window.sessionStorage.getItem("favoritesname") !== null) {
                stringArr = $window.sessionStorage.getItem("favoritesname");
                arr = stringArr.split(',');
                $scope.defer = $q.defer();
                $scope.getAll();
                $scope.defer.promise.then(function () {
                    let tmp = new Array();
                    for (i = 0; i < arr.length; i++) {
                        for (j = 0; j < $scope.pois.length; j++) {
                            if (arr[i] === $scope.pois[j].poiname) {
                                $scope.pois[j].favorites=false;
                                tmp.push($scope.pois[j]);

                            }
                        }
                    }
                    $scope.poiShow = tmp;
                });
            }
            else {
                alert("you dont have saved items");
            }


        };
        $scope.getAll = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOI',
                // params: {
                //     name: nameToSend,
                // }
            }
            $http(req).then(function (response) { //turning off the ng-show/hide
                if (response.data === false) {
                    console.log("big problem");
                } else {

                    $scope.pois = response.data;
                    $scope.defer.resolve();


                }
            });

        }
        $scope.rowClick = function (selected) { //for modal function - to know which poi was clicked
            $scope.selectedpoi = selected;
        }


        $scope.addToDB = function (selected) { //for modal function - to know which poi was clicked
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/private/addUserPoi',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data: {
                    poiId: selected.poiId,
                    cnt: 1
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if(response.data===false){

                }
                else {
                    selected.favorites=true;
                    $scope.message="Your POI is saved";
                    $scope.showMessage=true;
                    let tmp1=new Array();
                    let tmpString="";
                    for(k=0;k<$scope.poiShow.length;k++){
                        if($scope.poiShow[k].poiname!==selected.poiname){
                            tmp1.push($scope.poiShow[k])
                        }
                    }
                    $scope.poiShow=tmp1;
                    for(k=0;k<$scope.poiShow.length;k++){
                       if(k!=0){
                           tmpString=tmpString+","+$scope.poiShow[k].poiname;
                       }else {
                           tmpString=$scope.poiShow[k].poiname;
                       }
                    }
                    $window.sessionStorage.setItem("num",$scope.nember-1);

                }

            });
        }

        $scope.AddReview=function(selected){
            if($scope.rank!=null){
                $scope.AddRank(selected);
            }
            if($scope.review!=null){
                $scope.AddReviewDB(selected);
            }
        }

        $scope.AddRank=function (selected) {
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/saveRankPoi',
                data: {
                    poiId: selected.poiId,
                    cnt: $scope.rank
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if(response.data===false){

                }
                else {
          alert("your rank is saved");

                }

            });

        }

        $scope.AddReviewDB=function (selected) {
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/saveReviewPoi',
                data: {
                    poiId: selected.poiId,
                    review: $scope.review
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if(response.data===false){

                }
                else {
                    alert("your rank is saved");
                }

            });

        }

    });


// angular.module("myApp")
//     .controller("poiController", function ($scope, $http, $window, $q) {
//         let poi = [];
//         let poiToPrint = [];
//         var promises = [];
//         $scope.ab = function () {
//             let stringArr = "Sumo,Vapiano,Vapiano";
//             let arr = stringArr.split(',');
//
//             let tmpPoi = "";
//             // $scope.name=arr[0];
//             // $scope.name2=arr[1];
//
//             for (i = 0; i < arr.length; i++) {
//                 //$scope.defer = $q.defer();
//                 $scope.defer = $q.defer();
//                 promises.push($scope.defer);
//                 $scope.cd(arr[i], i);
//                 $scope.defer.promise.then(function () {
//                     // pois.push({name:response.data[0].poiname,rnk:response.data[0].rnk, category:response.data[0].category,desc:response.data[0].descr,view: response.data[0].viw,img: response.data[0].picture});
//                     // $q.all([promises]).then(function (result) {
//                     //     for (j = 0; j < poi.length; j += 6) {
//                     //         console.log("1 finished num " + i);
//                     //         poiToPrint.push({
//                     //             name: poi[j + 0],
//                     //             rnk: poi[j + 1],
//                     //             category: poi[j + 2],
//                     //             desc: poi[j + 3],
//                     //             view: poi[j + 4],
//                     //             img: poi[j + 5]
//                     //         });
//                     //     }
//                          console.log("2 finished num " + i);
//                     // });
//
//                     // poi = [];
//
//                 });
//             }
//
//
//             // for(i=0;i<arr.length;i++){
//             //
//             // }
//         }
//         $scope.cd = function (nameToSend, i) {
//             let req = {
//                 method: 'GET',
//                 url: 'http://localhost:3000/getAllPOIBN',
//                 params: {
//                     name: nameToSend,
//                 }
//             }
//             $http(req).then(function (response) { //turning off the ng-show/hide
//                 if (response.data === false) {
//                     console.log("big problem");
//                 } else {
//
//                     // poi.push(response.data[0].poiname);
//                     // poi.push(response.data[0].rnk);
//                     // poi.push(response.data[0].category);
//                     // poi.push(response.data[0].descr);
//                     // poi.push(response.data[0].viw);
//                     // poi.push(response.data[0].picture);
//                     poi.push(response.data[0])
//                     console.log("other func: " + i);
//                     $scope.defer.resolve();
//
//                     // if(i==0){
//                     //
//                     //     $scope.name1 = response.data[0].poiname;
//                     //     $scope.name2 = response.data[0].poiId;
//                     // }
//                     // else{
//                     //     $scope.name3 = response.data[0].poiname;
//                     //     $scope.name4 = response.data[0].poiId;
//                     // }
//                 }
//             });
//
//         }
//
//     });