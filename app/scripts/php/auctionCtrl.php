<?php
ignore_user_abort(true);
set_time_limit(0);
require_once("dbConnection.php");
ob_start();
dbConnect();
    // DATABASE QUERY
    $sql1 = "SELECT auctionID, name, auctioneerID FROM auction WHERE endDate < curDate() AND isActive=true";

if ($result1 = $connection->query($sql1) ) {
        //convert the results to an array of rows
        while ($row1 = mysqli_fetch_array($result1)) {
            $auctionname=$row1['name'];
            $itemID=$row1['itemID'];
            $sql2="SELECT emailAddress FROM user WHERE userID = {$row1['auctioneerID']}";
            if ($result2 = $connection->query($sql2) ) {
                while ($row2= mysqli_fetch_array($result2)){
                    $email = $row2['emailAddress'];
                }
                emailtoAuctioneer($email);
                }
            else{
                error_log("error" . $sql2 . $connection->error);
                echo false;
            }
            $sql3="SELECT emailAddress FROM user WHERE userID = (select bidderID from auction a LEFT JOIN bid b ON a.currentBidID = b.bidID WHERE a.auctionID={$row1['auctionID']})";
            if($result3 = $connection->query($sql3)){
                while ($row2= mysqli_fetch_array($result3)){
                    $email = $row2['emailAddress'];
                }
                emailtoBidder($email);
            }
            else{
                error_log("error" . $sql3 . $connection->error);
                echo false;
            }
        }
    $sql4 = "UPDATE auction SET isActive=FALSE WHERE endDate < curDate()";
    $sql5 = "UPDATE item SET isSold=FALSE WHERE itemID ="+$itemID;
    try {
        $connection->autocommit(FALSE);
        $connection->query($sql4);
        $connection->query($sql5);
        $connection->commit();
        echo true;
    } catch (Exception $e) {
        $connection->rollback();
        echo false;
    }

    }
    else{
        // logs errors to console
        error_log("error" . $sql1 . $connection->error);
        echo false;
    }

$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: <emart.noreply@gmail.com>' . "\r\n";

function emailtoauctioneer($emailTO) {
    global $headers;

    $message =  '<html>
                    <h3>Hi</h3>
                    <br>
                    Your auction ended.
                    Please click on the link below to bid check:
                    <br><br>
                    http://www.e-mart.azurewebsites.net/
                    <br>
                </html>';
    mail($emailTO, 'E-Mart: You have been outbid', $message, $headers);
    echo true;
}
function emailtobidder($emailTO) {
    global $headers;

    $message =  '<html>
                    <h3>Hi</h3>
                    <br>
                    Congratulations! You won an auction.
                    Please click on the link below to bid check:
                    <br><br>
                    http://www.e-mart.azurewebsites.net/
                    <br>
                </html>';
    mail($emailTO, 'E-Mart: You have been outbid', $message, $headers);
    echo true;
}



dbClose();
ob_end_flush();
?>