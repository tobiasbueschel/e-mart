/************************************************************************************
 * This service provides a singleton for categories and conditions data
 ************************************************************************************/
emart.service('dataService', ['$http','$cookies','toaster', function ($http, $cookies, toaster) {
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
        //console.log(hashTable);
        return hashTable;
    };

    //SET THE CURRENT USER
    dataServiceScope.setCurrentUser = function (usr) {
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

    //GET THE CONDITION BY ID
    dataServiceScope.getConditionbyID = function (conditionID) {
        if (dataServiceScope.conditions!=null) {
            dataServiceScope.conditions.forEach (function (condition) {
                if (condition.conditionID==conditionID) return condition;
            })
        }
        return null;
    };

    //GET CONDITIONS AND CATEGORIES FROM DATABASE
    dataServiceScope.getData = function() {
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
                //console.log(dataServiceScope.hashedConditions, dataServiceScope.hashedCategories);
                return data;
            }
            else {
                console.log("Error loading drop down menu conditions and categories from database");
            }
        });
    };

    //call it
    dataServiceScope.getData();


    //GET ALL LIVE AUCTIONS
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
            console.log("GOT LIVE AUCTIONS", response);
            if (response!==0) { //if no error when fetching database rows
                items = response;
                return items;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    //GET USER RATINGS
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
            console.log("GOT USER RATINGS", response);
            if (response!==0) { //if no error when fetching database rows
                ratings = response;
                return ratings;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    //GET SOLD ITEMS
    dataServiceScope.getSellerSoldItems = function (auctioneerID) {
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT auction.auctionID, auction.name, auction.description, auction.currentBidID, item.itemID, item.name, "+
                "item.buyerID, item.isSold, bid.bidID, bid.bidPrice, user.userID, user.firstName, user.userName, user.emailAddress "+
                "FROM auction, item, bid, user "+
                "WHERE item.ownerID="+auctioneerID+
                " AND item.isSold=1 AND auction.itemID = item.itemID AND item.buyerID=user.userID"+
                " AND auction.currentBidID=bid.bidID GROUP BY auction.auctionID;"
            },

        headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("GOT SOLD ITEMS", response);
            if (response!==0) { //if no error when fetching database rows
                return response;
            }
            else {
                console.log("Error response from database");
            }
        });
    };


    //GET ITEMS ON SALE FOR THE SELLER
    dataServiceScope.getSellerAuctions = function (auctioneerID) {
        var auctions = null;
        return request = $http({
            method: "post",
            url: "/scripts/php/selectRowBysql.php",
            data: {
                sql: "SELECT auction.auctionID, auction.name, auction.description, auction.auctioneerID, "+
                "auction.startDate, auction.endDate, auction.startingPrice, auction.instantPrice, auction.reservePrice, item.itemID, item.name, auction.isActive FROM auction, item "+
                "WHERE auctioneerID="+$cookies.get('userID')+
                " AND auction.itemID= item.itemID GROUP BY auction.auctionID;"
            },
            headers: { 'Content-Type': 'application/json' }
        }).then(function (response) {
            console.log("GOT SELLER AUCTIONS", response);
            if (response!==0) { //if no error when fetching database rows
                return response;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    //GET IMAGES FOR AN ITEM
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
            if (response!==0) { //if no error when fetching database rows
                return response;
            }
            else {
                console.log("Error response from database");
            }
        });
    };

    //ADD A BOOKMARK
    //function to add bookmark
    dataServiceScope.addBookmark = function (auctionID) {
        return request = $http({
            method: "post",
            url: "/scripts/php/addbookmark.php",
            data: {
                auctionID: auctionID,
                userID: $cookies.get('userID')
            },
            headers: {'Content-Type': 'application/json'}
        }).then(function (response) {
            if (response !== 0) { //if no error when fetching database rows
                toaster.pop({
                    type: 'success',
                    title: 'Bookmark added',
                    body: 'You are now watching this auction!',
                    showCloseButton: true,
                    timeout: 2500
                });
            }
            else {
                toaster.pop({
                    type: 'error',
                    title: 'Error',
                    body: 'Error adding bookmark. Try again.',
                    showCloseButton: true,
                    timeout: 2500
                });
            }

        })
    }

}]);