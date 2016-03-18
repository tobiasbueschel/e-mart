/**
 * MainCtrl - controller
 */

emart.controller('MainCtrl', function ($scope, $http, $state, $cookies, dataService) {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    $scope.user = {};
    $scope.data = {};

    $scope.user.userName = $cookies.userName;
    $scope.user.twProfileImage = $cookies.twProfileImage;
    $scope.user.firstName = $cookies.firstName;
    $scope.user.lastName = $cookies.lastName;
    $scope.user.userType = $cookies.userType;
    $scope.user.city = $cookies.city;
    $scope.user.dateRegistered = $cookies.dateRegistered ? new Date($cookies.dateRegistered.replace(/-/g,"/")) : null;


    //Get categories and conditions data from dataService
    var myDataPromise = dataService.getData();
    myDataPromise.then(function(result) {
        //inside promise then
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });

});