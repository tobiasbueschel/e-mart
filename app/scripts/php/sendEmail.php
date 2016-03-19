<?php

ob_start();
require_once ("dbConnection.php");
dbConnect();

// AZURE SENDGRID AUTHENTICATION
$url = 'https://api.sendgrid.com/';
$user = 'azure_4a08c7d5b58920cfcdd7e5390945734c@azure.com';
$pass = 'emart1234';

// SENDS EMAIL TO USER IF HE/SHE FORGOT THE PASSWORD
function forgotPassword($emailTO) {
    global $user, $pass;

    return $params = array(
            'api_user' => $user,
            'api_key' => $pass,
            'to' => $emailTO,
            'subject' => 'E-Mart: Reset password',
            'html' =>   "<html>
                            <head></head>
                            <body>
                                <p>You have been outbid by another bidder.
                    Please click on the link below to bid agiain:<br>
                                <span><a href=\"www.e-mart.azurewebsites.net\">URL</a></span>
                                </p>
                            </body>
                        </html>",
            'text' => 'testing body',
            'from' => 'info@emart.com'
        );
}


function sendemailtobidder ($emailTO) {
    global $user, $pass;

    return $params = array(
        'api_user' => $user,
        'api_key' => $pass,
        'to' => $emailTO,
        'subject' => 'E-Mart: You have been outbid',
        'html' =>   "<html>
                            <head></head>
                            <body>
                                <p>You have got a bid on your auction.
                    Please click on the link below to check:<br>
                                Visit this <span><a href=\"www.e-mart.azurewebsites.net\">URL</a></span> to reset it.<br>
                                </p>
                            </body>
                        </html>",
        'text' => 'testing body',
        'from' => 'info@emart.com'
    );
}

function sendemailtoauctioneer ($emailTO) {
    global $user, $pass;

    return $params = array(
        'api_user' => $user,
        'api_key' => $pass,
        'to' => $emailTO,
        'subject' => 'E-Mart: You have got a new bid',
        'html' =>   "<html>
                            <head></head>
                            <body>
                                <p>You have got a new bid on your auction.
                              Please click on the link below to check:
                              <span><a href=\"www.e-mart.azurewebsites.net\">URL</a></span>
                                </p>
                            </body>
                        </html>",
        'text' => 'testing body',
        'from' => 'info@emart.com'
    );
}






// EXECUTES PHP SCRIPT AND CHECKS WHICH FUNCTION TO CALL
if(isset($_POST)) {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $emailtype = $request->emailtype;

    switch ( $emailtype ){

        case "sendemailtobidder": {
            $bidderID = $request->bidderID;
            error_log($request->boddierID);
            $sql = "SELECT emailAddress FROM user WHERE userID = $bidderID ";
            if ($result = $connection->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $email = $row['emailAddress'];
                }
                $params = sendemailtobidder($email);
            }
            error_log($request->bidderID);
            error_log($email);
            break;
        }
        case "sendemailtoauctioneer": {
            $acutionID = $request->auctionID;
            error_log($request->auctioneerID);
            $sql = "SELECT emailAddress FROM user JOIN auction ON userID = auctioneerID WHERE auctionID = $acutionID";
            if ($result = $connection->query($sql)) {
                while ($row = $result->fetch_assoc()) {
                    $email = $row['emailAddress'];
                }
                $params = sendemailtoauctioneer($email);
            }

            break;
        }
        case "forgotPassword": {
            $email = $request->email;
            error_log($request->email);
            $params = forgotPassword($email);
            break;
        }


    }
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
else{
    echo false;
}
dbClose();
ob_end_flush();
?>