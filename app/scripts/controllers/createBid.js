emart.controller('createBidCtrl', function ($scope, $http,$stateParams) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    console.log("I'm here!");
    $scope.data.createBid = function () {
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
            console.log("Response: ",data);
            if(data == 1){
                $scope.data.responseMessage = "Bid ADDED SUCCESSFULLY!";
                //$state.go('main');
            }
            else {
                $scope.data.responseMessage = "Coudln't write to DB!";
            }
        });
    };

});