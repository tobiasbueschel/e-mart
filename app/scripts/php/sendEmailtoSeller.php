<?php
require_once ("dbConnection.php");
ob_start();
dbConnect();


// Always set content-type when sending HTML email
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: <info@e-mart.azurewebsites.net>' . "\r\n";


function emailtoseller($emailTO) {
    global $headers;

    $message =  '<html>
                    <h3>Hi</h3>
                    <br>
                    You have got a bid on your auction.
                    Please click on the link below to check:
                    <br><br>
                    http://www.e-mart.azurewebsites.net/
                    <br>
                </html>';
    mail($emailTO, 'E-Mart: You have got a bid', $message, $headers);
    echo true;
}

if(isset($_POST)) {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $acutionID = $request->auctionID;
    $sql = "SELECT emailAddress FROM user WHERE userID=$acutionID";

    if ($result = $connection->query($sql)) {
        while ($row = $result->fetch_assoc()) {
            $email = $row['emailAddress'];
        }
        emailtoseller($email);
    }
    error_log($request->auctionID);
    error_log($email);



}
else{
    echo false;
}

dbClose();
ob_end_flush();

?>