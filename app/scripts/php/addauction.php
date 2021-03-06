<?php
require_once("dbConnection.php");
ob_start();

if(!empty($_POST)) {
    dbConnect();
    // STORE POSTED VALUES IN VARIABLES

    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $auctioneerid = $request->auctioneerid;
    $itemid = $request -> itemid;
    $auctionname = $request -> auctionname;
    $description = $request -> description;
    $startingprice = $request -> startingprice;
    $instantprice = $request -> instantprice;
    $reserveprice = $request -> reserveprice;
    $isactive = true;
    $startdate = $request -> startdate;
    $enddate = $request -> enddate;
    $startdate = date("Y-m-d H:i:s",strtotime($startdate));
    $enddate = date("Y-m-d H:i:s",strtotime($enddate));
    // DATABASE QUERY
    $sql = "INSERT INTO auction (auctioneerID, itemID, name, description, startingPrice, instantPrice, reservePrice, isActive, startDate, endDate)
            VALUES ($auctioneerid,$itemid, '$auctionname','$description', $startingprice, $instantprice, $reserveprice, $isactive, '$startdate', '$enddate')";

    if ($connection->query($sql) == TRUE ){
        echo true;
    }
    else{
        // logs errors to console
        error_log("error" . $sql . $connection->error);
        echo false;
    }
}

else {
    echo "Post is empty";
}

dbClose();
ob_end_flush();
?>
