angular.module("myApp")
    .controller("registerController", function ($scope, $http, $window) {
        $scope.submit = function () {
            let country = $scope.country;
            let q1 = $scope.question1;
            let q2 = $scope.question2;
            let intrests = "";
            if ($scope.checkbox1) {
                if (intrests === "")
                    intrests = "Museum";
                else
                    intrests = intrests + ",Museum";
            }
            if ($scope.checkbox2) {
                if (intrests === "")
                    intrests = "Eatings";
                else
                    intrests = intrests + ",Eatings";
            }
            if ($scope.checkbox3) {
                if (intrests === "")
                    intrests = "Tours";
                else
                    intrests = intrests + ",Tours";
            }
            if ($scope.checkbox4) {
                if (intrests === "")
                    intrests = "Nature and Parks";
                else
                    intrests = intrests + ",Nature and Parks";
            }

            let req = {
                method: 'POST',
                url: "http://localhost:3000/Register",
                data: {
                    username: $scope.username,
                    first_name: $scope.fname,
                    last_name: $scope.lname,
                    city: $scope.city,
                    country: country,
                    email: $scope.email,
                    interests: intrests,
                    quastion1: q1,
                    answer1: $scope.answer1,
                    quastion2: q2,
                    answer2: $scope.answer2,
                    password: $scope.password,
                }
            }
            $http(req).then(function (response) {
                // $scope.myWelcome = response.data;
                console.log(response.data);
                $window.location.href = "#!login";

            });
        };
    });