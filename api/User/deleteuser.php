<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_User.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$database = new Connection();
$db = $database->connect();

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->UserID)) {
    $UserID = $data->UserID;

    $user = new User($db);
    $user->setID($UserID);

    if ($user->deleteuser()) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "User deleted successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["status" => "error", "message" => "Unable to delete the user."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "UserID is required."]);
}
