emart.controller('auctionListCtrl', function ($scope, $http, $state, $cookies, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    var myDataPromise1 = dataService.getData();
    myDataPromise1.then(function(result) {
        //inside promise then
        console.log("I'm here");
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });
    (function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "select a.auctionID, itemID, name, description, instantPrice, isActive, endDate, bidID, bidderID, bidPrice from auction a LEFT JOIN bid b ON a.currentBidID = b.bidID WHERE isActive = true;"
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
                $scope.data.auctions = response.data;
                console.log($scope.data.auctions);
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }

        })
    }


});
