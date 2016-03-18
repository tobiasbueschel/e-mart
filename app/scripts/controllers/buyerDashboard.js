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
});


