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
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$database = new Connection();
$db = $database->connect();

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents('php://input'), true);

    // Debugging statements
    error_log("POST data: " . print_r($data, true));

    $queueID = isset($data['QueueID']) ? intval($data['QueueID']) : 0;
    $userPrice = isset($data['UserPrice']) ? floatval($data['UserPrice']) : 0.0;

    error_log("Received QueueID: " . $queueID);
    error_log("Received UserPrice: " . $userPrice);

    if ($queueID > 0 && $userPrice > 0) {
        $queueDetails = new QueueDetails($db);
        $product = new Products($db);
        $queueList = new QueueList($db);

        $results = $queueDetails->Get_Queue_Details_By_QueueID($queueID);

        if ($results) {
            try {
                $db->beginTransaction();

                foreach ($results as $result) {
                    $product->setID($product->GetLastID() + 1);
                    $product->setName($result['ProductName']);
                    $product->setDescription($result['productDescription']);
                    $product->setProduction_year(date('Y-m-d'));
                    $product->setPrice($userPrice); // User-specified price
                    $product->setUSerPrice($userPrice);
                    $product->setQuantity($result['Quantity']);
                    $product->setOfferPrice(0);
                    $product->setCategoryID($result['CategoireID']);
                    $product->setBrandID($result['BrandID']);
                    $product->setSexID($result['SexID']);
                    $product->setColorID($result['Color_ID']);
                    $product->setImage($result['Image']);
                    $product->setUserID($result['UserID']);
                    if ($result['Quantity'] > 0) {
                        $product->setStatus('Available');
                    } else {
                        $product->setStatus('SoldOut');
                    }
                    $product->Create_Product();
                }

                $queueDetails->setQueueID($queueID);
                $queueDetails->Delete_QueueDetail();

                $queueList->setQueueID($queueID);
                $queueList->Delete_QueueList();

                $db->commit();
                echo json_encode(["status" => "success", "message" => "Product approved and added to products table."]);
            } catch (Exception $e) {
                $db->rollBack();
                echo json_encode(["status" => "failure", "message" => "Transaction failed: " . $e->getMessage()]);
            }
        } else {
            echo json_encode(["status" => "failure", "message" => "No queue details found for QueueID: $queueID"]);
        }
    } else {
        echo json_encode(["status" => "failure", "message" => "Invalid input data."]);
    }
} else {
    echo json_encode(["status" => "failure", "message" => "Invalid request method."]);
}
