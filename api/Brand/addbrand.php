<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Brand.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a database connection
$database = new Connection();
$db = $database->connect();

$Brand = new Brand($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data and handle files
    $name = isset($_POST['Name']) ? $_POST['Name'] : null;
    $image = isset($_FILES['Image']) ? $_FILES['Image'] : null;

    // For debugging: print the current directory
    $current_dir = __DIR__;
    file_put_contents('php://stderr', print_r("Current directory: " . $current_dir . "\n", TRUE));

    // For debugging
    file_put_contents('php://stderr', print_r("Received Name: $name, Image: " . print_r($image, true) . "\n", TRUE));

    if ($name && $image) {
        $Brand->setName($name);

        // Handle the image file
        $target_dir = realpath("../../Images") . '/'; // Using realpath to get the absolute path
        $target_file = $target_dir . basename($image["name"]);

        // Check for file upload errors
        if ($image["error"] !== UPLOAD_ERR_OK) {
            file_put_contents('php://stderr', print_r("File upload error: " . $image["error"] . "\n", TRUE));
            http_response_code(400); // Bad request
            echo json_encode(["status" => "error", "message" => "File upload error: " . $image["error"]]);
            exit();
        }

        // Check for directory permissions
        if (!is_writable($target_dir)) {
            file_put_contents('php://stderr', print_r("Directory is not writable: $target_dir\n", TRUE));
            http_response_code(400); // Bad request
            echo json_encode(["status" => "error", "message" => "Directory is not writable: $target_dir"]);
            exit();
        }

        // Debugging: Check file move operation
        if (move_uploaded_file($image["tmp_name"], $target_file)) {
            file_put_contents('php://stderr', print_r("File uploaded successfully to $target_file\n", TRUE));
            $Brand->setImage("Images/" . $image["name"]);

            // Set the ID
            $Brand->setID($Brand->GetLastID() + 1);

            // Create the category
            if ($Brand->Create_Brand()) {

                http_response_code(201); // Created
                echo json_encode(["message" => "Category was created."]);
            } else {
                file_put_contents('php://stderr', print_r("Failed to create category in database\n", TRUE));
                http_response_code(503); // Service unavailable
                echo json_encode(["status" => "error", "message" => "Unable to create category."]);
            }
        } else {
            file_put_contents('php://stderr', print_r("Failed to move uploaded file to $target_file\n", TRUE));
            http_response_code(400); // Bad request
            echo json_encode(["status" => "error", "message" => "Unable to upload image."]);
        }
    } else {
        file_put_contents('php://stderr', print_r("Name or image is missing\n", TRUE));
        http_response_code(400); // Bad request
        echo json_encode(["status" => "error", "message" => "Name and image are required."]);
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
