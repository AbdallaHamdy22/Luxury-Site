<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

// Create an instance of the Products class
$products = new Products($db);

// Fetch the latest 4 products
$latestProducts = $products->Get_Latest_Products();

// Format the data to match the required structure
$formattedProducts = array_map(function($product) {
    return [
        'name' => $product['Name'],
        'description' => $product['Description'],
        'price' => $product['Price'] . ' AED',
        'link' => "/ItemDetails/" . $product['ProductID'],
        'img' => $product['Image'] 
        // ''
    ];
}, $latestProducts);

echo json_encode($formattedProducts);
?>
