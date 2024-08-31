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
    $image = isset($_FILES['Image']) ? $_FILES['Image'] : null;

    $product->setName($name);
    $product->setDescription($description);
    $product->setProduction_year(date('Y-m-d'));
    $product->setPrice($price);
    $product->setQuantity($quantity);
    $product->setOfferPrice($offerPrice);
    $product->setBrandID($brandID);
    $product->setCategoryID($categoryID);
    $product->setColorID($colorID);
    $product->setSexID($sexID);
    $product->setUserID($UserID);

    // Set the status based on quantity and offer price
    if ($quantity > 0) {
        if ($offerPrice > 0) {
            $product->setStatus('OnSale');
        } else {
            $product->setStatus('Available');
        }
    } else {
        $product->setStatus('SoldOut');
    }

    $target_dir = realpath("../../Images") . '/';
    $target_file = $target_dir . basename($image["name"]);

    if ($image["error"] !== UPLOAD_ERR_OK) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "File upload error: " . $image["error"]]);
        exit();
    }

    if (!is_writable($target_dir)) {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Directory is not writable: $target_dir"]);
        exit();
    }

    if (move_uploaded_file($image["tmp_name"], $target_file)) {
        $product->setImage("/Images/" . $image["name"]);
        $product->setID($product->GetLastID() + 1);

        if ($product->Create_Product()) {
            http_response_code(201);
            echo json_encode(["message" => "Product was created."]);
        } else {
            http_response_code(503);
            echo json_encode(["status" => "error", "message" => "Unable to create product."]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["status" => "error", "message" => "Unable to upload image."]);
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
