<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a database connection
$database = new Connection();
$db = $database->connect();

$Product = new Products($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data and handle files
    $id = isset($_POST['ProductID']) ? $_POST['ProductID'] : null;
    $name = isset($_POST['Name']) ? $_POST['Name'] : null;
    $description = isset($_POST['Description']) ? $_POST['Description'] : '';
    $price = isset($_POST['Price']) ? $_POST['Price'] : 0;
    $quantity = isset($_POST['Quantity']) ? $_POST['Quantity'] : 0;
    $offerPrice = isset($_POST['OfferPrice']) ? $_POST['OfferPrice'] : 0;
    $brandID = isset($_POST['BrandID']) ? $_POST['BrandID'] : null;
    $categoryID = isset($_POST['CategoireID']) ? $_POST['CategoireID'] : null;
    $colorID = isset($_POST['Color_ID']) ? $_POST['Color_ID'] : null;
    $sexID = isset($_POST['SexID']) ? $_POST['SexID'] : null;
    $UserID = isset($_POST['UserID']) ? $_POST['UserID'] : null;
    $Status = isset($_POST['Status']) ? $_POST['Status'] : null;
    $image = isset($_FILES['Image']) ? $_FILES['Image'] : null;

    if ($id && $name) {
        $Product->setID($id);
        $Product->Get_Product_Data_By_ID($id);
        $Product->setName($name);
        $Product->setDescription($description);
        $Product->setPrice($price);
        $Product->setQuantity($quantity);
        $Product->setOfferPrice($offerPrice);
        $Product->setBrandID($brandID);
        $Product->setCategoryID($categoryID);
        $Product->setColorID($colorID);
        $Product->setSexID($sexID);
        $Product->setStatus($Status);
        $Product->setUserID($UserID);

        if ($image) {
            // Handle the image file
            $target_dir = realpath("../../Images") . '/';
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
                $Product->setImage("Images/" . $image["name"]);
            } else {
                file_put_contents('php://stderr', print_r("Failed to move uploaded file to $target_file\n", TRUE));
                http_response_code(400); // Bad request
                echo json_encode(["status" => "error", "message" => "Unable to upload image."]);
                exit();
            }
        }

        if ($Product->Update_product()) {
            http_response_code(200); // OK
            echo json_encode(["message" => "Product was updated."]);
        } else {
            file_put_contents('php://stderr', print_r("Failed to update product in database\n", TRUE));
            http_response_code(503); // Service unavailable
            echo json_encode(["status" => "error", "message" => "Unable to update product."]);
        }
    } else {
        file_put_contents('php://stderr', print_r("ID or Name is missing\n", TRUE));
        http_response_code(400); // Bad request
        echo json_encode(["status" => "error", "message" => "ID and Name are required."]);
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
