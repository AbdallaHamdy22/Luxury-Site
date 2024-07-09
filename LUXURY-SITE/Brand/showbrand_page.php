<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Brand.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$Brand = new Brand($db);

// Get the page and limit parameters from the query string
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$start = ($page - 1) * $limit;

// Get the total number of categories
$totalBrand = $Brand->Get_Total_Brands_Count();

// Get the categories for the current page
$Brands = $Brand->Get_Brand_Data_With_Pagination($start, $limit);

echo json_encode(array(
    "total" => $totalBrand,
    "data" => $Brands
));
?>
