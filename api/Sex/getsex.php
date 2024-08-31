<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$sex = new Sex($db);
$allSexes = $sex->Get_All_Sex_Data();

echo json_encode($allSexes);
?>
