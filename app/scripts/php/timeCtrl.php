<?php
/**
 * Created by PhpStorm.
 * User: Johnnie
 * Date: 16/03/2016
 * Time: 17:18
 */
$sql = "UPDATE auction SET isActive=0 WHERE endDate < curDate()";
?>