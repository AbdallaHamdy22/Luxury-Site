<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Sex.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$Sex = new Sex($db);

// Get the page and limit parameters from the query string
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$start = ($page - 1) * $limit;

// Get the total number of categories
$totalGenders = $Sex->Get_Total_Gender_Count();

// Get the categories for the current page
$Genders = $Sex->Get_Gender_Data_With_Pagination($start, $limit);
// print_r($products);
echo json_encode(array(
    "total" => $totalGenders,
    "data" => $Genders
));
?>
