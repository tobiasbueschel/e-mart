/************************************************************************
 * ECOMMERCE CONTROLLER
 * Manages login(), registerUser(), forgotPassword() function.
 ************************************************************************/

emart.controller('productDetailsCtrl', function ($scope, $http, $state, $stateParams) {

    // checks if auction ID is set and then gets the auction data
    if ($stateParams.auctionid != null){
        $scope.data.auctionid = $stateParams.auctionid;

        console.log("this auction is called");
        console.log($stateParams);

        var reqItem2 = $http({
            method: "post",
            url: "/scripts/php/selectRowsGeneric.php",
            data: {
                table: 'auction',
                where: 'WHERE auctionID='+$stateParams.auctionid
            },
            headers: { 'Content-Type': 'application/json' }
        });
        reqItem2.success(function (data) {
            if (data) {
                $scope.auction = data[0];
            }
        });
    }

    // checks if item ID is set and then gets the item data
    if ($stateParams.itemid != null){
        $scope.data.itemid = $stateParams.itemid;

        var reqItem3 = $http({
            method: "post",
            url: "/scripts/php/selectRowsGeneric.php",
            data: {
                table: 'item',
                where: 'WHERE itemID='+$stateParams.itemid
            },
            headers: { 'Content-Type': 'application/json' }
        });
        reqItem3.success(function (data) {
            if (data) {
                $scope.item = data[0];
            }
        });
    }

});
