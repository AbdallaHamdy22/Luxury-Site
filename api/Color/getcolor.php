<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Color.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$sex = new Color($db);
$allSexes = $sex->Get_All_Color_Data();

echo json_encode($allSexes);
?>
