emart.controller('viewBidCtrl', function ($scope, $stateParams, $http, $state, $cookies, toaster) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.auctionname = $stateParams.other;
    $scope.data.formatDate = function (phpDateTime) {
        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
        var date = new Date(phpDateTime);
        var day = date.getDate();
        var monthIndex = date.getMonth();
        var year = date.getFullYear();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        return day+" "+monthNames[monthIndex]+" "+year+", "+hours+":"+minutes;
    };

    (function () {
        console.log($stateParams);
        return request = $http({
            method: "post",
            url: "/scripts/php/bidhistory.php",
            data: {
                auctionID: $stateParams.id
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log(response);
            if (response!==0) { //if no error when fetching database rows
                console.log(response);
                $scope.data.bids = response.data;
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();


});
