<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_User.php';
require_once '../Roles/Class_Role.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db = new Connection();
$connection = $db->connect();
$user = new User($connection);


$userID = isset($_GET['userID']) ? intval($_GET['userID']) : 1;

$userData = $user->Get_User_Data_By_ID($userID);

if ($userData) {
    $response = [
        'status' => 'success',
        'user' => $userData
    ];
} else {
    $response = [
        'status' => 'error',
        'message' => 'Failed to fetch user details'
    ];
}

http_response_code(200);
header('Content-Type: application/json');
echo json_encode($response);
