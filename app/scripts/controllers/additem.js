/**
 * Created by kimeshan on 07/03/2016.
 */
emart.controller('addItemCtrl', function ($scope, $http, $state) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    //Pull categories and conditions from database

    //Let's pull categories
    console.log("pulling categories and conditions...");
    var request = $http({
        method: "post",
        url: "/scripts/php/getAllRows.php",
        data: {
            tables: ["category","itemcondition"]
        },
        headers: { 'Content-Type': 'application/json' }
    });

    /* Successful HTTP post request or not */
    request.success(function (data) {
        console.log("Response: ",data);
    });

    $scope.data.categories = ["Electronics","Household Appliances","Shoes","Clothes","Computers"];
    $scope.data.conditions = ["Poor","Average","Good","Excellent","New"];


    $scope.data.addItem = function () {
        console.log("Inside adding item method...");
        console.log($scope.data.name,$scope.data.description);
        var request = $http({
            method: "post",
            url: "/scripts/php/additem.php",
            data: {
                itemname: $scope.data.name,
                description: $scope.data.description,
                category: $scope.data.category,
                condition: $scope.data.condition
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
                $scope.data.responseMessage = "Coudln't write to DB!";
            }
        });
    };

});

