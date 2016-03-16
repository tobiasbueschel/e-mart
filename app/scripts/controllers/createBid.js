emart.controller('createBidCtrl', function ($scope, $http,$stateParams, $state, toaster) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    $scope.data.createBid = function () {
        console.log("I'm here!");
        var request = $http({
            method: "post",
            url: "/scripts/php/createBidCtrl.php",
            data: {
                bidPrice: $scope.data.bidPrice,
                auctionID: $stateParams.id
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function (data) {
            console.log("bidPrice"+data.bidPrice);
            $state.go('main');
            if(data.bidPrice >100){
                toaster.pop({
                    type: 'success',
                    title: 'Sueccess',
                    body: 'BID ADDED SUCCESSFULLY!',
                    showCloseButton: false,
                    timeout: 2500
                });
            }
            else {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Your bid is lower than current bid :(',
                    showCloseButton: false,
                    timeout: 2500
                });
            }

        });
    };

});