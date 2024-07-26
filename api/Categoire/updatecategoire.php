<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Categoire.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a database connection
$database = new Connection();
$db = $database->connect();

$category = new Categoire($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data and handle files
    $id = isset($_POST['CategoireID']) ? $_POST['CategoireID'] : null;
    $name = isset($_POST['Name']) ? $_POST['Name'] : null;
    $image = isset($_FILES['Image']) ? $_FILES['Image'] : null;

    // For debugging: print the current directory
    file_put_contents('php://stderr', print_r("Current directory: " . __DIR__ . "\n", TRUE));

    // For debugging
    file_put_contents('php://stderr', print_r("Received ID: $id, Name: $name, Image: " . print_r($image, true) . "\n", TRUE));

    if ($id && $name) {
        $category->setID($id);
        $category->Get_Categoire_Data_By_ID($category->getID());
        $category->setName($name);
        if ($image) {
            // Handle the image file
            $target_dir = realpath("../../public/Images") . '/';
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

            // Move the uploaded file
            if (move_uploaded_file($image["tmp_name"], $target_file)) {
                file_put_contents('php://stderr', print_r("File uploaded successfully to $target_file\n", TRUE));
                $category->setImage("/Images/" . $image["name"]);

                // Update the category

            } else {
                file_put_contents('php://stderr', print_r("Failed to move uploaded file to $target_file\n", TRUE));
                http_response_code(400); // Bad request
                echo json_encode(["status" => "error", "message" => "Unable to upload image."]);
            }
        }
        if ($category->Update_Categoire()) {
            http_response_code(200); // OK
            echo json_encode(["message" => "Category was updated."]);
        } else {
            file_put_contents('php://stderr', print_r("Failed to update category in database\n", TRUE));
            http_response_code(503); // Service unavailable
            echo json_encode(["status" => "error", "message" => "Unable to update category."]);
        }
    } else {
        file_put_contents('php://stderr', print_r("ID, Name, or image is missing\n", TRUE));
        http_response_code(400); // Bad request
        echo json_encode(["status" => "error", "message" => "ID, Name, and image are required."]);
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
