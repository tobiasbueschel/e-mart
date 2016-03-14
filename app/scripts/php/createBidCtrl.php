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

    echo $bidPrice, $emailAddress;
    $sql1 = 'SELECT userID FROM user WHERE emailAddress="' . $emailAddress . '"';

    echo $sql1."\n";


    if ($result = $connection->query($sql1)) {
        while ($row = $result->fetch_assoc()) {
            $bidderID=$row['userID'];
        }
        echo $bidderID;
        $sql2 = "INSERT INTO bid (bidderID, auctionID, bidPrice)
            VALUES ($bidderID, $auctionID, $bidPrice)";

        echo $sql2.'\n';

        if ($connection->query($sql2) == TRUE) {
            echo "sql2 successful";
            echo true;
        } else {
            // logs errors to console
            error_log("error" . $sql2 . $connection->error);
            echo false;
        }
    }else {
        // logs errors to console
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