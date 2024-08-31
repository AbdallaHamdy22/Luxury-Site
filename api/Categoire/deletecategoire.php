<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Categoire.php';
require_once '../Products/Class_Products.php';
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

$category = new Categoire($db);
$product=new Products($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Read the raw POST data and handle files
    $data = json_decode(file_get_contents("php://input"), true);
    $id = isset($data['CategoireID']) ? $data['CategoireID'] : null;

    // For debugging
    file_put_contents('php://stderr', print_r("Received ID: $id\n", TRUE));

    if ($id) {
        $category->setID($id);
        if (!$product->checkProductsByOtherID($category->getID(),"CategoireID")) 
        {         
            if ($category->Delete_Categoire()) {
                http_response_code(200); 
                echo json_encode(["status"=> "success","message" => "Category was deleted."]);
            } else {
                file_put_contents('php://stderr', print_r("Failed to delete category from database\n", TRUE));
                http_response_code(503); // Service unavailable
                echo json_encode(["status" => "error", "message" => "Unable to delete category."]);
            }
        }
        else {          
            http_response_code(200); 
            echo json_encode(["status" => "error", "message" => "Cannot delete this category as it is associated with existing products."]);
        }
    } else {
        file_put_contents('php://stderr', print_r("ID is missing\n", TRUE));
        http_response_code(400); 
        echo json_encode(["status" => "error", "message" => "ID is required."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
