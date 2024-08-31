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

    if (!empty($data->SexID) && !empty($data->Name)) {
        $gender->setID($data->SexID);
        $gender->setName($data->Name);

        if ($gender->Update_Sex()) {
            http_response_code(200); // OK
            echo json_encode(array("message" => "Gender was updated."));
        } else {
            http_response_code(503); // Service unavailable
            echo json_encode(array("message" => "Unable to update gender."));
        }
    } else {
        http_response_code(400); // Bad request
        echo json_encode(array("message" => "Unable to update gender. Data is incomplete."));
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
?>
