/************************************************************************************
 * This service provides a singleton for categories and conditions data
 ************************************************************************************/
emart.service('dataService', ['$http','$cookies', function ($http, $cookies) {
    var dataServiceScope = this;

    //Store categories and conditions here
    dataServiceScope.categories = null;
    dataServiceScope.conditions = null;
    //Hashed categories and conditions by ID
    dataServiceScope.hashedCategories = null;
    dataServiceScope.hashedConditions = null;

    //User session tracking
    dataServiceScope.userLoggedIn = false;
    dataServiceScope.userObject = null;

    //Hashes an array of object by hashfield property, returns a hashed object (table)
    dataServiceScope.generateHashTable = function (array, hashfield) {
        var hashTable = {};
        array.forEach(function (element, index) {
            var currentHashKey = element[hashfield]+"";
            hashTable[currentHashKey] = element;
        });
        console.log(hashTable);
        return hashTable;
    };

    dataServiceScope.setCurrentUser = function (usr) {
        console.log("hello");
        console.log(usr);

        dataServiceScope.userLoggedIn = true;
        dataServiceScope.userObject = usr;

        // Setting a cookie
        $cookies.put('userID', usr.userID);
        $cookies.put('userName', usr.userName);
        $cookies.put('twUsername', usr.twUsername);
        $cookies.put('twProfileImage', usr.twProfileImage);
        $cookies.put('firstName', usr.firstName);
        $cookies.put('lastName', usr.lastName);
        $cookies.put('userType', usr.userType);
        $cookies.put('dateRegistered', usr.dateRegistered);
        $cookies.put('city', usr.city);

    };

    dataServiceScope.getConditionbyID = function (conditionID) {
        if (dataServiceScope.conditions!=null) {
            dataServiceScope.conditions.forEach (function (condition) {
                if (condition.conditionID==conditionID) return condition;
            })
        }
        return null;
    };

    dataServiceScope.getData = function() {
        console.log("GETTING CONDITIONS AND CATEGORIES DATA");
        // Angular $http() and then() both return promises themselves
        //Let's pull categories
        var data = {};
        return request = $http({
            method: "post",
            url: "/scripts/php/getAllRows.php",
            data: {
                tables: ["category","itemcondition"]
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            if (response!==0) { //if no error when fetching database rows
                data.categories = response.data.category;
                data.conditions = response.data.itemcondition;
                dataServiceScope.categories = response.data.category;
                dataServiceScope.conditions = response.data.itemcondition;
                //hash  conditions by conditions Id dataServiceScope.conditions, and same for categories
                dataServiceScope.hashedCategories = dataServiceScope.generateHashTable(dataServiceScope.categories, "categoryID");
                dataServiceScope.hashedConditions = dataServiceScope.generateHashTable(dataServiceScope.conditions, "conditionID");
                console.log(dataServiceScope.hashedConditions, dataServiceScope.hashedCategories);
                return data;
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    };

    //call it
    dataServiceScope.getData();

    //All live auctions
    dataServiceScope.getAllLiveAuctions = function () {
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowsGeneric.php",
            data: {
                table:'auction',
                where:'WHERE isActive=1'
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Response", response);
            if (response!==0) { //if no error when fetching database rows
                items = response;
                return items;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    dataServiceScope.getUserRatings = function (userID) {
        var ratings = null;
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBySql.php",
            data: {
                sql:'SELECT rating.description, rating.starRating, rating.created, user.userName, user.twProfileImage FROM rating INNER JOIN user ON rating.userID = '+userID+' AND rating.raterID=user.userID'
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Response", response);
            if (response!==0) { //if no error when fetching database rows
                console.log(response);
                ratings = response;
                return ratings;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    dataServiceScope.getSellerItems = function (userID) {
        console.log(userID);
        var items = null;
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowsGeneric.php",
            data: {
                table:'item',
                where:'WHERE ownerID='+userID+' AND isSold=0'
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Response", response);
            if (response!==0) { //if no error when fetching database rows
                console.log(response);
                items = response;
                return items;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    dataServiceScope.getSellerSoldItems = function (userID) {
        var items = null;
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowsGeneric.php",
            data: {
                table:'item',
                where:'WHERE ownerID='+userID+' AND isSold=0'
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Response", response);
            if (response!==0) { //if no error when fetching database rows
                console.log(response);
                items = response;
                return items;
            }
            else {
                console.log("Error response from database");
            }
        });
    };



    dataServiceScope.getSellerAuctions = function (auctioneerID) {
        var auctions = null;
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT auction.auctionID, auction.name, auction.description, auction.auctioneerID, "+
                "auction.startDate, auction.endDate, auction.startingPrice, auction.instantPrice, auction.reservePrice, item.itemID, item.name FROM auction, item "+
                "WHERE auctioneerID="+$cookies.get('userID')+
                " AND auction.itemID= item.itemID GROUP BY auction.auctionID;"
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Reponse from PHP getting seller items", response);
            if (response!==0) { //if no error when fetching database rows
                return response;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    dataServiceScope.getItemImage = function(itemID) {

        var image = {};
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowsGeneric.php",
            data: {
                tables:'image',
                where: 'WHERE itemID='+itemID
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Response", response);
            if (response!==0) { //if no error when fetching database rows
                return response;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    dataServiceScope.getAuctions = function () {

        var auctiondata = {};
        return request = $http({
            method: "post",
            url: "/scripts/php/getAllRows.php",
            data: {
                tables:["auction"]
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("Response", response);
            if (response!==0) { //if no error when fetching database rows
                console.log(response);
                auctiondata.auctions = response.data.auction;
                return auctiondata;
            }
            else {
                console.log("Error response from database");
            }
        });
    }

}]);