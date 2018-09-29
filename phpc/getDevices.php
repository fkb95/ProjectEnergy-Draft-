<?php
require_once('connection.php');
$last = $_GET["last"];
mysql_connect($host,$username,$password)or die("cannot connect"); 
mysql_select_db($db_name)or die("cannot select DB");
$sql = "CALL getDevices($last)";
$query = mysql_query($sql) or die ("Query failed".mysql_error());
mysql_close();
$res = array();
while($row =  mysql_fetch_assoc($query)){
        $res[] = $row;
}
echo json_encode($res);
?>