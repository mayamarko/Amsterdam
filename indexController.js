angular.module("myApp")
    .controller("indexController", function ($scope, $window,$rootScope) {
        $rootScope.name = "Hello Guest";
        if ($window.sessionStorage.getItem("name") !== null) {
            console.log($window.sessionStorage.getItem("name"));
            $rootScope.name = "Hello " + $window.sessionStorage.getItem("name");
            $rootScope.hide = true;
        }
        $scope.$on('userLogged', function (event, args) {
            $rootScope.name = "Hello " + args.username;
            $scope.homes = "#!homeRegistered";
            $rootScope.hide = true;
        });
    });