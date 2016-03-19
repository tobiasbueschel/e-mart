/**
 * MainCtrl - controller
 */

emart.controller('MainCtrl', function ($scope, $http, $state, $cookies, dataService, toaster, $timeout) {

    $scope.user = {};
    $scope.maindata = {};
    $scope.user.userID = $cookies.get('userID');
    $scope.user.userName = $cookies.get('userName');
    $scope.user.twUsername = $cookies.get('twUsername');
    $scope.user.twProfileImage = $cookies.get('twProfileImage');
    $scope.user.firstName = $cookies.get('firstName');
    $scope.user.lastName = $cookies.get('lastName');
    $scope.user.userType = $cookies.get('userType');
    $scope.user.dateRegistered = $cookies.get('dateRegistered') ? new Date($cookies.get('dateRegistered').replace(/-/g,"/")) : null;
    $scope.user.city = $cookies.get('city');

    var myDataPromise = dataService.getData();
    myDataPromise.then(function(result) {
        console.log("Result after running data service from main", result);
        //inside promise then
        $scope.maindata.categories = result.categories;
        $scope.maindata.conditions = result.conditions;
    });

    $scope.logout = function () {
        $timeout(function() {
            var cookies = $cookies.getAll();
            angular.forEach(cookies, function (v, k) {
                $cookies.remove(k);
            });
        });
        $state.go('login');
        toaster.pop({
            type: 'success',
            title: 'Success',
            body: 'Logout successful! See you soon :)',
            showCloseButton: false,
            timeout: 3000
        });
    };

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