<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Brand.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$brand = new Brand($db);
$allBrands = $brand->Get_All_Brand_Data();

echo json_encode($allBrands);
?>
