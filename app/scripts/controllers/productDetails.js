/************************************************************************
 * ECOMMERCE CONTROLLER
 * Manages login(), registerUser(), forgotPassword() function.
 ************************************************************************/

emart.controller('productDetailsCtrl', function ($scope, $http, $window, $state, $stateParams, $cookies, toaster, dataService) {

    // checks if auction ID is set and then gets the auction data
    if ($stateParams.auctionid != null){
        $scope.data.auctionid = $stateParams.auctionid;

        console.log("this auction is called");
        console.log($stateParams);

        //Get the details for the auction

        var getAuctionDetails = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql:"SELECT auction.auctionID, item.itemID, auction.name, auction.description, auction.instantPrice, "+
        "auction.isActive, auction.endDate, auction.currentBidID, bid.bidID, bid.bidderID, image.imageID, "+
        "image.image, image.itemID, user.userID, user.firstName, user.userName, user.emailAddress, "+
        "IFNULL((select max(bid.bidPrice) from bid WHERE bid.auctionID=auction.auctionID),auction.startingPrice) "+
        "as auctionPrice "+
        "FROM auction,item,bid,image,user "+
        "WHERE auction.auctionID="+$stateParams.auctionid+" AND auction.itemID = item.itemID "+
                "AND image.itemID=auction.itemID AND auction.auctioneerID=user.userID "+
        "GROUP BY auction.auctionID;"
            },
            headers: { 'Content-Type': 'application/json' }
        });
        getAuctionDetails.success(function (data) {
            if (data) {
                $scope.auction = data[0];
            }
        });

        //Check if the item is being watched already
        var checkIfWatched = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql:"SELECT * FROM bookmark WHERE auctionID="+$scope.data.auctionid+" AND userID="+$cookies.get('userID')
            },
            headers: { 'Content-Type': 'application/json' }
        });

        checkIfWatched.success(function (data) {
            console.log("response to check if watched request",data);
            if (data.length>0) {
                $scope.data.watched = true;
                $scope.data.watchButtonColor = "primary";
                $scope.data.watchAction = "Watching";
            }
            else {
                $scope.data.watched = false;
                $scope.data.watchButtonColor = "white"
                $scope.data.watchAction = "Watch Auction";

            }
        });

    }

    $scope.data.addBookmark = function (auctionID) {
        dataService.addBookmark(auctionID).then(function (data) {
            console.log(data);

        });
    }

    $scope.data.goToURL = function (email, subject) {
        $window.open("mailto:"+email+"?Subject="+subject, "_blank");
    }


});
