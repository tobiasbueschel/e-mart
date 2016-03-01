<?php
require_once("dbConnection.php");
ob_start();

// STORES INPUT IN DATABASE IF SUBMIT BUTTON PRESSED
if(isset($_POST)) {
    dbConnect();


    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $username = $request->username;
    $firstname = ucfirst($request->firstname);
    $lastname = ucfirst($request->lastname);
    $email = $request->email;
    $password = $request->password;


    // PROTECT AGAINST MYSQL INJECTION
    $firstname = stripslashes($firstname);
    $lastname = stripslashes($lastname);
    $email = stripslashes($email);
    $username = stripslashes($username);
    $password = stripslashes($password);

    // hashes the password using the bcrypt algorithm (default as of PHP 5.5.0)
    $password = password_hash($password, PASSWORD_DEFAULT);

    // stores userType = user
    // TODO: this should be done using the default value field in MYSQL
    $userType = 'user';

    $sql = "INSERT INTO user (userName, firstName, lastName, emailAddress, password, userType)
                VALUES ('$username', '$firstname', '$lastname', '$email', '$password', '$userType')";

    if ($connection->query($sql) == TRUE ){

        // TODO: check if sessions are necessary
        // session_start();
        // $_SESSION["registered"] = TRUE;
        // $_SESSION["email"] = $email;

        // TODO: send email that user has registered
        // include ('email.php');
        // sendRegistrationMail($email, $firstname, $lastname, $activationCode);

        echo true;
    }
    else{
        // logs errors to console
        error_log("error" . $sql . $connection->error);
        echo false;
    }

    dbClose();
}

ob_end_flush();
?>