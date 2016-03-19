/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('sellerDashboardCtrl', function ($scope, $http, $state, $cookies, toaster, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    $scope.data.getCategoryOfItem = function (item) {
        console.log(item,dataService.categories);
        return dataService.hashedCategories[item.categoryID].name;
    };

    $scope.data.getConditionOfItem = function (item) {
        return dataService.hashedConditions[item.conditionID].name;
    };

    $scope.data.getItemNamebyID = function (itemID) {
        return $scope.data.hashedItems[itemID].name;
    };

    $scope.data.createAuction = function () {
        $state.go('addauction');
    };

    $scope.data.deleteItem = function (itemID) {
        console.log("Delete item", itemID);

        swal({
            title: "Are you sure?",
            text: "Deleting this item cannot be undone!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel!",
            allowOutsideClick: true,
            closeOnConfirm: false,
            closeOnCancel: true
        }, function(isConfirm){
            if (isConfirm) {
                var deleteItem = $http({
                    method: 'post',
                    url: "/scripts/php/editRowsBySQL.php",
                    data: {
                        sql: "DELETE FROM item WHERE itemID="+itemID
                    }
                });
                deleteItem.success(function (data) {
                    console.log("response" ,data);
                    if (data==1) {
                        //Item deleted
                        $state.reload();
                        swal({
                            title: "Success!",
                            text: "Item has been deleted!",
                            type: "success",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                    else {
                        swal({
                            title: "Delete failed!",
                            text: "Only non-auctioned items can be deleted",
                            type: "warning",
                            timer: 2000,
                            showConfirmButton: false
                        });
                    }
                });
            }
        });
    };

    (function () {
        //Get items of the current user
        var sellerItemsPromise = dataService.getSellerItems($cookies.get('userID'));
        sellerItemsPromise.then(function(result) {
            //inside promise then
            console.log("got seller items...");
            $scope.data.items = result.data;
            $scope.data.hashedItems = dataService.generateHashTable($scope.data.items, "itemID");
            $scope.$broadcast('sellerItemsObtains');
        });

        //Get sold items of user
        var sellerSoldItemsPromise = dataService.getSellerSoldItems($cookies.get('userID'));
        sellerSoldItemsPromise.then(function(result) {
            //inside promise then
            $scope.data.soldItems = result.data;
            $scope.data.soldHashedItems = dataService.generateHashTable($scope.data.items, "itemID");
        });

        //Get the auctions of the current user
        var sellerAuctionsPromise = dataService.getSellerAuctions($cookies.get('userID'));
        sellerAuctionsPromise.then(function(result) {
            //inside promise then
            $scope.data.auctions = result.data;
            console.log(result.data);
        });
    })();


});

