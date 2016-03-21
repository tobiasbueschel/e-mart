emart.controller('auctionListCtrl', function ($scope, $http, $state, $stateParams, $cookies, toaster, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.categoryID = $stateParams.categoryid;


    var myDataPromise1 = dataService.getData();
    myDataPromise1.then(function(result) {
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });

    //GET AUCTIONS FOR SPECIFIC CATEGORY
    (function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT auction.auctionID, item.itemID, auction.name, auction.description, auction.instantPrice, "+
                "auction.isActive, auction.endDate, auction.currentBidID, bid.bidID, bid.bidderID, image.imageID, "+
                "image.image, image.itemID, item.categoryID, item.conditionID, "+
                "IFNULL((select max(bid.bidPrice) from bid WHERE bid.auctionID=auction.auctionID), auction.startingPrice) "+
                "as auctionPrice "+
                "FROM auction,item,bid,image "+
                "WHERE auction.startDate < now() AND auction.endDate > now() AND auction.itemID = item.itemID AND item.categoryID="+$scope.data.categoryID+" AND auction.isActive=1 "+
                "AND image.itemID=auction.itemID "+
                "GROUP BY auction.auctionID;"
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            if (response !== 0) { //if no error when fetching database rows
                //console.log("AUCTIONS FOR THIS CATEGORY ", response.data);
                $scope.data.auctions = response.data;
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();

    //GET AUCTIONS ENDING SOON
    (function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT auction.auctionID, item.itemID, auction.name, auction.description, auction.instantPrice, "+
                "auction.isActive, auction.endDate, auction.currentBidID, bid.bidID, bid.bidderID, image.imageID, "+
                "image.image, image.itemID, item.categoryID, item.conditionID, "+
                "IFNULL((select max(bid.bidPrice) from bid WHERE bid.auctionID=auction.auctionID),auction.startingPrice) "+
                "as auctionPrice "+
                "FROM auction,item,bid,image "+
                "WHERE auction.startDate < now() AND auction.endDate > now() AND auction.itemID = item.itemID AND auction.isActive=1 "+
                "AND image.itemID=auction.itemID "+
                "GROUP BY auction.auctionID "+
                "ORDER BY auction.endDate" +
                ";"
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            if (response !== 0) { //if no error when fetching database rows
                //console.log("AUCTIONS ENDING SOON: ", response.data);
                $scope.data.endingsoon = response.data;
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();

    $scope.data.addBookmark = function (auctionID) {
        dataService.addBookmark(auctionID);
    }

    $scope.data.getCategoryName = function (categoryID) {
        return dataService.hashedCategories[categoryID].name;
    }

    $scope.data.getConditionName = function (conditionID) {
        return dataService.hashedConditions[conditionID].name;
    }


});
