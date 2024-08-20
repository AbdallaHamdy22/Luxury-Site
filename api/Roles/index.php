<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Role.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$role = new Role($db);
$allroles = $role->Get_Role_Data(); // استخدام المتغير الصحيح

if ($allroles !== null) {
    echo json_encode($allroles);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to fetch role data."]);
}

?>