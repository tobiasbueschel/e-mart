/************************************************************************
 * ECOMMERCE CONTROLLER
 * Manages login(), registerUser(), forgotPassword() function.
 ************************************************************************/

emart.controller('ecommerceCtrl', function ($scope, $http, $state, toaster) {

    // DATA FOR REGISTER FORM
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
            endingBid: 36,

        }
    };



});
