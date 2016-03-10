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
    $category=$request->category;
    $condition = $request->condition;

    //TEMP TO TEST INSERTION
    $ownerID = 1; //tobias
    $isSold = 0;

    // DATABASE QUERY
    $sql = "INSERT INTO item (name, description,categoryID, conditionID, ownerID,isSold)
            VALUES ('$name','$description', $category, $condition, $ownerID,$isSold)";

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