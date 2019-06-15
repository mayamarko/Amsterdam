angular.module("myApp")
    .controller("indexController", function ($scope) {

        $scope.$on('userLogged', function (event, args) {
            $scope.name ="Hello "+ args.username;
            $scope.homes="#!homeRegistered";
            $scope.hide=true;
        });
    });