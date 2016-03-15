<?php
require_once("dbConnection.php");
ob_start();
dbConnect();

$sql = "SELECT * FROM auction";
$result=$connection->query($sql);
if ($result== TRUE ){
    $data = mysqli_fetch_array($result);

    echo $data;
}
else{
    // logs errors to console
    error_log("error" . $sql . $connection->error);
    echo false;
}

dbClose();
ob_end_flush();
?>
