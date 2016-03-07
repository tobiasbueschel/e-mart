<?php
/**
 * Created by PhpStorm.
 * User: kimeshan
 * Date: 07/03/2016
 * Time: 02:46
 */
require_once("dbConnection.php");
ob_start();

if(!empty($_POST)) {
    dbConnect();
    // STORE POSTED VALUES IN VARIABLES
    $postdata = file_get_contents("php://input");
    $request = json_decode($postdata);
    $name = $request->itemname;
    $description = $request->description;
    $condition = $request->condition;
    $category=$request->category;

    //TEMP TO TEST INSERTION
    $condition = 2; //good
    $category = 31; //shoes
    $ownerID = 1; //tobias
    $isSold = 0;

    // DATABASE QUERY

    //$sql = 'SELECT * FROM user WHERE emailAddress="' . $email . '"';
    $sql = "INSERT INTO item (name, description,categoryID,ownerID,isSold)
            VALUES ('$name','$description', $category,$ownerID,$isSold)";

    if ($connection->query($sql) == TRUE ){
        echo true;
    }
    else{
        // logs errors to console
        error_log("error" . $sql . $connection->error);
        echo false;
    }
}

else {
    echo "Post is empty";
}

dbClose();
ob_end_flush();
?>