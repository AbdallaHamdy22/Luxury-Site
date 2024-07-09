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

$product = new Products($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data and handle files
    $name = isset($_POST['Name']) ? $_POST['Name'] : null;
    $description = isset($_POST['Description']) ? $_POST['Description'] : '';
    $productionYear = isset($_POST['ProductionYear']) ? $_POST['ProductionYear'] : null;
    $braceletMaterial = isset($_POST['BraceletMaterial']) ? $_POST['BraceletMaterial'] : '';
    $price = isset($_POST['Price']) ? $_POST['Price'] : 0;
    $quantity = isset($_POST['Quantity']) ? $_POST['Quantity'] : 0;
    $offerPrice = isset($_POST['OfferPrice']) ? $_POST['OfferPrice'] : 0;
    $brandID = isset($_POST['BrandID']) ? $_POST['BrandID'] : null;
    $categoryID = isset($_POST['CategoireID']) ? $_POST['CategoireID'] : null;
    $colorID = isset($_POST['Color_ID']) ? $_POST['Color_ID'] : null;
    $sexID = isset($_POST['SexID']) ? $_POST['SexID'] : null;
    $image = isset($_FILES['Image']) ? $_FILES['Image'] : null;

    // For debugging: print the current directory
    $current_dir = __DIR__;
    file_put_contents('php://stderr', print_r("Current directory: " . $current_dir . "\n", TRUE));

    // For debugging
    file_put_contents('php://stderr', print_r("Received Name: $name, Image: " . print_r($image, true) . "\n", TRUE));

    if ($name && $image) {        
        $product->setName($name);
        $product->setDescription($description);
        $product->setProduction_year($productionYear);
        $product->setBracelet_Material($braceletMaterial);
        $product->setPrice($price);
        $product->setQuantity($quantity);
        $product->setOfferPrice($offerPrice);
        $product->setBrandID($brandID);
        $product->setCategoryID($categoryID);
        $product->setColorID($colorID);
        $product->setSexID($sexID);
       
        // Handle the image file
        $target_dir = realpath("D:/Luxury-Site/public/Images") . '/'; // Using realpath to get the absolute path
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
            $product->setImage("/Images/".$image["name"]);

            // Set the ID
            $product->setID($product->GetLastID() + 1);
            
            // Create the product
            if ($product->Create_Product()) {
                http_response_code(201); // Created
                echo json_encode(["message" => "Product was created."]);
            } else {
                file_put_contents('php://stderr', print_r("Failed to create product in database\n", TRUE));
                http_response_code(503); // Service unavailable
                echo json_encode(["status" => "error", "message" => "Unable to create product."]);
            }
        } else {
            file_put_contents('php://stderr', print_r("Failed to move uploaded file to $target_file\n", TRUE));
            http_response_code(400); // Bad request
            echo json_encode(["status" => "error", "message" => "Unable to upload image."]);
        }
    } else {
        // file_put_contents('php://stderr', print_r("Name or image is missing\n", TRUE));
        // http_response_code(400); // Bad request
        // echo json_encode(["status" => "error", "message" => "Name and image are required."]);
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
?>
