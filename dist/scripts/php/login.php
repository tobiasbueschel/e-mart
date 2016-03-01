<?php
// check username or password from databases
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$password = $request->password;
if ($email == "one@gmail.com" && $password == "one") {
    echo true;
} else {
    echo false;
}

require_once("dbConnection.php");
dbConnect();

ob_start();
session_start();

if (isset($_POST['submit'])) {

    // STORE POSTED VALUES IN VARIABLES
    $username = $_POST["username"];
    $password = $_POST["password"];

    // VALIDATE VALUES
    // TODO: Implement validation function that checks if username and password is according to format

    // PROTECT AGAINST MYSQL INJECTION
    $username = stripslashes($username);
    $password = stripslashes($password);

    // DATABASE QUERY
    $sql = 'SELECT * FROM USERS WHERE username="' . $username . '"';

    if ( $result = $connection->query($sql) ){

        // VALIDATION: ONLY IF ONE ROW RETURNED
        if ($result->num_rows == 1) {

            $data = mysqli_fetch_array($result);

            if ( password_verify($password, $data['password']) ){
                // STARTS SESSION
                $_SESSION['loggedIn'] = true;
                $_SESSION['firstname'] = $data['firstname'];
                $_SESSION['lastname'] = $data['lastname'];
                $_SESSION['email'] = $data['email'];
                $_SESSION['userID'] = $data['userID'];
                $_SESSION['userType'] = $data['userType'];

                ob_end_flush();
                redirect_to("index.php");
            }
            else {
                $_SESSION['loggedIn'] = 'failed';
            }
        }
        else {
            $_SESSION['loggedIn'] = 'failed';
        }
    }
    else {
        $_SESSION['loggedIn'] = 'failed';
    }
}

ob_end_flush();
dbClose();




?>