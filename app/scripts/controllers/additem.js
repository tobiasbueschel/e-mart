/**
 * Created by kimeshan on 07/03/2016.
 */
emart.controller('addItemCtrl', function ($scope, $http, $state, dataService, $cookies) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.slideInterval = 2000;
    //Add image
    $scope.data.imageStrings = [];
    $scope.data.imagesSaved = false;
    $scope.data.imagesAdded = "Add images first.";

    //process files
    $scope.data.processFiles = function(files) {
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
                ownerID: $cookies.userID
            },
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        });


        /* Successful HTTP post request or not */
        request.success(function (data) {
            console.log("Response: ",data);
            if(data[0]) {
                $scope.data.newItemID = data[0];
                //insert images into database
                var insertImages = $http({
                    method: "post",
                    url: "/scripts/php/addImages.php",
                    data: {
                        itemID: $scope.data.newItemID,
                        images: $scope.data.imageStrings
                    },
                    headers: {'Content-Type': 'application/json'}
                });

                insertImages.success(function (data) {
                    console.log("Image insertion response from database", data);
                    if (data == 1) {
                        $scope.data.responseMessage = "ITEM AND IMAGES SUCCESSFULLY ADDED!";
                        $state.go('sellerdashboard');
                    }
                });
            }

            else {
                $scope.data.responseMessage = "Couldn't write to DB!";
            }
        });
    };

});

