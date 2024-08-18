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

$data = $_POST;

if (isset($data['ProductID']) && isset($data['Quantity']) && isset($data['Price']) && isset($data['UserID'])) {
    $order->setOrderDate(date("Y-m-d H:i:s"));
    $order->setStatus('pending');
    $order->setUserID($data['UserID']);
    $order->setOrderID($order->GetLastID());

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

    if ($order->Create_Order()) {
        $orderDetails->setQuantity($data['Quantity']);
        $orderDetails->setPrice($data['Price']);
        $orderDetails->setOrderID($order->getOrderID());
        $orderDetails->setProductID($data['ProductID']);

        if ($orderDetails->Create_OrderDetails()) {
            echo json_encode(["status" => "success", "message" => "Order placed successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to create order details."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to create order."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
}
