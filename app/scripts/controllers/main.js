/**
 * MainCtrl - controller
 */

emart.controller('MainCtrl', function ($scope, $http, $state) {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    $scope.user = {};

    $scope.user.userName = $cookies.userName;
    $scope.user.twProfileImage = $cookies.twProfileImage;
    $scope.user.firstName = $cookies.firstName;
    $scope.user.lastName = $cookies.lastName;
    $scope.user.userType = $cookies.userType;
    $scope.user.city = $cookies.city;
    $scope.user.dateRegistered = $cookies.dateRegistered ? new Date($cookies.dateRegistered.replace(/-/g,"/")) : null;

    (function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/auctionCtrl.php",
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            console.log(response);
            if (response !== 0) { //if no error when fetching database rows
                console.log(response);
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();

});