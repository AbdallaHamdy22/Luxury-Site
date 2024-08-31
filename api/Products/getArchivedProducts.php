<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Products.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$product = new Products($db);

$query = "SELECT * FROM Products";
$stmt = $db->prepare($query);
$stmt->execute();

$products = $stmt->fetchAll(PDO::FETCH_ASSOC);

$archivedProducts = [];

foreach ($products as $product) {
    $productionDate = new DateTime($product['ProductionYear']);
    $currentDate = new DateTime();
    $interval = $currentDate->diff($productionDate);

    if ($interval->days > 30) {
        $archivedProducts[] = $product;
    }
}

echo json_encode($archivedProducts);
