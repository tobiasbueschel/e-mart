
emart.controller('profileCtrl', function ($scope, $http, $state, toaster, dataService) {
/************************************************************************
 * PROFILE CONTROLLER
 ************************************************************************/


    $scope.ratings = [{
        current: 4,
        total: 232,
        max: 5
    }];

    $scope.viewRating = false;
    $scope.viewOnSale = true;
    $scope.viewSold = false;


});
