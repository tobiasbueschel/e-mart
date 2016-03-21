/**
 * Created by kimeshan on 10/03/2016.
 */

emart.controller('sellerDashboardCtrl', function ($scope, $http, $state, $window, $cookies, toaster, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset

    $scope.data.getCategoryOfItem = function (item) {
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

    //CONTACT BUYER/SELLER
    $scope.data.goToURL = function (email, subject) {
        $window.open("mailto:"+email+"?Subject="+subject, "_blank");
    }

    $scope.data.deleteItem = function (itemID) {
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
        //Get items that do not have auctions coming up or are already in a live auction
        var requestDraftItems = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
               sql:  "SELECT i.* FROM item i LEFT JOIN auction a ON i.itemID = a.itemID AND a.isActive=1 "
               +"WHERE a.itemID IS NULL AND i.ownerID=1371 AND i.isSold=0 ;"
            },
            headers: { 'Content-Type': 'application/json' }
        });
        requestDraftItems.success(function (result) {
            console.log("DRAFT ITEMS: ", result);
            $scope.data.items = result;
        });

        //Get sold items of user
        var sellerSoldItemsPromise = dataService.getSellerSoldItems($cookies.get('userID'));
        sellerSoldItemsPromise.then(function(result) {
            //inside promise then
            $scope.data.soldItems = result.data;
        });

        //Get the auctions of the current user
        var sellerAuctionsPromise = dataService.getSellerAuctions($cookies.get('userID'));
        sellerAuctionsPromise.then(function(result) {
            //inside promise then
            $scope.data.auctions = result.data;
        });
    })();

    $scope.data.getCategoryName = function (categoryID) {
        return dataService.hashedCategories[categoryID].name;
    }

    $scope.data.getConditionName = function (conditionID) {
        return dataService.hashedConditions[conditionID].name;
    }


});

