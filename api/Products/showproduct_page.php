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

$product = new Products($db);

// Get the page and limit parameters from the query string
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$start = ($page - 1) * $limit;

// Get the total number of products
$totalproducts = $product->Get_Total_Product_Count();

// Get the products for the current page
$productsData = $product->Get_Product_Data_With_Pagination($start, $limit);

// Process images
foreach ($productsData as &$product) {
    if (isset($product['Image']) && !empty($product['Image'])) {
        // Split the image string into an array
        $product['Image'] = explode(',', $product['Image']);
    }
}

// Output the data as JSON
echo json_encode(array(
    "total" => $totalproducts,
    "data" => $productsData
));
