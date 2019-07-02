angular.module("myApp")
    .controller("registerController", function ($scope, $http, $window) {
        $scope.submit = function () {
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
        //
        // $scope.validation = function (username, fname, lname, city, email, q1, q2, password) {
        //     if (!isValidUsername(username)) {
        //         return "The username must contains 3-8 letter only!"
        //     }
        //     if (!isValidPassword(password)) {
        //         return "Password must contains 5-10 characters"
        //     }
        //     if (!isEmail(email)) {
        //         return "Wrong email type"
        //     }
        //     if (!onlyString(fname)) {
        //         return "First name must be letter only"
        //     }
        //     if (!onlyString(lname)) {
        //         return "Last name must be letter only"
        //     }
        //     if (!onlyString(city)) {
        //         return "City must be letter only"
        //     }
        //     if (q1 === q2) {
        //         return "You must choose different Questions!"
        //     }
        // }
        //
        // function isValidUsername(username) {
        //     return /^[a-zA-Z]{3,8}$/.test(username);
        // }
        //
        // function onlyString(word) {
        //     return /^[a-zA-Z\s-]+$/.test(word)
        // }
        //
        // function isEmail(email) {
        //     return /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(email)
        // }
        //
        // function isValidPassword(username) {
        //     return /^[a-zA-Z0-9]{5,10}$/.test(username)
        // }

    });