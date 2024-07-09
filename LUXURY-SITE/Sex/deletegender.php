<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a database connection
$database = new Connection();
$db = $database->connect();

$gender = new Sex($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->SexID)) {
        $gender->setID($data->SexID);

        if ($gender->Delete_Sex()) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "Gender was deleted."));
        } else {
            http_response_code(503); // Service unavailable
            echo json_encode(array("message" => "Unable to delete gender."));
        }
    } else {
        http_response_code(400); // Bad request
        echo json_encode(array("message" => "Unable to delete gender. Data is incomplete."));
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
?>
