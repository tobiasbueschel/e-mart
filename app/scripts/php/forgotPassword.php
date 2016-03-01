<?php

ob_start();
require_once ("dbConnection.php");

// Always set content-type when sending HTML email
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=utf-8' . "\r\n";
$headers .= 'From: <info@e-mart.azurewebsites.net>' . "\r\n";


// TODO: create a new table in MYSQL TO STORE EMAIL TEMPLATES IN DATABASE

//function sendRegistrationMail($emailTO, $firstName, $lastName, $activationCode) {
//    global $headers;
//
//    $message =  '<html>
//                    <h3> Hi ' . $firstName . ' ' . $lastName . ', </h3>
//                    <br>
//                    Thanks for creating your <strong>E-Mart account!</strong>
//                    <br><br>
//                    As part of our signup process, we need to confirm your email address.
//                    Please click the link below:
//                    <br>
//                    <a href="www.emosurgery.com/login.php?email=' . $emailTO . '&key=' . $activationCode . '">
//                    Confirm your account</a>
//                </html>';
//    mail($emailTO, 'EMOS Confirm Account', $message, $headers);
//}

function DeletionMail($emailTO, $firstName, $lastName) {
    global $headers;

    $message =  '<html>
                    <h3> Hi ' . $firstName . ' ' . $lastName . ', </h3>
                    <br>
                    You have succesfully deleted your account!
                    <br><br>
                    Thank you for using E-Mart! We would love to hear why you decided to delete your account.
                    You can leave us some feedback here: www.e-mart.azurewebsites.net/feedback
                    <br>
                </html>';
    mail($emailTO, 'E-Mart Delete Account', $message, $headers);
}

function forgotPassword($emailTO) {
    global $headers;

    $message =  '<html>
                    <h3>Hi</h3>
                    <br>
                    Please click on the link below to reset your password:
                    <br><br>
                    http://www.e-mart.azurewebsites.net/
                    <br>
                </html>';
    mail($emailTO, 'E-Mart Forgot Password', $message, $headers);
    echo true;
}

if(isset($_POST)) {
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $email = $request->email;

    error_log($request->email);
    error_log($email);


    forgotPassword($email);
}
else{
    echo false;
}


ob_end_flush();

?>