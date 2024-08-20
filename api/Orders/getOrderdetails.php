<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Order.php';
require_once 'Class_OrderDetails.php';
require_once '../User/Class_User.php';
require_once '../Roles/Class_Role.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';
require_once '../Products/Class_Products.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json; charset=UTF-8");
// Create a database connection
$database = new Connection();
$db = $database->connect();
$product=new Products($db);
// Get the queue ID from the request
$queueID = isset($_GET['QueueID']) ? intval($_GET['QueueID']) : 0;

if ($queueID > 0) {
    // Create an instance of the QueueDetails class
    $queueDetails = new OrderDetails($db);

    // Fetch the queue details by ID
    $results = $queueDetails->Get_OrderDetails_By_ID($queueID);    
    if ($results) {
        $details = [];
        foreach ($results as $result) {            
            $productID = $result['ProductID'];
            $product->Get_Product_Data_By_ID($productID);                       
            $details[] = array_merge($result, $product->toArray()); 
        }

        echo json_encode($details);

    } else {
        echo json_encode(["status" => "error", "message" => "Failed to fetch queue details."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid queue ID."]);
}
