emart.controller('createBidCtrl', function ($scope, $http, $stateParams, $cookies, $state, toaster) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.auctionname = $stateParams.other;

    (function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "select bidPrice, bidderID from bid where bidPrice = (select max(bidPrice) from bid WHERE auctionID=" + $stateParams.id + ")"
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            console.log(response);
            if (response !== 0) { //if no error when fetching database rows
                console.log(response);
                $scope.data.currentbidPrice = response.data[0].bidPrice;
                $scope.data.previousBidderID = response.data[0].bidderID;

            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    })();
    console.log($cookies);

    $scope.data.createBid = function () {
        // If x is Not a Number or less than one or greater than 10
        if ($scope.data.bidPrice <= $scope.data.currentbidPrice) {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: 'Your bid is lower than current bid :(',
                showCloseButton: false,
                timeout: 2500
            });
        } else {
            var request = $http({
                method: "post",
                url: "/scripts/php/createBidCtrl.php",
                data: {
                    bidPrice: $scope.data.bidPrice,
                    auctionID: $stateParams.id,
                    bidderID: $cookies.get('userID')
                },
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            });
            /* Successful HTTP post request or not */
            request.success(function (data) {
                console.log("Response: ", data);
                if (data == 1) {
                    $state.go('buyer.mybids');
                    toaster.pop({
                        type: 'success',
                        title: 'SUCCESS',
                        body: 'YOUR BID ADDED SUCCESSFULLY! :)',
                        showCloseButton: false,
                        timeout: 2500
                    })
                    sendemailtobuyer();
                    sendemailtoseller();


                }
                else {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: 'Unexpected error has occurred :(',
                        showCloseButton: false,
                        timeout: 2500
                    });
                }
            })
        }
    }
    function sendemailtobuyer() {
        var request = $http({
            method: "post",
            url: "/scripts/php/sendEmailtoBuyer.php",
            data: {
                bidderID: $scope.data.previousBidderID
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });

        /* Successful HTTP post request or not */
        request.success(function (data) {
            console.log(data);
            if (data == true) {
                console.log("Email sent to previous bidder")
            }
            else {
                console.log("Unexpected error has occurred :(")
            }
        })
    }

    function sendemailtoseller() {
        var request = $http({
            method: "post",
            url: "/scripts/php/message.php",
            data: {
                auctionID: $stateParams.id
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        /* Successful HTTP post request or not */
        request.success(function (data) {
            if (data == true) {
                console.log("Email sent to seller")
            }
            else {
                console.log("Unexpected error has occurred :(")
            }
        })
    };
    function sendemessagetoseller() {
        var request = $http({
            method: "post",
            url: "/scripts/php/sendEmailtoSeller.php",
            data: {
                auctionID: $stateParams.id
            },
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        });
        /* Successful HTTP post request or not */
        request.success(function (data) {
            if (data == true) {
                console.log("Email sent to seller")
            }
            else {
                console.log("Unexpected error has occurred :(")
            }
        })
    };

});
