/**
 * MainCtrl - controller
 */
function MainCtrl($scope, $http) {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

};


angular
    .module('emart')
    .controller('MainCtrl', MainCtrl)

    .controller('loginCtrl', function ($scope, $http, $state) {

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
                if(data == "1"){
                    $state.go('main');
                }
                else {
                    $scope.responseMessage = "Username or Password is incorrect";
                }
            });
        }
    });