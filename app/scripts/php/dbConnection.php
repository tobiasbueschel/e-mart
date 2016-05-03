<?php

// GLOBAL VARIABLES FOR EMART APPLICATION
$host_name = "YOUR_HOST_NAME";
$database = "YOUR_DB_NAME";
$user_name = "YOUR_USERNAME";
$password = "YOUR_PASSWORD";
$connection = null;

// CONNECT TO THE MYSQL DATABASE
function dbConnect ()
{
    global $host_name, $user_name, $password, $database, $connection;

    $connection = mysqli_connect($host_name, $user_name, $password, $database);

    if (mysqli_connect_errno()) {
        echo "Failed to connect to MySQL: " . mysqli_connect_error();
    }
    else{
        /* change character set to utf8 */
        if (!$connection->set_charset("utf8")) {
            printf("Error loading character set utf8: %s\n", $connection->error);
        }
        else {
            // printf("Current character set: %s\n", $connection->character_set_name());
        }
    }
}

// CLOSE THE MYSQL DATABASE
function dbClose ()
{
    global $connection;

    if (isset($connection)) {
        mysqli_close($connection);
    }
}

?>
