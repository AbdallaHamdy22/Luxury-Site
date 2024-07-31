<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a database connection
$database = new Connection();
$db = $database->connect();

$product = new Products($db);

if ($_SERVER["REQUEST_METHOD"] == "POST" || $_SERVER["REQUEST_METHOD"] == "DELETE") {
    // Read the raw POST data
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $id = isset($data['ProductID']) ? $data['ProductID'] : null;

    if ($id) {

        $product->setID($id);

        if ($product->Delete_Product()) {
            http_response_code(200); // OK
            echo json_encode(["message" => "Product was deleted."]);
        } else {
            file_put_contents('php://stderr', print_r("Failed to delete product in database\n", TRUE));
            http_response_code(503); // Service unavailable
            echo json_encode(["status" => "error", "message" => "Unable to delete product."]);
        }
    } else {
        file_put_contents('php://stderr', print_r("ProductID is missing\n", TRUE));
        http_response_code(400); // Bad request
        echo json_encode(["status" => "error", "message" => "ProductID is required."]);
    }
} else {
    echo json_encode(["message" => "Invalid request method."]);
}
