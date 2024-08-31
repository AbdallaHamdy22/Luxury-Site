<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Categoire.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$category = new Categoire($db);

// Get the page and limit parameters from the query string
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$start = ($page - 1) * $limit;

// Get the total number of categories
$totalCategories = $category->Get_Total_Categories_Count();

// Get the categories for the current page
$categories = $category->Get_Categoire_Data_With_Pagination($start, $limit);

echo json_encode(array(
    "total" => $totalCategories,
    "data" => $categories
));
?>
