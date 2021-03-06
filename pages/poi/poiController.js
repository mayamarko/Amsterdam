angular.module("myApp")
    .controller("poiController", function ($scope, $http, $window, $q) {
        $scope.poiShow = [];
        $scope.poiCartMess = "";
        $scope.poiSavedMess = "";
        $scope.poiSaved = [];

        $scope.init = function () {    //the initiation function
            $scope.getAllReviews();
            $scope.poiCartMess.sho = true;
            $scope.poiSavedMess.sho = true;
            let stringArr = "";
            let arr = [];
            if ($window.sessionStorage.getItem("favoritesname") !== null && $window.sessionStorage.getItem("favoritesname") !== "") {
                $scope.poiShow.found = true;
                $scope.poiShow.notfound = false;
                stringArr = $window.sessionStorage.getItem("favoritesname");
                arr = stringArr.split(',');
                $scope.defer = $q.defer();
                $scope.getAll();
                $scope.defer.promise.then(function () {
                    let tmp = new Array();
                    for (i = 0; i < arr.length; i++) {
                        for (j = 0; j < $scope.pois.length; j++) {
                            if (arr[i] === $scope.pois[j].poiname) {
                                $scope.pois[j].favorites = false;
                                tmp.push($scope.pois[j]);
                            }
                        }
                    }
                    $scope.poiShow = tmp;
                    for (i = 0; i < $scope.poiShow.length; i++) {
                        if ($scope.reviews[$scope.poiShow[i].poiId] !== false) {
                            $scope.poiShow[i].reviews = $scope.reviews[$scope.poiShow[i].poiId];
                        }
                    }
                });
            } else {
                $scope.poiShow.found = false;
                $scope.poiShow.notfound = true;
            }
            $scope.showAll();
        };

        $scope.getAll = function () {   //return all the poi avaliable
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/getAllPOI',
            }
            $http(req).then(function (response) {
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


        $scope.addToDB = function (selected) { //add a poi from cart to the db
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
                if (response.data === false) {

                } else {
                    selected.favorites = true;
                    $scope.message = "Your POI is saved";
                    $scope.showMessage = true;
                    let tmp1 = new Array();
                    let tmpString = "";
                    let tmpNums = "";
                    let num = 0;
                    for (k = 0; k < $scope.poiShow.length; k++) {
                        if ($scope.poiShow[k].poiname !== selected.poiname) {
                            tmp1.push($scope.poiShow[k]);
                            num++;
                        } else {
                            $scope.poiShow[k].favorites = false;
                            $scope.poiSaved.push($scope.poiShow[k]);
                        }
                    }
                    $scope.poiShow = tmp1;
                    for (k = 0; k < $scope.poiShow.length; k++) {
                        if (k !== 0) {
                            tmpString = tmpString + "," + $scope.poiShow[k].poiname;
                            tmpNums = tmpNums + "," + $scope.poiShow[k].poiId;
                        } else {
                            tmpString = $scope.poiShow[k].poiname;
                            tmpNums = $scope.poiShow[k].poiId;

                        }
                    }
                    $window.sessionStorage.setItem("num", num);
                    $window.sessionStorage.setItem("favoritesname", tmpString);
                    $window.sessionStorage.setItem("favorites", tmpNums);
                    $scope.init();

                    $scope.defer5 = $q.defer();
                    $scope.getAll2();
                    $scope.defer5.promise.then(function (arr) {
                        for (k = 0; k < arr.length; k++) {
                            if (arr[k].poiId !== selected.poiId) {
                                $scope.incrementRank(arr[k].poiId, arr[k].cnt);
                            }
                        }
                    });


                }
            });
        }

        $scope.AddReview = function (selected) { //add opinion on poi- rank and review
            if ($scope.rank != null) {
                $scope.AddRank(selected);
            }
            if ($scope.review != null) {
                $scope.AddReviewDB(selected);
            }
            $scope.clearM();
        }

        $scope.AddRank = function (selected) {     //add rank on the poi
           // let rankAdd=(parseInt($scope.rank)-1)*(25);
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/saveRankPoi',
                data: {
                    poiId: parseInt(selected.poiId),
                    rank: parseInt($scope.rank)
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if (response.data === false) {

                } else {
                    alert("your rank is saved");
                }
            });
        }

        $scope.AddReviewDB = function (selected) {          //add revie on the poi
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
                if (response.data === false) {

                } else {


                }
            });
        }

        $scope.showAll = function () {              //get allpoi relevent to a specific user
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/private/getAllPOIBu',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            }
            $http(req).then(function (response) {
                // console.log(response.data);
                if (response.data === false) {
                    $scope.poiSaved.found = false;
                } else {

                    $scope.poiSaved = response.data;
                    $scope.poiSaved.found = true;
                    for (i = 0; i < $scope.poiSaved.length; i++) {
                        if ($scope.reviews[$scope.poiSaved[i].poiId] !== false) {
                            $scope.poiSaved[i].reviews = $scope.reviews[$scope.poiSaved[i].poiId];
                        }
                    }
                }
            });
        }

        $scope.deleteFromDB = function (selected) {             //deete poi from db
            let req = {
                method: 'DELETE',
                url: 'http://localhost:3000/private/deleteUserPoi',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                params: {
                    poiId: parseInt(selected.poiId)
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if (response.data === false) {

                } else {
                    let tmp1 = new Array();
                    let tmpString = "";
                    let tmpNums = "";
                    let num = 0;
                    for (k = 0; k < $scope.poiSaved.length; k++) {
                        if ($scope.poiSaved[k].poiname !== selected.poiname) {
                            tmp1.push($scope.poiSaved[k]);
                        }
                    }
                    $scope.poiSaved = tmp1;
                    $scope.showAll();
                }
            });
        }

        $scope.getByrank = function () {                //get all the pois orderd by rank
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/private/getAllPOIORnk',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if (response.data === false) {
                    $scope.poiSaved.found = false;
                } else {
                    let tmp = new Array();
                    for (k = response.data.length - 1; k >= 0; k--) {
                        tmp.push(response.data[k]);

                    }
                    $scope.poiSaved = tmp;
                    $scope.poiSaved.found = true;
                    for (i = 0; i < $scope.poiSaved.length; i++) {
                        if ($scope.reviews[$scope.poiSaved[i].poiId] !== false) {
                            $scope.poiSaved[i].reviews = $scope.reviews[$scope.poiSaved[i].poiId];
                        }
                    }
                }
            });
        }

        $scope.selectByCat = function () {              //select poi by category
            if ($scope.cat === "") {
                $scope.showAll();
            } else {
                let req = {
                    method: 'GET',
                    url: 'http://localhost:3000/private/getAllPOIOCat',
                    headers: {
                        'x-auth-token': $window.sessionStorage.getItem("token")
                    }
                }
                $http(req).then(function (response) {
                    console.log(response.data);
                    if (response.data === false) {
                        $scope.poiSaved.found = false;
                    } else {
                        let tmp = new Array();
                        for (k = 0; k < response.data.length; k++) {
                            if (response.data[k].category === $scope.cat) {
                                tmp.push(response.data[k]);
                            }
                        }
                        if (tmp.length === 0) {
                            $scope.poiSaved = tmp;
                            $scope.poiSaved.found = false;
                        } else {
                            $scope.poiSaved = tmp;
                            $scope.poiSaved.found = true;  for (i = 0; i < $scope.poiSaved.length; i++) {
                                if ($scope.reviews[$scope.poiSaved[i].poiId] !== false) {
                                    $scope.poiSaved[i].reviews = $scope.reviews[$scope.poiSaved[i].poiId];
                                }
                            }
                        }


                    }
                });
            }
        }
        $scope.getRank = function (poiId, num) {                //get  user index  of saved poi
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/private/getAllPOIBu',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if (response.data === false) {
                    // $scope.poiSaved.found = false;
                } else {
                    let tmp = -1;
                    let tmpid = null;
                    let max = 0;
                    let inMax = null;
                    let min = 6;
                    let inMin = null;
                    let bmax = false;
                    let bmin = false;
                    for (k = 0; k < response.data.length; k++) {
                        if (response.data[k].poiId === poiId) {
                            tmp = response.data[k].cnt;
                        }
                        if (response.data[k].cnt > max) {
                            max = response.data[k].cnt;
                            inMax = response.data[k].poiId;
                            bmax = true;
                        }
                        if (response.data[k].cnt < min) {
                            min = response.data[k].cnt;
                            inMin = response.data[k].poiId;
                            bmin = true;
                        }
                    }
                    for (k = 0; k < response.data.length; k++) {
                        if (bmax && response.data[k].cnt < max && response.data[k].cnt > tmp) {
                            max = response.data[k].cnt;
                            inMax = response.data[k].poiId;
                        }
                        if (bmin && response.data[k].cnt > min && response.data[k].cnt < tmp) {
                            min = response.data[k].cnt;
                            inMin = response.data[k].poiId;
                        }
                    }

                    if (num === 1) {
                        if (bmax) {
                            if (bmin) {
                                $scope.defer1.resolve([tmp, max, inMax, min, inMin]);
                            } else {
                                $scope.defer1.resolve([tmp, null, null, min, inMin]);
                            }
                        } else {
                            if (bmin) {
                                $scope.defer1.resolve([tmp, null, null, min, inMin]);
                            } else {
                                $scope.defer1.resolve([tmp, null, null, null, null]);
                            }
                        }
                    }
                    if (num === 2) {
                        if (bmax) {
                            if (bmin) {
                                $scope.defer2.resolve([tmp, max, inMax, min, inMin]);
                            } else {
                                $scope.defer2.resolve([tmp, null, null, min, inMin]);
                            }
                        } else {
                            if (bmin) {
                                $scope.defer2.resolve([tmp, null, null, min, inMin]);
                            } else {
                                $scope.defer2.resolve([tmp, null, null, null, null]);
                            }
                        }
                    }
                }
            });
        }
        $scope.rankUp = function (selected) {           // make index higher for a saved poi

            $scope.defer1 = $q.defer();
            $scope.getRank(selected.poiId, 1);
            $scope.defer1.promise.then(function (ind) {
                if (ind[0] !== -1 && ind[1] !== null && ind[2] !== null && ind[0] !== ind[1]) {
                    let cnt = ind[1];
                    let cnt2 = ind[0];
                    $scope.editRank(selected.poiId, cnt);
                    $scope.editRank(ind[2], cnt2);
                }
            });
        }

        $scope.rankDown = function (selected) {             //make index lower for saved poi
            $scope.defer2 = $q.defer();
            $scope.getRank(selected.poiId, 2);
            $scope.defer2.promise.then(function (ind) {
                if (ind[0] !== -1 && ind[3] !== null && ind[4] !== null && ind[0] !== ind[3]) {
                    let cnt = ind[3];
                    let cnt2 = ind[0];
                    $scope.editRank(selected.poiId, cnt);
                    $scope.editRank(ind[4], cnt2);
                }
            });
        }

        $scope.editRank = function (poiId, ind) {           //edit index of a user saved poi
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/private/editRank',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data: {
                    poiId: poiId,
                    indexPoi: parseInt(ind)
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if (response.data === false) {
                    // $scope.poiSaved.found = false;
                } else {
                    let tmp = new Array();
                    tmp = $scope.showAll();
                    $scope.poiSaved = tmp;
                }
            });
        }


        $scope.getAll2 = function () {
            let req = {
                method: 'GET',
                url: 'http://localhost:3000/private/getAllPOIBu',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                }
            }
            $http(req).then(function (response) {
                if (response.data === false) {

                } else {
                    $scope.defer5.resolve(response.data);
                }
            });
        }

        $scope.incrementRank = function (poiId, ind) {              //increments all saved user index by 1
            let req = {
                method: 'POST',
                url: 'http://localhost:3000/private/editRank',
                headers: {
                    'x-auth-token': $window.sessionStorage.getItem("token")
                },
                data: {
                    poiId: poiId,
                    indexPoi: parseInt(ind) + 1
                }
            }
            $http(req).then(function (response) {
                console.log(response.data);
                if (response.data === false) {
                    // $scope.poiSaved.found = false;
                } else {

                }
            });
        }

        $scope.clearM = function () {               //clear the modal
         $scope.rank="";
         $scope.review="";

        }
        $scope.orderClick = function () { //for modal function - to know which poi was clicked
            $scope.orderpoi = true;
        }
        $scope.applayClick = function () { //for modal function - to know which poi was clicked
            $scope.orderpoi = false;
        }

        $scope.getAllReviews = function () {                    //gett all reviews on poi
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
