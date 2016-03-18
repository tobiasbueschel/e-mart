/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('sellerDashboardCtrl', function ($scope, $http, $state, $cookies, toaster, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    //get cat and cond data here
    //Get categories and conditions data from dataService
    var myDataPromise = dataService.getData();
    myDataPromise.then(function(result) {
        //inside promise then
        $scope.$broadcast('fetchedCC');
    });

});

