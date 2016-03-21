<?php
/**
 * Created by PhpStorm.
 * User: kimeshan
 * Date: 07/03/2016
 * Time: 02:46
 */
require_once("dbConnection.php");
ob_start();

if(isset($_POST)) {
    dbConnect();
    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $table_data = []; //declare empty array where pulled data will be stored
    $userID = $request->userID;
    //loop through each table in the tables array
    // DATABASE QUERY
    $current_rows = [];
    $sql = "SELECT a.auctionID as auctionID, name, description, instantPrice, isActive, endDate, (select max(bid.bidPrice) from bid WHERE bid.auctionID=a.auctionID) as bidPrice, image from(((auction a LEFT JOIN bid b ON a.auctionID = b.auctionID) JOIN bookmark d ON a.auctionID = d.auctionID))LEFT JOIN image on a.itemID=image.itemID WHERE d.userID = $userID AND a.isActive = true GROUP BY a.auctionID";
    if ($result = $connection->query($sql) ) {
        //convert the results to an array of rows
        while ($row = mysqli_fetch_array($result)) {
            $current_rows[] = $row; //push each row to current_rows array
        }
        //push the array to our hash map using the table name as the key
    }
    else{
        // logs errors to console
        error_log("error" . $sql . $connection->error);
        echo false;
    }


    header('Content-Type: application/json');
    //return JSON encoded object to the front end
    echo json_encode($current_rows);
}

else {
    echo "Post is empty";
}

dbClose();
ob_end_flush();
?>


