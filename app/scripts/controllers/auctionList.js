/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('auctionListCtrl', function ($scope, $http, $state, $cookies, dataService, toaster) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    var myDataPromise1 = dataService.getData();
    myDataPromise1.then(function(result) {
        //inside promise then
        console.log("I'm here");
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });
    var myDataPromise2 = dataService.getAuctions();
    myDataPromise2.then(function(result) {
        //inside promise then
        console.log(result.auctions);
        $scope.data.auctions = result.auctions;
    });
});
