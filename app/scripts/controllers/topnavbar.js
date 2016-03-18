/**
 * Created by kimeshan on 07/03/2016.
 */
emart.controller('topNavCtrl', function ($scope, $http, $state, searchService, $cookies) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    //Search service
    console.log($state.current.name);

    $scope.data.navSearch = function () {
        $state.go('search');
        searchService.setSearchTerm($scope.data.navSearchTerm);
    };

});

