<?php
require_once("dbConnection.php");
ob_start();
if(isset($_POST)) {
    dbConnect();
    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $bidPrice = $request->bidPrice;
    $auctionID = $request->auctionID;
    $bidderID = $request->bidderID;
    $sql1 = "INSERT INTO bid (bidderID, auctionID, bidPrice)
            VALUES ($bidderID, $auctionID, $bidPrice)";
    $sql2 = "UPDATE auction a LEFT JOIN (select bidPrice,bidID,auctionID from bid natural join auction where bidPrice = (select max(bidPrice) from bid WHERE auctionID= $auctionID)) b on a.auctionID = b.auctionID set currentBidID=b.bidID where a.auctionID = $auctionID and endDate > curDate()";
    try {
        $connection->autocommit(FALSE);
        $connection->query($sql1);
        $connection->query($sql2);
        $connection->commit();
        echo true;
    } catch (Exception $e) {
        $connection->rollback();
        echo false;
    }
}

else {
    echo false;
}
dbClose();
ob_end_flush();
?>