/**
 * Created by kimeshan on 10/03/2016.
 * This service provides a singleton for categories and conditions data
 */
emart.service('dataService', function ($http) {
    var dataServiceScope = this;
    dataServiceScope.currentUserEmail = null;
    dataServiceScope.currentUserID = null;

    dataServiceScope.setCurrentUser = function (email,id) {
        dataServiceScope.currentUserEmail = email;
        dataServiceScope.currentUserID = id;
    }



    dataServiceScope.getData = function() {

        // Angular $http() and then() both return promises themselves
        //Let's pull categories
        var data = {}
        return request = $http({
            method: "post",
            url: "/scripts/php/getAllRows.php",
            data: {
                tables: ["category","itemcondition"]
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            if (response!==0) { //if no error when fetching database rows
                console.log(response);
                data.categories = response.data.category;
                data.conditions = response.data.itemcondition;
                return data;
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    };

    dataServiceScope.getSellerItems = function (userID) {
        var items = null;
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowsGeneric.php",
            data: {
                table:'item',
                where:'WHERE ownerID='+userID
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            if (response!==0) { //if no error when fetching database rows
                console.log(response);
                items = response;
                return items;
            }
            else {
                console.log("Error response from database");
            }
        });
    }

})