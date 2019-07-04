angular.module("myApp")
    .controller("registerController", function ($scope, $http, $window) {
        $scope.submit = function () { //submitting the form function
            let country = $scope.country;
            let q1 = $scope.question1;
            let q2 = $scope.question2;
            let intrests = "";
            var count = 0;
            let conti=true;
            if ($scope.checkbox1) {
                if (intrests === "")
                    intrests = "Museum";
                else
                    intrests = intrests + ",Museum";
                count++;
            }
            if ($scope.checkbox2) {
                if (intrests === "")
                    intrests = "Eatings";
                else
                    intrests = intrests + ",Eatings";
                count++;
            }
            if ($scope.checkbox3) {
                if (intrests === "")
                    intrests = "Tours";
                else
                    intrests = intrests + ",Tours";
                count++;
            }
            if ($scope.checkbox4) {
                if (intrests === "")
                    intrests = "Nature and Parks";
                else
                    intrests = intrests + ",Nature and Parks";
                count++;
            }
            if(q1===q2){
                $scope.err2=true;
                conti=false;
            }
             if (count < 2) {
                $scope.err = true;
                conti=false;
            }
            if(conti===true) {
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
                        question1: q1,
                        answer1: $scope.answer1,
                        question2: q2,
                        answer2: $scope.answer2,
                        password: $scope.password,
                    }
                }
                $http(req).then(function (response) {
                    // $scope.myWelcome = response.data;
                    console.log(response.data);
                    if (response.data === true) {
                        $window.location.href = "#!login";
                    }
                    else {
                        $window.alert("The username is taken. Please select another one")

                    }

                });
            }
        };

    });