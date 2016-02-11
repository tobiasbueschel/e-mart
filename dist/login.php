<?php
// check username or password from database
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$email = $request->email;
$password = $request->password;
if($email == "one" && $password== "one"){
    echo "1";
}
else {
    echo "0";
}

?>