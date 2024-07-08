<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Categoire.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$categories = new Categoire($db);
$allCategories = $categories->Get_All_Categoire_Data();

echo json_encode($allCategories);
