emart.controller('auctionListCtrl', function ($scope, $http, $state, $stateParams, $cookies, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    console.log($stateParams);
    $scope.data.categoryID = $stateParams.categoryid;


    var myDataPromise1 = dataService.getData();
    myDataPromise1.then(function(result) {
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });

    (function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT auction.auctionID, item.itemID, auction.name, auction.description, auction.instantPrice, "+
                "auction.isActive, auction.endDate, auction.currentBidID, bid.bidID, bid.bidderID, image.imageID, "+
                "image.image, image.itemID, "+
                "IFNULL((select max(bid.bidPrice) from bid WHERE bid.auctionID=auction.auctionID),auction.startingPrice) "+
                "as auctionPrice "+
                "FROM auction,item,bid,image "+
                "WHERE auction.itemID = item.itemID AND item.categoryID="+$scope.data.categoryID+" AND auction.isActive=1 "+
                "AND image.itemID=auction.itemID "+
                "GROUP BY auction.auctionID;"
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            console.log(response);
            if (response !== 0) { //if no error when fetching database rows
                console.log("Categories req reponse: ", response.data);
                $scope.data.auctions = response.data;
                console.log($scope.data.auctions);
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();

    $scope.data.addBookmark = function (auctionID) {
        return request = $http({
            method: "post",
            url: "/scripts/php/bookmark.php",
            data: {
                auctionID: auctionID,
                userID: $cookies.get('userID')
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            console.log(response);
            if (response !== 0) { //if no error when fetching database rows
                console.log(response);
                alert("Bookmark is added!")
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }

        })
    }


});
