<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_User.php';
require_once '../Roles/Class_Role.php';
header("Access-Control-Allow-Origin: http://localhost:3000"); 
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
session_start();

$email = isset($_POST['Email']) ? $_POST['Email'] : null;
$password = isset($_POST['Password']) ? $_POST['Password'] : null;

file_put_contents('php://stderr', print_r("Received Email: $email, Password: $password\n", TRUE));
// print_r($_SESSION);
if ($email && $password) {
    try {
        $database = new Connection();
        $db = $database->connect();
        $user = new User($db);

        if ($user->Verify_User($email, $password)) {
            $userData = $user->Get_User_Data_By_Email($email);
            if ($userData) {
                unset($userData['Password']);
                $_SESSION['user'] = $userData; 
                file_put_contents('php://stderr', print_r("User Data stored in session: " . json_encode($_SESSION['user']) . "\n", TRUE));
                echo json_encode(["status" => "success", "user" => $userData]);
            } else {
                echo json_encode(["status" => "error", "message" => "User data not found"]);
            }
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
?>
