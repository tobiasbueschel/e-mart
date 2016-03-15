<?php
require_once("dbConnection.php");
ob_start();

if(isset($_POST)) {
    dbConnect();

    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $email = $request->email;
    $password = $request->password;


    // VALIDATE VALUES
    // TODO: Implement validation function that checks if username and password is according to format

    // PROTECT AGAINST MYSQL INJECTION
    $email = stripslashes($email);
    $password = stripslashes($password);
    session_start();
    $_SESSION['email'] = $email;

    // DATABASE QUERY
    $sql = 'SELECT * FROM user WHERE emailAddress="' . $email . '"';



    if ( $result = $connection->query($sql) ){

        // VALIDATION: ONLY IF ONE ROW RETURNED
        if ($result->num_rows == 1) {

            $data = mysqli_fetch_array($result);

            if ( password_verify($password, $data['password']) ){

                // TODO: check if sessions are necessary
                // STARTS SESSION
                // session_start();
                // $_SESSION['loggedIn'] = true;
                // $_SESSION['firstname'] = $data['firstname'];
                // $_SESSION['lastname'] = $data['lastname'];
                // $_SESSION['email'] = $data['email'];
                // $_SESSION['userID'] = $data['userID'];
                // $_SESSION['userType'] = $data['userType'];
                //return the user information to the front end
                echo json_encode($data);
            }
            else {
                error_log("error1 " . $sql . $connection->error);

                echo false;
                // $_SESSION['loggedIn'] = 'failed';
            }
        }
        else {
            error_log("error2 " . $sql . $connection->error);

            echo false;
            // $_SESSION['loggedIn'] = 'failed';
        }
    }
    else {
        error_log("error3 " . $sql . $connection->error);

        echo false;
        // $_SESSION['loggedIn'] = 'failed';
    }
}

dbClose();
ob_end_flush();
?>