<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Queue.php';
require_once 'Class_QueueDetails.php';
require_once '../Products/Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Create a database connection
$database = new Connection();
$db = $database->connect();

// Get the queue ID from the request
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
$queueID = $_POST['QueueID']; // استخدم القيمة المناسبة هنا أو استخدم $_POST['QueueID'] للحصول على القيمة من الطلب
 
if ($queueID > 0) {
    // Create instances of the necessary classes
    $queueDetails = new QueueDetails($db);
    $product = new Products($db);
    $queueList = new QueueList($db);
    
    // Fetch the queue details by ID
    $results = $queueDetails->Get_Queue_Details_By_QueueID($queueID);
    // print_r($results);
    
    if ($results) {
        
        try {
            // Start a transaction
            $db->beginTransaction();
            
            // Loop through the queue details and add each to the products table
            foreach ($results as $result) {
                // Print the result to debug
                $productName = $result['ProductName'];
                $productDescription = $result['productDescription'];
                $productPrice = $result['ProductPrice'];
                $quantity = $result['Quantity'];
                $categoireID = $result['CategoireID'];
                $brandID = $result['BrandID'];
                $sexID = $result['SexID'];
                $colorID = $result['Color_ID'];
                $Image=$result['Image'];
                
                $product->setID($product->GetLastID() + 1);
                $product->setName($productName);
                $product->setDescription($productDescription);
                $product->setProduction_year(0);
                $product->setBracelet_Material('');
                $product->setPrice($productPrice);
                $product->setQuantity($quantity);
                $product->setOfferPrice(0);
                $product->setCategoryID($categoireID);
                $product->setBrandID($brandID);
                $product->setSexID($sexID);
                $product->setColorID($colorID);
                $product->setImage($Image);
                $product->Create_Product();
            }

            // Delete the queue details
            $queueDetails->setQueueID($queueID);
            $queueDetails->Delete_QueueDetail();

            // Delete the queue list
            $queueList->setQueueID($queueID);
            $queueList->Delete_QueueList();

            // Commit the transaction
            $db->commit();
            echo json_encode(["status" => "success", "message" => "Product approved and added to products table."]);
        } catch (Exception $e) {
            // Rollback the transaction in case of error
            $db->rollBack();
            echo json_encode(["status" => "error", "message" => "An error occurred while approving the product.", "error" => $e->getMessage()]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to fetch queue details."]);
    }
} else {
    error_log("Invalid QueueID: " . $queueID); // سجل الأخطاء للتحقق من قيمة QueueID
    echo json_encode(["status" => "error", "message" => "Invalid queue ID.", "error" => $queueID]);
}
}
?>
