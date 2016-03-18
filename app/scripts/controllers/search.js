/**
 * Created by kimeshan on 18/03/2016.
 */
emart.controller('searchCtrl', function ($scope, $http, $stateParams, $state, toaster) {
    $scope.data = {};
    $scope.data.searchResults = [];
    $scope.data.srLength = $scope.data.searchResults.length;
    $scope.data.searchterm  = "";

    $scope.data.searchAuctions = function () {
        console.log($scope.data.searchterm);
        //Search request
        var searchRequest = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT * FROM auction WHERE (name LIKE '%"+$scope.data.searchterm+"%' "+
                " OR description LIKE '%"+$scope.data.searchterm+"%')"
            }
        });

        //Check promise
        searchRequest.success(function (data) {
            console.log("Response", data);

            if (data) {

                //Success
                $scope.data.searchResults = data;
                $scope.data.srLength = $scope.data.searchResults.length;
            }
        })
    }

    $scope.data.searchAuctions();



});

