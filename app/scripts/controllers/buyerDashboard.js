emart.controller('BuyerDashboardCtrl', function ($scope, $http, $state, $cookies, toaster, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.getItemNamebyID = function (itemID) {
        return $scope.data.hashedItems[itemID].name;
    };
    (function () {
        console.log($cookies);
        return request = $http({
            method: "post",
            url: "/scripts/php/mybids.php",
            data: {
                bidderID: $cookies.get('userID')
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            console.log(response);
            if (response !== 0) { //if no error when fetching database rows
                console.log(response);
                $scope.data.auctions = response.data;
                console.log($scope.data.auctions);
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();
    console.log($cookies);
})

.controller('bookmarkCtrl', function ($scope, $http, $state, $cookies, toaster, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    (function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/bookmarklist.php",
            data: {
                userID: $cookies.get('userID')
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            console.log(response);
            if (response !== 0) { //if no error when fetching database rows
                console.log(response);
                $scope.data.auctions = response.data;
                console.log($scope.data.auctions);
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();
})

.controller('boughtItemsCtrl', function ($scope, $http, $state, $cookies, toaster, dataService) {
    console.log("Inside bought items ctrl");
    $scope.data = {}; //creating new scope that can be used inside tabset
    var request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT item.name, item.description, auction.auctioneerID, user.userID, user.firstName, "+
                "auction.auctionID, auction.name, auction.endDate, bid.bidID, bid.bidPrice "+
                "FROM item, auction, user, bid "+
                "WHERE item.buyerID="+$cookies.get('userID')+" AND item.itemID=auction.itemID AND "+
                "user.userID = auction.auctioneerID AND bid.bidID=auction.currentBidID GROUP BY item.itemID;"
            },
            headers: {'Content-Type': 'application/json'}
        });

    request.then(function (response) {
            console.log("Bought items", response);
            if (response !== 0) { //if no error when fetching database rows
                console.log(response);
                $scope.data.boughtitems = response.data;
                console.log($scope.data.boughtitems);
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
    });
});

