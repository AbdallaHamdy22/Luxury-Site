<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Order.php';
require_once 'Class_OrderDetails.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Create a database connection
$database = new Connection();
$db = $database->connect();

$order = new Order($db);
$orderDetails = new OrderDetails($db);

// Get data from the request
$data = json_decode(file_get_contents("php://input"), true);

// Validate input
if (
    isset($data['UserID']) &&
    isset($data['Address']) &&
    isset($data['Street']) &&
    isset($data['City']) &&
    isset($data['State']) &&
    isset($data['Zip']) &&
    isset($data['Country']) &&
    isset($data['Phone']) &&
    isset($data['Notes']) &&
    isset($data['Products']) &&
    is_array($data['Products']) &&
    !empty($data['Products'])
) {
    try {
        // Begin transaction
        $db->beginTransaction();

        // Set order details
        $order->setOrderDate(date("Y-m-d H:i:s"));
        $order->setStatus('pending');
        $order->setUserID($data['UserID']);
        $orderID = $order->GetLastID();
        $order->setOrderID($orderID);

        // Set shipping details
        $order->setAddress($data['Address']);
        $order->setStreet($data['Street']);
        $order->setApartmentNumber($data['Apartment']);
        $order->setCity($data['City']);
        $order->setState($data['State']);
        $order->setZipCode($data['Zip']);
        $order->setCountry($data['Country']);
        $order->setPhoneNumber($data['Phone']);
        $order->setNotes($data['Notes']);

        // Create the order
        if ($order->Create_Order()) {
            $allProductsInserted = true;

            // Iterate through the list of products and add them one by one
            foreach ($data['Products'] as $product) {
                $orderDetails->setQuantity($product['Quantity']);
                $orderDetails->setPrice($product['Price']);
                $orderDetails->setOrderID($order->getOrderID());
                $orderDetails->setProductID($product['ProductID']);

                // Update product quantity and create order details
                if (!$orderDetails->updateProductQuantity() || !$orderDetails->Create_OrderDetails()) {
                    $allProductsInserted = false;
                    break;
                }
            }

            if ($allProductsInserted) {
                // Commit the transaction
                $db->commit();
                echo json_encode(["status" => "success", "message" => "Order placed successfully."]);
            } else {
                // Rollback if any product order detail fails
                $db->rollBack();
                echo json_encode(["status" => "error", "message" => "Failed to create order details for some products."]);
            }
        } else {
            // Rollback if order creation fails
            $db->rollBack();
            echo json_encode(["status" => "error", "message" => "Failed to create order."]);
        }
    } catch (Exception $e) {
        // Rollback in case of any exception
        $db->rollBack();
        echo json_encode(["status" => "error", "message" => "An error occurred: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
}
