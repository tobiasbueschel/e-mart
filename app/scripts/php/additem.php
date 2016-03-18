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
    $ownerID = $request->ownerID; //tobias
    $isSold = 0; //starting value

    // DATABASE QUERY
    $sql = "INSERT INTO item (name, description,categoryID, conditionID, ownerID,isSold)
            VALUES ('$name','$description', $category, $condition, $ownerID,$isSold)";

    if ($connection->query($sql) == TRUE ){
        $getInsertedRow = "SELECT LAST_INSERT_ID()";

        if ($result = $connection->query($getInsertedRow)) {
            $row = mysqli_fetch_array($result);
            echo json_encode($row);
        }

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