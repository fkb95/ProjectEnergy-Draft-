<?php
$name = ucfirst($_POST["name"]);
$desc = $_POST["desc"];
$website = $_POST["webs"];
if(is_null($name) or is_null($desc) or is_null($website)){
    echo "no data";
}else{
    require_once('connection.php');
    mysql_connect($host,$username,$password)or die("cannot connect"); 
    mysql_select_db($db_name)or die("cannot select DB");
    $sql = "CALL insertBrand('$name','$desc','$website')";
    $query = mysql_query($sql) or die ("Query failed :".mysql_error());
    mysql_close();
    echo "ok";
}
?>