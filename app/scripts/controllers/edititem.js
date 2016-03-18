/**
 * Created by kimeshan on 07/03/2016.
 */
emart.controller('editItemCtrl', function ($scope, $http, $state, $stateParams, dataService, $cookies) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.itemid = $stateParams.itemid;
    //$scope.data.slideInterval = 2000;
    $scope.data.imageStrings = [];

    $scope.data.deleteImage = function (idx) {
        console.log($scope.data.imageStrings.length);
        $scope.data.imageStrings.splice(idx, 1);
        console.log($scope.data.imageStrings.length);
    };
    console.log("ITEM ID", $scope.data.itemid);

    //Set default values
    var reqItem = $http({
        method: "post",
        url: "/scripts/php/selectRowsGeneric.php",
        data: {
            table: 'item',
            where: 'WHERE itemID='+$scope.data.itemid
        },
        headers: { 'Content-Type': 'application/json' }
    });

    reqItem.success(function (data) {
        if (data) {
            console.log("Item returned", data);
            var currentItem = $scope.data.category = $scope.data.condition = data[0];
            $scope.data.name = currentItem.name;
            $scope.data.description = currentItem.description;
           //$scope.data.imageStrings = ;
        }
    });


    var getImages = $http({
        method: "post",
        url: "/scripts/php/selectRowsGeneric.php",
        data: {
            table: 'image',
            where: 'WHERE itemID='+$scope.data.itemid
        },
        headers: { 'Content-Type': 'application/json' }
    });

    getImages.success(function (data) {
        if (data) {
            console.log("Images returned", data);
            $scope.data.imageObject = data;
            data.forEach(function (image) {
                $scope.data.imageStrings.push(image.image);
            })
            console.log($scope.data.imageStrings);
            console.log($scope.data.imageObject);
        }
    });



    $scope.data.select = "selected";
    //Add image

    $scope.data.imagesSaved = false;
    $scope.data.imagesAdded = "Add images first.";

    //process files
    $scope.data.processFiles = function(files) {
        $scope.data.imageStrings = [];
        angular.forEach(files, function (flowFile, i) {
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                $scope.data.imageStrings[i] = uri;
            };
            fileReader.readAsDataURL(flowFile.file);
        });
        $scope.data.imagesAdded = "Now Click Upload";

    };

    $scope.data.saveImages = function () {
        if ($scope.data.imageStrings.length>0) {
            $scope.data.imagesSaved = true;
        }
    }
    //Get categories and conditions data from dataService
    var myDataPromise = dataService.getData();
    myDataPromise.then(function(result) {
        //inside promise then
        $scope.data.categories = result.categories;
        $scope.data.conditions = result.conditions;
    });

    $scope.data.editItem = function () {
        console.log("Inside edit item method...");
        console.log($scope.data.name,$scope.data.description, $scope.data.category, $scope.data.condition);
        var request = $http({
            method: "post",
            url: "/scripts/php/editRowsBySQL.php",
            data: {
                sql: "UPDATE item SET name='"
                +$scope.data.name+"',description='"+$scope.data.description+"',categoryID='"
                +$scope.data.category.categoryID+"', conditionID='"+$scope.data.condition.conditionID
                +"' WHERE itemID='"+$scope.data.itemid+"'"
            },
            headers: { 'Content-Type': 'application/json' }
        });


        /* Successful HTTP post request or not */
        request.success(function (data) {
            if(data==1) {
                //ITEM EDITED SUCCESSFULLY
                //remove all old images from database
                var deleteImages = $http({
                     method: "post",
                     url: "/scripts/php/editRowsBySQL.php",
                     data: {
                         sql: "DELETE FROM image WHERE itemID="+$scope.data.itemid+"",
                     },
                     headers: {'Content-Type': 'application/json'}
                 });

                deleteImages.success(function (data) {
                    console.log("Image deletion response....", data);
                    if (data==1) {
                        console.log("Images sucessfully deleted!");
                        //Now add the new images
                        var insertImages = $http({
                             method: "post",
                             url: "/scripts/php/addImages.php",
                             data: {
                                 itemID: $scope.data.itemid,
                                 images: $scope.data.imageStrings
                             },
                             headers: {'Content-Type': 'application/json'}
                         });

                         insertImages.success(function (data) {
                            console.log("Image insertion response from database", data);
                            if (data == 1) {
                                 $scope.data.responseMessage = "ITEM AND IMAGES SUCCESSFULLY UPDATED!";
                                $state.go('sellerdashboard');
                            }
                         });
                    }
                });
            }
            else {
                $scope.data.responseMessage = "Couldn't write to DB!";
            }
        });
    };

});

