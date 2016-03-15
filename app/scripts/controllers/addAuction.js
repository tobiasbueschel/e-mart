/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('addAuctionCtrl', function ($scope, $http, $state, $cookies, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    //get the items of the current user

    //Get categories and conditions data from dataService
    //Get categories and conditions data from dataService
    var sellerItemsPromise = dataService.getSellerItems($cookies.userID);
    sellerItemsPromise.then(function(result) {
            //inside promise then
            $scope.data.items = result.data;
    });

    console.log($scope.data.items);
    //get the item chosen
    $scope.data.addAuction = function () {
        console.log($scope.data.startdate, $scope.data.enddate);
        var request = $http({
            method: "post",
            url: "/scripts/php/addauction.php",
            data: {
                auctioneerid: $cookies.userID,
                itemid: $scope.data.item,
                auctionname: $scope.data.name,
                description: $scope.data.description,
                startingprice: $scope.data.startingprice,
                reserveprice: $scope.data.reserveprice,
                instantprice: $scope.data.instantprice,
                startdate: $scope.data.startdate,
                enddate: $scope.data.enddate

            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });

        // Successful HTTP post request or not
        request.success(function (data) {
            console.log("Response: ",data);
            if(data == 1){
                $scope.data.responseMessage = "ITEM ADDED SUCCESSFULLY!";
                //$state.go('main');
            }
            else {
                $scope.data.responseMessage = "Couldn't write to DB!";
            }
        });

    };


});

