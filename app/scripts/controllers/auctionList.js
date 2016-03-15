/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('auctionListCtrl', function ($scope, $http, $state, $cookies, dataService, toaster) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    $scope.data.getAuction = function () {
        console.log("I'm here!");
        var request = $http({
            method: "GET",
            url: "/scripts/php/auctionList.php",
            data: {
                auctionID: $cookies.userID,
                currentBidID: $scope.data.item,
                name: $scope.data.name,
                description: $scope.data.description,
                instantPrice: $scope.data.instantPrice,
                reservePrice: $scope.data.reservePrice,
                isActive: $scope.data.reservePrice,
                endDate: $scope.data.endDate
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        }).then(function (data) {
            console.log("Response: ",data.auctionID);

        });
    }
});
