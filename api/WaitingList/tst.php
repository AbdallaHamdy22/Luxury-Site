<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Queue.php';
require_once 'Class_QueueDetails.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Create a database connection
$database = new Connection();
$db = $database->connect();

// الحصول على البيانات من الطلب
$data = json_decode(file_get_contents("php://input"), true);

// if (isset($data['name'], $data['description'], $data['price'], $data['quantity'], $data['offerPrice'], $data['CategoireID'], $data['BrandID'], $data['SexID'], $data['ColorID'], $data['UserID'])) {
$name = "mewo";
$description = "done";
$price = 15;
$quantity = 2;
$offerPrice = 0;
$categoireID = 1;
$brandID = 1;
$sexID = 1;
$colorID = 1;
$userID = 2;
$status = 'Available';
try {
    // بدء المعاملة
    $db->beginTransaction();

    // إنشاء كائن من كلاس QueueList
    $queueList = new QueueList($db);
    $queueList->setUserID($userID);
    $queueList->setQueueID($queueList->GetLastID());

    if ($queueList->Create_QueueList()) {
        // الحصول على معرف الصف الجديد في QueueList
        $queueID = $queueList->getQueueID();

        // إنشاء كائن من كلاس QueueDetails
        $queueDetails = new QueueDetails($db);
        $queueDetails->setProductName($name);
        $queueDetails->setProductDescription($description);
        $queueDetails->setProductPrice($price);
        $queueDetails->setQuantity($quantity);
        $queueDetails->setProductOfferPrice($offerPrice);
        $queueDetails->setCategoireID($categoireID);
        $queueDetails->setBrandID($brandID);
        $queueDetails->setSexID($sexID);
        $queueDetails->setColorID($colorID);
        $queueDetails->setQueueID($queueID);

        if ($queueDetails->Create_QueueDetail()) {
            // تأكيد المعاملة
            $db->commit();
            echo json_encode(["status" => "success", "message" => "Product added to queue successfully."]);
        } else {
            // التراجع عن المعاملة في حالة وجود خطأ
            $db->rollBack();
            echo json_encode(["status" => "error", "message" => "Failed to add product to queue details."]);
        }
    } else {
        // التراجع عن المعاملة في حالة وجود خطأ
        $db->rollBack();
        echo json_encode(["status" => "error", "message" => "Failed to add product to queue list."]);
    }
} catch (Exception $e) {
    // التراجع عن المعاملة في حالة وجود خطأ
    $db->rollBack();
    echo json_encode(["status" => "error", "message" => "An error occurred.", "error" => $e->getMessage()]);
}
// } else {
//     echo json_encode(["status" => "error", "message" => "Invalid input."]);
// }
