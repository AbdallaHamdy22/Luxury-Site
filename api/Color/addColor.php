<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Color.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a database connection
$database = new Connection();
$db = $database->connect();

$color = new Color($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->Name)) {
        $color->setName($data->Name);


        // For debugging: print the received data
        file_put_contents('php://stderr', print_r($color, true));

        if ($color->Create_Color()) {
            http_response_code(201); // Created
            echo json_encode(array("message" => "color was created."));
        } else {
            http_response_code(503); // Service unavailable
            echo json_encode(array("message" => "Unable to create color."));
        }
    } else {
        http_response_code(400); // Bad request
        echo json_encode(array("message" => "Unable to create color. Data is incomplete."));
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
