<?php
/**
 * Created by PhpStorm.
 * User: kimeshan
 */
require_once("dbConnection.php");
ob_start();

if(isset($_POST)) {
    dbConnect();
    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $itemID = $request -> itemID;
    //get array of images
    $images = $request -> images;

    // DATABASE QUERY
    foreach ($images as $img) {
        $sql = "INSERT INTO image (image, itemID)
            VALUES ('$img', $itemID)";

        if ($connection->query($sql) == TRUE ){
                continue;
        }
        else{
            // logs errors to console
            error_log("error" . $sql . $connection->error);
            echo false;
        }
    }
    echo true;
}

else {
    echo "Post is empty";
}

dbClose();
ob_end_flush();