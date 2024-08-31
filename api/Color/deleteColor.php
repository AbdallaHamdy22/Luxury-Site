<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Color.php';
require_once '../Products/Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

$database = new Connection();
$db = $database->connect();

$color = new Color($db);
$product=new Products($db);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Read the raw POST data
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->Color_ID)) {
       
        $color->setID($data->Color_ID);
        if (!$product->checkProductsByOtherID($color->getID(),"Color_ID")) {            
        if ($color->Delete_Color()) {
            http_response_code(200); 
            echo json_encode(["status"=> "success","message" => "color was deleted."]);
        } else {
            http_response_code(503); 
            echo json_encode(["status"=> "error","message" => "color was Not deleted."]);
        }
    }
    else {          
        http_response_code(200); 
        echo json_encode(["status" => "error", "message" => "Cannot delete this color as it is associated with existing products."]);
    }

    } else {
        http_response_code(400); 
        echo json_encode(["status"=> "error","message" => "color was Not deleted. Not complete"]);
    }
} else {
    echo json_encode(["status"=> "error","message" => "Invalid data"]);
}
?>
