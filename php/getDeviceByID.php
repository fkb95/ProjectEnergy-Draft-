<?php
$deviceid = $_POST["deviceid"];
if(is_null($deviceid)){
    echo "no data";
}else{
    require_once('connection.php');
    mysql_connect($host,$username,$password)or die("cannot connect"); 
    mysql_select_db($db_name)or die("cannot select DB");
    $sql = "CALL getDevicesByID($deviceid)";
    $query = mysql_query($sql) or die ("Query failed".mysql_error());
    mysql_close();
    $res = array();
    while($row =  mysql_fetch_assoc($query)){
            $res[] = $row;
    }
    echo json_encode($res);
}
?>