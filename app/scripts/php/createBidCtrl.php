<?php
require_once("dbConnection.php");
ob_start();
if(isset($_POST)) {
    dbConnect();
    session_start();
    if (isset($_SESSION['email'])) {
        $emailAddress = $_SESSION['email'];
    }
    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $bidPrice = $request->bidPrice;
    $auctionID = $request->auctionID;
    /*$sql = 'SELECT bidPrice FROM bid WHERE auctionID = $auctionID';
    if ($result = $connection->query($sql)) {
        while ($row = $result->fetch_assoc()) {
            $currentBidPrice = $row['bidPrice'];
        }
            echo $currentBidPrice;
            if ($bidPrice < $currentBidPrice) {
                echo false;
            }
    }
    */

    $sql1 = 'SELECT userID FROM user WHERE emailAddress="' . $emailAddress . '"';

    /*
     * */
    if ($result = $connection->query($sql1)) {
        while ($row = $result->fetch_assoc()) {
            $bidderID=$row['userID'];
        }
        $sql2 = "INSERT INTO bid (bidderID, auctionID, bidPrice)
            VALUES ($bidderID, $auctionID, $bidPrice)";

        $sql3 = "UPDATE auction a LEFT JOIN (select bidPrice,bidID,auctionID from bid natural join auction where bidPrice = (select max(bidPrice) from bid WHERE auctionID= $auctionID)) b
    on a.auctionID = b.auctionID set currentBidID=b.bidID where a.auctionID = $auctionID and endDate > curDate()";
        try {
            $connection->autocommit(FALSE);
            $connection->query($sql2);
            $connection->query($sql3);
            $connection->commit();
            echo true;
        } catch (Exception $e) {
            $connection->rollback();
        }
    }else {
        error_log("error" . $sql1 . $connection->error);
        echo false;
    }
}
else {
    echo "Bid is empty";
}
dbClose();
ob_end_flush();
?>