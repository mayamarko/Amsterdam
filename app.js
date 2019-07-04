let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
        })
        //abouy
        .when('/about', {
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as aboutCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        //login
        .when('/login', {
            templateUrl: 'pages/login/login.html',
            controller : 'loginController as loginCtrl'
        })
        //register
        .when('/register', {
            templateUrl: 'pages/register/register.html',
            controller : 'registerController as registerCtrl'
        })
        .when('/restore', {
            templateUrl: 'pages/restore/restore.html',
            controller : 'restoreController as restoreCtrl'
        })
        .when('/home', {
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
        })
        .when('/search', {
            templateUrl: 'pages/search/search.html',
            controller : 'searchController as searchCtrl'
        })
        .when('/homeRegistered', {
            templateUrl: 'pages/homeRegistered/homeRegistered.html',
            controller : 'homeRegisteredController as homeRegisteredCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});

app.service('views', function($http) {
    this.updateViews = function (poi) {
        let req = {
            method: 'POST',
            url: "http://localhost:3000/editViews",
            data: {
                poiId: poi.poiId,
            }
        }
        $http(req).then(function (response) {
            console.log(response.data);
        });
    }
});