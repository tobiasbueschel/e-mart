
emart.controller('profileCtrl', function ($scope, $http, $state, toaster, $cookies, dataService) {
/************************************************************************
 * PROFILE CONTROLLER
 ************************************************************************/

    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.categories = dataService.hashedCategories;
    $scope.data.conditions = dataService.hashedConditions;


    $scope.data.getCategoryOfItem = function (item) {
        return $scope.data.categories[item.categoryID].name;
    };

    $scope.data.getConditionOfItem = function (item) {
        return $scope.data.conditions[item.conditionID].name;
    };

    $scope.data.getItemNamebyID = function (itemID) {
        return $scope.data.hashedItems[itemID].name;
    };

    //Get ratings of the current user
    var userRatingsPromise = dataService.getUserRatings($cookies.get('userID'));
    userRatingsPromise.then(function(result) {
        $scope.data.ratings = result.data;
    });

    //Get items of the current user
    var sellerItemsPromise = dataService.getSellerItems($cookies.get('userID'));
    sellerItemsPromise.then(function(result) {
        //inside promise then
        $scope.data.items = result.data;
        $scope.data.hashedItems = dataService.generateHashTable($scope.data.items, "itemID");
    });

    //Get the auctions of the current user
    var sellerAuctionsPromise = dataService.getSellerAuctions($cookies.get('userID'));
    sellerAuctionsPromise.then(function(result) {
        console.log(result.data);
        $scope.data.auctions = result.data;
    });



});
