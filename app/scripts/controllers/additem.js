/*****************************************************************************************
 * ADD ITEM CONTROLLER
 *****************************************************************************************/
emart.controller('addItemCtrl', function ($scope, $http, $state, dataService, $cookies) {
    $scope.data = {}; //creating new scope that can be used inside tabset
    $scope.data.slideInterval = 2000;
    $scope.data.imagesSaved = false;

    $scope.data.categories = dataService.categories;
    $scope.data.conditions = dataService.conditions;

    //
    $scope.imageStrings = [];
    $scope.processFiles = function(files){
        angular.forEach(files, function(flowFile, i){
            var fileReader = new FileReader();
            fileReader.onload = function (event) {
                var uri = event.target.result;
                $scope.imageStrings[i] = uri;
            };
            fileReader.readAsDataURL(flowFile.file);
        });

    };

    $scope.data.addItem = function () {
        console.log("Inside adding item method...");

        if ($scope.data.itemForm.name.$valid &&
            $scope.data.itemForm.category.$valid &&
            $scope.data.itemForm.description.$valid &&
            $scope.data.itemForm.condition.$valid
        ) {
            //Insert the item into the database now that it is validated
            var request = $http({
                method: "post",
                url: "/scripts/php/additem.php",
                data: {
                    itemname: $scope.data.name,
                    description: $scope.data.description,
                    category: $scope.data.category,
                    condition: $scope.data.condition,
                    ownerID: $cookies.get('userID')
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
                            images: $scope.imageStrings
                        },
                        headers: {'Content-Type': 'application/json'}
                    });

                    insertImages.success(function (data) {
                        console.log("Image insertion response from database", data);
                        if (data == 1) {
                            $state.go('seller.draft');
                            toaster.pop({
                                type: 'success',
                                title: 'Item Added',
                                body: 'Your item has been added successfully!',
                                showCloseButton: false,
                                timeout: 2500
                            });
                        }
                    });
                }

                else {
                    toaster.pop({
                        type: 'error',
                        title: 'Error',
                        body: 'Something went wrong, try again.',
                        showCloseButton: false,
                        timeout: 2000
                    });
                }
            });

        }

        else {
            toaster.pop({
                type: 'error',
                title: 'Error',
                body: 'Please fill out all fields correctly before proceeding!',
                showCloseButton: false,
                timeout: 2000
            });
        }
    };

});

