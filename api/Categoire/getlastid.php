<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Categoire.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$category = new Categoire($db);

$lastID = $category->GetLastID();

echo json_encode(array("LastID" => $lastID));
?>
