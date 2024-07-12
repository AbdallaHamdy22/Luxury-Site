<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Brand.php';
require_once '../Products/Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST, DELETE, OPTIONS");
// header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a database connection
$database = new Connection();
$db = $database->connect();

$Brand = new Brand($db);
$product=new Products($db);

// if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data and handle files
    // $data = json_decode(file_get_contents("php://input"), true);
    $id = 8;

    // For debugging
    file_put_contents('php://stderr', print_r("Received ID: $id\n", TRUE));

    if ($id) {
        $Brand->setID($id);
        if ($product->checkProductsByBrandID($Brand->getID())) {            
            if ($Brand->Delete_Brand()) {
                http_response_code(200); // OK
                echo json_encode(["status"=> "success","message" => "brand was deleted."]);
            } else {
                file_put_contents('php://stderr', print_r("Failed to delete brand from database\n", TRUE));
                http_response_code(503); // Service unavailable
                echo json_encode(["status" => "error", "message" => "Unable to delete brand."]);
            }
        }
        else {  
            http_response_code(400); 
            echo json_encode(["status" => "error", "message" => "Cannot delete this brand as it is associated with existing products."]);
        }

    } else {
        file_put_contents('php://stderr', print_r("ID is missing\n", TRUE));
        http_response_code(400); // Bad request
        echo json_encode(["status" => "error", "message" => "ID is required."]);
    }
// } else {
//     echo json_encode(["message" => "Invalid request method."]);
// }
?>
