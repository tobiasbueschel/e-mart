/**
 * Created by kimeshan on 07/03/2016.
 */
emart.controller('addItemCtrl', function ($scope, $http, $state, dataService) {
    $scope.data = {}; //creating new scope that can be used inside tabset


    //Get categories and conditions data from dataService
    var myDataPromise = dataService.getData();
    myDataPromise.then(function(result) {
        //inside promise then
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });

    $scope.data.addItem = function () {
        console.log("Inside adding item method...");
        console.log($scope.data.name,$scope.data.description, $scope.data.category, $scope.data.condition);
        var request = $http({
            method: "post",
            url: "/scripts/php/additem.php",
            data: {
                itemname: $scope.data.name,
                description: $scope.data.description,
                category: $scope.data.category,
                condition: $scope.data.condition,
                blobs: $scope.data.blobs,
                ownerID: dataService.userObject.userID
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });
        /* Successful HTTP post request or not */
        request.success(function (data) {
            console.log("Response: ",data);
            if(data == 1){
                $scope.data.responseMessage = "ITEM ADDED SUCCESSFULLY!";
                //$state.go('main');
            }
            else {
                $scope.data.responseMessage = "Couldn't write to DB!";
            }
        });
    };

});

