<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_User.php';
require_once '../Roles/Class_Role.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$user = new User($db);

// Get the page and limit parameters from the query string
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$limit = isset($_GET['limit']) ? intval($_GET['limit']) : 10;
$start = ($page - 1) * $limit;

// Get the total number of categories
$totalusers = $user->Get_Total_User_Count();

// Get the categories for the current page
$users = $user->Get_User_Data_With_Pagination($start, $limit);

echo json_encode(array(
    "total" => $totalusers,
    "data" => $users
));
?>
