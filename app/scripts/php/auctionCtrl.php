<?php
ignore_user_abort(true);
set_time_limit(0);
require_once("dbConnection.php");
ob_start();
dbConnect();
// AZURE SENDGRID AUTHENTICATION
$url = 'https://api.sendgrid.com/';
$user = 'azure_4a08c7d5b58920cfcdd7e5390945734c@azure.com';
$pass = 'emart1234';

function emailtoseller($emailTO) {
    global $url, $user, $pass;

    $params = array(
        'api_user' => $user,
        'api_key' => $pass,
        'to' => $emailTO,
        'subject' => 'E-Mart: Your auction ended',
        'html' =>   "<html>
                            <head></head>
                            <body>
                                <p>Your auction ended.
                    Please click on the link below to check:<br>
                                <span><a href=\"www.e-mart.azurewebsites.net\">URL</a></span>
                                </p>
                            </body>
                        </html>",
        'text' => 'testing body',
        'from' => 'info@emart.com'
    );
    $request = $url.'api/mail.send.json';


// Generate curl request
$session = curl_init($request);

// Tell curl to use HTTP POST
curl_setopt ($session, CURLOPT_POST, true);

// Tell curl that this is the body of the POST
curl_setopt ($session, CURLOPT_POSTFIELDS, $params);

// Tell curl not to return headers, but do return the response
curl_setopt($session, CURLOPT_HEADER, false);
curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// obtain response
$response = curl_exec($session);
curl_close($session);

// print everything out
// print_r($response);

echo true;
}
function emailtowinner($emailTO) {
    global $url, $user, $pass;

    $params = array(
        'api_user' => $user,
        'api_key' => $pass,
        'to' => $emailTO,
        'subject' => 'E-Mart: You won an auction',
        'html' =>   "<html>
                            <head></head>
                            <body>
                                <p>Congratulations! You won an auction.
                    Please click on the link below to bid check:<br>
                                <span><a href=\"www.e-mart.azurewebsites.net\">URL</a></span>
                                </p>
                            </body>
                        </html>",
        'text' => 'testing body',
        'from' => 'info@emart.com'
    );
    $request = $url.'api/mail.send.json';


// Generate curl request
    $session = curl_init($request);

// Tell curl to use HTTP POST
    curl_setopt ($session, CURLOPT_POST, true);

// Tell curl that this is the body of the POST
    curl_setopt ($session, CURLOPT_POSTFIELDS, $params);

// Tell curl not to return headers, but do return the response
    curl_setopt($session, CURLOPT_HEADER, false);
    curl_setopt($session, CURLOPT_RETURNTRANSFER, true);

// obtain response
    $response = curl_exec($session);
    curl_close($session);

// print everything out
// print_r($response);

    echo true;

}

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
                    emailtoseller($email);
                }
                }
            else{
                error_log("error" . $sql2 . $connection->error);
                echo false;
            }
            $sql3="SELECT emailAddress FROM user WHERE userID = (select bidderID from auction a LEFT JOIN bid b ON a.currentBidID = b.bidID WHERE a.auctionID={$row1['auctionID']})";
            if($result3 = $connection->query($sql3)){
                while ($row2= mysqli_fetch_array($result3)){
                    $email = $row2['emailAddress'];
                    emailtowinner($email);
                }

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
        //echo true;
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



//Send email to seller and winner







dbClose();
ob_end_flush();
?>