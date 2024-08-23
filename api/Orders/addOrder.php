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

// الحصول على البيانات الواردة من الطلب
$data = json_decode(file_get_contents("php://input"), true);

// تحقق من صحة البيانات
if (isset($data['Products']) && is_array($data['Products']) && !empty($data['Products']) && isset($data['UserID'])) {
    $order->setOrderDate(date("Y-m-d H:i:s"));
    $order->setStatus('pending');
    $order->setUserID($data['UserID']);
    $orderID = $order->GetLastID();
    $order->setOrderID($orderID);

    // تعيين تفاصيل الشحن
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
        $allProductsInserted = true;

        // تمر عبر قائمة المنتجات وإضافتها واحدة تلو الأخرى
        foreach ($data['Products'] as $product) {
            $orderDetails->setQuantity($product['Quantity']);
            $orderDetails->setPrice($product['Price']);
            $orderDetails->setOrderID($order->getOrderID());
            $orderDetails->setProductID($product['ProductID']);

            if (!$orderDetails->Create_OrderDetails()) {
                $allProductsInserted = false;
                break;
            }
        }

        if ($allProductsInserted) {
            echo json_encode(["status" => "success", "message" => "Order placed successfully."]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to create order details for some products."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to create order."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid input."]);
}
?>
