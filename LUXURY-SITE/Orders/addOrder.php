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

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['ProductID']) && isset($data['Quantity']) && isset($data['Price']) && isset($data['UserID']) && isset($data['PaymentID'])) {
    $order->setOrderDate(date("Y-m-d H:i:s"));
    $order->setStatus('pending');
    $order->setUserID($data['UserID']);
    $order->setPaymentID($data['PaymentID']);
    $order->setOrderID($order->GetLastID());

    if ($order->Create_Order()) {
        

        $orderDetails->setQuantity($data['Quantity']);
        $orderDetails->setPrice($data['Price']);
        $orderDetails->setOrderID($$order->getOrderID());
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
?>
