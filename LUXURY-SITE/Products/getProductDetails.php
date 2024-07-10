<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");



// Create a database connection
$database = new Connection();
$db = $database->connect();

// Create an instance of the Products class
$product = new Products($db);
// Get the product ID from the request
$productID = isset($_GET['ProductID']) ? intval($_GET['ProductID']) : 0;

if ($productID > 0) {
    // Fetch the product data by ID
    $productData = $product->Get_Product_Data_By_ID($productID);
    // print_r($productData);

    if ($productData) {
        echo json_encode($productData);
    } else {
        echo json_encode(["message" => "Product not found."]);
    }
} else {
    echo json_encode(["message" => "Invalid product ID."]);
}
?>
