<?php
require_once ("dbConnection.php");
ob_start();
dbConnect();


// Always set content-type when sending HTML email
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: <emart.noreply@gmail.com>' . "\r\n";


function emailtobuyer($emailTO) {
    global $headers;

    $message =  '<html>
                    <h3>Hi</h3>
                    <br>
                    You have been outbid by another bidder.
                    Please click on the link below to bid agiain:
                    <br><br>
                    http://www.e-mart.azurewebsites.net/
                    <br>
                </html>';
    mail($emailTO, 'E-Mart: You have been outbid', $message, $headers);
    echo true;
}

if(isset($_POST)) {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $bidderID = $request->bidderID;
    $sql1 = "SELECT emailAddress FROM user WHERE userID = $bidderID ";
    if ($result = $connection->query($sql1)) {
        while ($row = $result->fetch_assoc()) {
            $email = $row['emailAddress'];
        }
        emailtobuyer($email);
    }
    error_log($request->bidderID);
    error_log($email);



}
else{
    echo false;
}

dbClose();
ob_end_flush();

?>