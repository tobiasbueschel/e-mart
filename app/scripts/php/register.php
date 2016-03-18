<?php
require_once("dbConnection.php");
ob_start();
dbConnect();


// STORES INPUT IN DATABASE IF SUBMIT BUTTON PRESSED
if(isset($_POST)) {

    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $username = $request->username;
    $firstname = ucfirst($request->firstname);
    $lastname = ucfirst($request->lastname);
    $email = $request->email;
    $username = $request->username;
    $password = $request->password;
    $address = $request->address;
    $city = $request->city;
    $postalcode = $request->postalcode;
    $country = $request->country;
    $telephoneNumber = $request->telephoneNumber;
    $usertype = $request->usertype;
    $twUsername = $request->twUsername;
    $twProfileImage = $request->twProfileImage;

    // PROTECT AGAINST MYSQL INJECTION
    $firstname = stripslashes($firstname);
    $lastname = stripslashes($lastname);
    $email = stripslashes($email);
    $username = stripslashes($username);
    $password = stripslashes($password);
    $address = stripslashes($address);
    $city = stripslashes($city);
    $postalcode = stripslashes($postalcode);
    $country = stripslashes($country);
    $telephoneNumber = stripslashes($telephoneNumber);
    $usertype = stripslashes($usertype);
    $twUsername = stripslashes($twUsername);
    $twProfileImage = stripslashes($twProfileImage);

    // hashes the password using the bcrypt algorithm (default as of PHP 5.5.0)
    $password = password_hash($password, PASSWORD_DEFAULT);

    // TODO: add date registered to users table and to sql query

    $sql = "INSERT INTO user (userName, firstName, lastName, emailAddress, password, address, city, postalCode, country, telephoneNumber, userType, dateRegistered, twUsername, twProfileImage)
                VALUES ('$username', '$firstname', '$lastname', '$email', '$password', '$address', '$city', '$postalcode', '$country', '$telephoneNumber', '$usertype', CURRENT_TIMESTAMP, '$twUsername', '$twProfileImage')";

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

}

dbClose();
ob_end_flush();
?>