let app = angular.module('myApp', ["ngRoute"]);

// config routes
app.config(function($routeProvider)  {
    $routeProvider
        // homepage
        .when('/', {
            templateUrl: 'pages/home/home.html',
            controller : 'homeController as homeCtrl'
        })
        // about
        .when('/about', {
            // this is a template url
            templateUrl: 'pages/about/about.html',
            controller : 'aboutController as abtCtrl'
        })
        // poi
        .when('/poi', {
            templateUrl: 'pages/poi/poi.html',
            controller : 'poiController as poiCtrl'
        })
        .when('/httpRequest', {
            templateUrl: 'pages/http/request.html',
            controller : 'httpController as httpCtrl'
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
        .when('/work', {
            templateUrl: 'pages/work/work.html',
            controller : 'workController as workCtrl'
        })
        .when('/work', {
            templateUrl: 'pages/work/work.html',
            controller : 'workController as workCtrl'
        })
        .when('/homeRegistered', {
            templateUrl: 'pages/homeRegistered/homeRegistered.html',
            controller : 'homeRegisteredController as homeRegisteredCtrl'
        })
        // other
        .otherwise({ redirectTo: '/' });
});