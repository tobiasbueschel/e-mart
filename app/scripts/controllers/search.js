emart.controller('searchCtrl', function ($scope, $http, $stateParams, $state, toaster, searchService) {
    $scope.data = {};
    $scope.data.searchResults = [];
    $scope.data.srLength = $scope.data.searchResults.length;
    $scope.data.searchterm  = "";

    //On search bar change
    $scope.$on('navSearchChanged', function (event, args) {
        console.log("Caught...", args.newterm);
        $scope.data.searchterm = args.newterm;
        $scope.data.searchAuctions();
    });

    $scope.data.searchAuctions = function () {
        //Search request
        var searchRequest = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT auction.auctionID, auction.name, auction.description, auction.startingPrice, "+
                "bid.bidPrice, bid.auctionID, "+
                "IFNULL((select max(bid.bidPrice) from bid WHERE bid.auctionID=auction.auctionID), "+
                "auction.startingPrice) as auctionPrice "+
                "FROM auction,bid WHERE (name LIKE '%"+$scope.data.searchterm+"%' "+
                " OR description LIKE '%"+$scope.data.searchterm+"%') GROUP BY auction.auctionID"
            }
        });

        //Check promise
        searchRequest.success(function (data) {
            console.log("Response", data);
            if (data) {
                //Success
                $scope.data.searchResults = data;
                $scope.data.srLength = $scope.data.searchResults.length;
            }
        })
    }




});

