<?php
/**
 * Created by PhpStorm.
 * User: kimeshan
 * Date: 07/03/2016
 * Time: 02:46
 */
require_once("dbConnection.php");
ob_start();

if(isset($_POST)) {
    dbConnect();
    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);

    $current_rows = [];
    // DATABASE QUERY
    $sql = $request->sql;
    if ($result = $connection->query($sql) ) {
        echo true;
    }
    else{
        // logs errors to console
        error_log("error" . $sql . $connection->error);
        echo $connection->error;
    }
}

else {
    echo "Post is empty";
}

dbClose();
ob_end_flush();