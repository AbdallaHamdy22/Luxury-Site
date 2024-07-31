<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Queue.php';
require_once 'Class_QueueDetails.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Content-Type: application/json");
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$database = new Connection();
$db = $database->connect();

$data = $_POST;
$received_files = $_FILES;

error_log('Received POST data: ' . print_r($_POST, true));
error_log('Received FILES data: ' . print_r($_FILES, true));

$required_fields = [
    'ProductName', 'description', 'price', 'quantity', 'offerPrice',
    'CategoireID', 'BrandID', 'SexID', 'ColorID', 'UserID', 'Status', 'images'
];
foreach ($required_fields as $field) {
    if (!isset($data[$field]) && !isset($received_files[$field])) {
        error_log("Missing field: $field");
        echo json_encode(['status' => 'error', 'message' => "Missing field: $field"]);
        return;
    }
}

if (
    isset(
        $data['ProductName'],
        $data['description'],
        $data['price'],
        $data['quantity'],
        $data['offerPrice'],
        $data['CategoireID'],
        $data['BrandID'],
        $data['SexID'],
        $data['ColorID'],
        $data['UserID'],
        $data['Status'],
        $received_files['images']
    )
) {
    $ProductName = $data['ProductName'];
    $description = $data['description'];
    $price = $data['price'];
    $quantity = $data['quantity'];
    $offerPrice = $data['offerPrice'];
    $categoryID = $data['CategoireID'];
    $brandID = $data['BrandID'];
    $sexID = $data['SexID'];
    $colorID = $data['ColorID'];
    $UserID = $data['UserID'];
    $Status = $data['Status'];
    $imagePaths = [];
    $upload_directory = '../../public/Images/';
    if (!is_dir($upload_directory)) {
        mkdir($upload_directory, 0777, true);
    }

    foreach ($received_files['images']['tmp_name'] as $key => $tmp_name) {
        $file_name_array = explode(".", $received_files['images']['name'][$key]);
        $file_name = time() . '_' . $key . '.' . end($file_name_array);
        $upload_file = $upload_directory . $file_name;
        $image_save_link = '/Images/' . $file_name;
        if (move_uploaded_file($tmp_name, $upload_file)) {
            $imagePaths[] = $image_save_link;
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to upload image']);
            return;
        }
    }
    $images_json = implode(',', $imagePaths);
    try {
        $db->beginTransaction();

        $queueList = new QueueList($db);
        $queueList->setUserID($UserID);
        $queueList->setQueueID($queueList->GetLastID());
        if ($queueList->Create_QueueList()) {

            $queueID = $queueList->getQueueID();

            $queue = new QueueDetails($db);

            $queue->setQueueID($queueID);
            $queue->setProductName($ProductName);
            $queue->setProductDescription($description);
            $queue->setProductPrice($price);
            $queue->setProductOfferPrice($offerPrice);
            $queue->setQuantity($quantity);
            $queue->setCategoireID($categoryID);
            $queue->setBrandID($brandID);
            $queue->setSexID($sexID);
            $queue->setColorID($colorID);
            $queue->setStatus($Status);
            $queue->setUserID($UserID);
            $queue->setImage($images_json);
            if ($queue->Create_QueueDetail()) {
                $db->commit();
                echo json_encode(['status' => 'success', 'message' => 'Product added to queue.']);
                return;
            }
        }
        $db->rollBack();
    } catch (Exception $e) {
        $db->rollBack();
        echo json_encode(['status' => 'error', 'message' => 'Failed to add product to queue: ' . $e->getMessage()]);
        return;
    }
}

echo json_encode(['status' => 'error', 'message' => 'Invalid input.']);
