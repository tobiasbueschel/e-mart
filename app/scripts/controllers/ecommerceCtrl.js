/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('ecommerceCtrl', function ($scope, $http, $state, $cookies, dataService, toaster) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    $scope.data.categoryid = $stateParams.categoryid;

    //Set default values
    var reqItem = $http({
        method: "post",
        url: "/scripts/php/selectRowsGeneric.php",
        data: {
            table: 'item',
            where: 'WHERE categoryID='+$scope.data.categoryid
        },
        headers: { 'Content-Type': 'application/json' }
    });

    reqItem.success(function (data) {
        if (data) {
            console.log("Items returned", data);
            var currentItem = $scope.data.category = $scope.data.condition = data[0];
            $scope.data.name = currentItem.name;
            $scope.data.description = currentItem.description;
            //$scope.data.imageStrings = ;
        }
    });

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
