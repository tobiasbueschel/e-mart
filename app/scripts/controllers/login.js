emart.controller('loginCtrl', function ($scope, $http, $state) {

    $scope.login = function () {

        var request = $http({
            method: "post",
            url: "/scripts/php/login.php",
            data: {
                email: $scope.email,
                password: $scope.password
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function (data) {
            if(data == true){
                $state.go('main');
            }
            else {
                $scope.responseMessage = "Username or Password is incorrect";
            }
        });
    };

    // All data will be store in this object
    $scope.register = {};

    // After process wizard
    $scope.processForm = function() {
        alert('Wizard completed');
    };

    $scope.registerUser = function () {

        console.log("working");

        var request = $http({
            method: "post",
            url: "/scripts/php/register.php",
            data: {
                register: $scope.register
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function (data) {
            if(data == true){
                $state.go('main');
            }
            else {
                $scope.responseMessage = "Registering user was not successful";
            }
        });
    };

    $scope.forgotPassword = function () {

        console.log("working");

        var request = $http({
            method: "post",
            url: "/scripts/php/forgotPassword.php",
            data: {
                email: $scope.email
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function (data) {
            if(data == true){
                $state.go('login');
            }
            else {
                $scope.responseMessage = "We don't recognize this email. Please try again";
            }
        });
    }

});
