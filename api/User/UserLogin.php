<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_User.php';
require_once '../Roles/Class_Role.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');
session_start();

// Read the raw POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

$email = isset($data['Email']) ? $data['Email'] : null;
$password = isset($data['Password']) ? $data['Password'] : null;
// For debugging
file_put_contents('php://stderr', print_r("Received Email: $email, Password: $password\n", TRUE));

if ($email && $password) {
    try {
        $database = new Connection();
        $db = $database->connect();
        $user = new User($db);

        if ($user->Verify_User($email, $password)) {
            $userData = $user->Get_User_Data_By_Email($email);
            $_SESSION['user'] = $user->Display_User_Data();
            echo json_encode($_SESSION['user']);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid email or password"]);
        }
    } catch (Exception $e) {
        file_put_contents('php://stderr', print_r("Error: " . $e->getMessage() . "\n", TRUE));
        echo json_encode(["status" => "error", "message" => $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Email and password are required"]);
}
