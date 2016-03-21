<?php
require_once("dbConnection.php");
ob_start();
if(isset($_POST)) {
    dbConnect();
    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $auctionID = $request->auctionID;
    $userID = $request->userID;
    $sql1 = "insert into bookmark (auctionID, userID) values($auctionID, $userID)";
    try {
        $connection->autocommit(FALSE);
        $connection->query($sql1);
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