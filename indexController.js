angular.module("myApp")
    .controller("indexController", function ($scope, $window, $rootScope) {
        $rootScope.name = "Hello Guest";
        $scope.homes = "#!home";
        if ($window.sessionStorage.getItem("name") !== null) {
            console.log($window.sessionStorage.getItem("name"));
            $rootScope.name = "Hello " + $window.sessionStorage.getItem("name");
            $scope.homes = "#!homeRegistered";
            $rootScope.hide = true;
            $rootScope.show = true;
        }
        $scope.$on('userLogged', function (event, args) {
            $rootScope.name = "Hello " + args.username;
            $scope.homes = "#!homeRegistered";
            $rootScope.hide = true;
            $rootScope.show = true;
        });

        $rootScope.logout = function () {
            $rootScope.name = "Hello Guest";
            $scope.homes = "#!home";
            $rootScope.hide = false;
            $rootScope.show = false;
            $window.location.href = "#!home";
            $window.sessionStorage.clear();
        };
    });