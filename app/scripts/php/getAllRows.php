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
    $tables = $request->tables; //array
    $table_data = []; //declare empty array where pulled data will be stored

    //loop through each table in the tables array
    foreach ($tables as &$table) {
        // DATABASE QUERY
        $current_rows = [];
        $sql = "SELECT * FROM ".$table;
        if ($result = $connection->query($sql) ) {
            //convert the results to an array of rows
            while ($row = mysqli_fetch_array($result)) {
                $current_rows[] = $row; //push each row to current_rows array
            }
            //push the array to our hash map using the table name as the key
        }
        else{
            // logs errors to console
            error_log("error" . $sql . $connection->error);
            echo false;
        }
        $table_data[$table] = $current_rows;
    }
    header('Content-Type: application/json');
    //return JSON encoded object to the front end
    echo json_encode($table_data);
}

else {
    echo "Post is empty";
}

dbClose();
ob_end_flush();
?>