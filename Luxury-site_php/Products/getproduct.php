<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Products.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$product = new Products($db);
$allProducts = $product->Get_All_Product_Data(); // Assuming you have this method to get all products

echo json_encode($allProducts);
?>
