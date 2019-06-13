angular.module("myApp")
    .controller("homeController", function ($scope, $http) {
        self = this;

        $http.get('http://localhost:3000/getAllPOIBN').then(function(response){
            $scope.myWelcome=response.data;


        });

    });


