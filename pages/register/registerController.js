angular.module("myApp")
    .controller("registerController", function ($scope, $http, $window) {
        $scope.submit = function(){
            // $scope.answer = "Submitted! you entered: " + $scope.username
    let intrests="";
            if($scope.checkbox1){
                if(intrests=="")
                    intrests="Museum";
                else
                intrests=intrests+",Museum";
            }
        if($scope.checkbox2){
            if(intrests=="")
                intrests="Eatings";
            else
                intrests=intrests+",Eatings";
        }
            if($scope.checkbox3){
                if(intrests=="")
                    intrests="Tours";
                else
                    intrests=intrests+",Tours";
            }
            if($scope.checkbox4){
                if(intrests=="")
                    intrests="Nature and Parks";
                else
                    intrests=intrests+",Nature and Parks";
            }
            //let usernamep=$scope.username;
            let req = {
                method: 'POST',
                url: "http://localhost:3000/Register",
                data: {
                    username: $scope.username,
                    first_name: $scope.fname,
                    last_name: $scope.lname,
                    city: $scope.city,
                    country: $scope.country,
                    email: $scope.email,
                    interests: intrests,
                    quastion1: $scope.quastion1,
                    answer1: $scope.answer1,
                    quastion2: $scope.quastion2,
                    answer2: $scope.answer2,
                    password: $scope.password,

                //    username, first_name, last_name, city, country, email, intresets, quastion1, answer1, quastion2, answer2, password
                }
            }
            $http(req).then(function (response) {
                // $scope.myWelcome = response.data;
                 console.log(response.data);
                 $window.location.href="#!login";

            });
        };
    });