/************************************************************************
 * ECOMMERCE CONTROLLER
 * Manages login(), registerUser(), forgotPassword() function.
 ************************************************************************/

emart.controller('ecommerceCtrl', function ($scope, $http, $state, toaster) {

    $scope.products = {
        itemID: 1,
        name: 'item name',
        description: 'description',
        category: 'test',
        condition: 'poor',
        startingPrice: 1,
        endingPrice: 20,
        owner: 'John Doe',
        auctions: {
            startingTime: 2,
            endingTime: 2
        },
        bids: {
            currentBid: 23,
            endingBid: 36
        }
    };

    $scope.views = [
        "ecommerce.grid",
        "ecommerce.list",
        "ecommerce.product",
        "ecommerce.details"
    ];


    $scope.toggleView = function() {

        for (i = 0; i < $scope.views.length; i++) {
            if ($state.current.name === $scope.views[i]) {
                if ( $state.current.name === $scope.views[3] ) {
                    $state.go($scope.views[0]);
                }
                else{
                    $state.go($scope.views[i+1]);
                }
            }
        }
    }

});
