/**
 * MainCtrl - controller
 */

emart.controller('MainCtrl', function ($scope, $http, $state, $cookies) {

    this.userName = 'Example user';
    this.helloText = 'Welcome in SeedProject';
    this.descriptionText = 'It is an application skeleton for a typical AngularJS web app. You can use it to quickly bootstrap your angular webapp projects and dev environment for these projects.';

    $scope.user = {};

    $scope.user.userName = $cookies.userName;
    $scope.user.twProfileImage = $cookies.twProfileImage;


});