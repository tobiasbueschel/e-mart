/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('addAuctionCtrl', function ($scope, $http, $state, $cookies, toaster, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    //Initial the start and end date fields
    var defaultAuctionLength = 7;
    $scope.data.today = new Date();
    $scope.data.startdate = $scope.data.today;
    $scope.data.futureDate = new Date();
    $scope.data.futureDate.setDate($scope.data.futureDate.getDate() + defaultAuctionLength);
    $scope.data.enddate =   $scope.data.futureDate;


    //Get items of the current users
    var sellerItemsPromise = dataService.getSellerItems($cookies.get('userID'));
    sellerItemsPromise.then(function(result) {
            //inside promise then
            $scope.data.items = result.data;
    });

    console.log($scope.data.items);
    //get the item chosen
    $scope.data.addAuction = function () {
        console.log($scope.data);
        console.log($scope.data.startdate, $scope.data.enddate);
        //Validation


        if ($scope.data.auctionForm.name.$valid &&
            $scope.data.auctionForm.description.$valid &&
            $scope.data.auctionForm.startdate.$valid &&
            $scope.data.auctionForm.enddate.$valid &&
            $scope.data.auctionForm.startprice.$valid &&
            $scope.data.auctionForm.reserveprice.$valid &&
            $scope.data.auctionForm.instantprice.$valid
        ) {

            console.log("hello", $scope.data.item);
            var request = $http({
                method: "post",
                url: "/scripts/php/addauction.php",
                data: {
                    auctioneerid: $cookies.get('userID'),
                    itemid: $scope.data.item,
                    auctionname: $scope.data.name,
                    description: $scope.data.description,
                    startingprice: $scope.data.startingprice,
                    reserveprice: $scope.data.reserveprice,
                    instantprice: $scope.data.instantprice,
                    startdate: $scope.data.startdate,
                    enddate: $scope.data.enddate

                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });

            // Successful HTTP post request or not
            request.success(function (data) {
                console.log("Response: ", data);
                if (data == 1) {
                    $scope.data.responseMessage = "ITEM ADDED SUCCESSFULLY!";
                    $state.go('seller.onsale');
                }
                else {
                    $scope.data.responseMessage = "Couldn't write to DB!";
                }
            });
        }
        else {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: 'Please fill out all fields before proceeding!',
                showCloseButton: false,
                timeout: 2000
            });

        }

        };



});

