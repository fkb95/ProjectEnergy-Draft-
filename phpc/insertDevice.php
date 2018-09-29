<?php
$name = $_POST["name"];
$desc = $_POST["desc"];
$brand = $_POST["brand"];
$category = $_POST["category"];
$minwatt = $_POST["minwatt"];
$maxwatt = $_POST["maxwatt"];
$khw = $_POST["khw"];
$volts = $_POST["volts"];
$ampere = $_POST["ampere"];
$resistence = $_POST["resistence"];
if(is_null($name) or is_null($desc) or is_null($brand) or is_null($category) or is_null($minwatt) or is_null($maxwatt) or is_null($khw) or is_null($volts) or is_null($ampere) or is_null($resistence)){
    echo "no data";
}else{
    require_once('connection.php');
    mysql_connect($host,$username,$password)or die("cannot connect"); 
    mysql_select_db($db_name)or die("cannot select DB");
    $sql = "CALL insertDevice('$name','$desc',$brand,$category,$minwatt,$maxwatt,$khw,$volts,$ampere,$resistence)";
    $query = mysql_query($sql) or die ("Query failed :".mysql_error());
    mysql_close();
    echo "ok";
}
?>