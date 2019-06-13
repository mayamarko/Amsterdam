angular.module("myApp")
    .controller("indexController", function ($scope) {

        $scope.$on('userLogged', function (event, args) {
            $scope.name ="Hello "+ args.username
            $scope.hide=true;
        });
    });