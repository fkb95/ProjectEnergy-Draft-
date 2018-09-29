<?php
$deviceid = $_POST["deviceid"];
if(is_null($deviceid)){
    echo "no data";
}else{
    require_once('connection.php');
    mysql_connect($host,$username,$password)or die("cannot connect"); 
    mysql_select_db($db_name)or die("cannot select DB");
    $sql = "DELETE FROM device WHERE DeviceID = $deviceid";
    $query = mysql_query($sql) or die ("Query failed".mysql_error());
    mysql_close();
    echo "ok";
}
?>