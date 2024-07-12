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
$data = $_POST;

if (isset($data['name'], $data['description'], $data['price'], $data['quantity'], $data['offerPrice'], $data['CategoireID'], $data['BrandID'], $data['SexID'], $data['ColorID'], $data['UserID'],$_FILES['Image'])) {
    $name = $data['name'];
    $description = $data['description'];
    $price = $data['price'];
    $quantity = $data['quantity'];
    $offerPrice = $data['offerPrice'];
    $categoireID = $data['CategoireID'];
    $brandID = $data['BrandID'];
    $sexID = $data['SexID'];
    $colorID = $data['ColorID'];
    $userID = $data['UserID']; // Assuming you have a user ID from the request
    $image = isset($_FILES['Image']) ? $_FILES['Image'] : null;

    try {
        // بدء المعاملة
        $db->beginTransaction();

        // إنشاء كائن من كلاس QueueList
        $queueList = new QueueList($db);
        $queueList->setUserID($userID);
        $queueList->setQueueID($queueList->GetLastID());
        if ($queueList->Create_QueueList()) {
            
            $queueID = $queueList->getQueueID();

            
            $queueDetails = new QueueDetails($db);
            $queueDetails->setProductName($name);
            $queueDetails->setProductDescription($description);
            $queueDetails->setProductPrice($price);
            $queueDetails->setQuantity($quantity);
            $queueDetails->setCategoireID($categoireID);
            $queueDetails->setBrandID($brandID);
            $queueDetails->setSexID($sexID);
            $queueDetails->setColorID($colorID);
            $queueDetails->setQueueID($queueID);
            $target_dir = realpath("D:/Luxury-Site/public/Images") . '/'; // Using realpath to get the absolute path
        $target_file = $target_dir . basename($image["name"]);

        // Check for file upload errors
        if ($image["error"] !== UPLOAD_ERR_OK) {
            file_put_contents('php://stderr', print_r("File upload error: " . $image["error"] . "\n", TRUE));
            http_response_code(400); // Bad request
            echo json_encode(["status" => "error", "message" => "File upload error: " . $image["error"]]);
            exit();
        }

        // Check for directory permissions
        if (!is_writable($target_dir)) {
            file_put_contents('php://stderr', print_r("Directory is not writable: $target_dir\n", TRUE));
            http_response_code(400); // Bad request
            echo json_encode(["status" => "error", "message" => "Directory is not writable: $target_dir"]);
            exit();
        }

        // Debugging: Check file move operation
        if (move_uploaded_file($image["tmp_name"], $target_file)) {
            file_put_contents('php://stderr', print_r("File uploaded successfully to $target_file\n", TRUE));
            $queueDetails->setImage("/Images/".$image["name"]);
        

            if ($queueDetails->Create_QueueDetail()) {
                // تأكيد المعاملة
                $db->commit();
                echo json_encode(["status" => "success", "message" => "Product added to queue successfully."]);
            } else {
                // التراجع عن المعاملة في حالة وجود خطأ
                $db->rollBack();
                echo json_encode(["status" => "error", "message" => "Failed to add product to queue details."]);
            }
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
} else {
    echo json_encode([
        "status" => "error", 
        "message" => "Invalid input.",
        "received_data" => $data
    ]);
}
?>
