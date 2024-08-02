<?php

require_once "../DataBase/Class_Connection.php";
require_once "Class_Queue.php";
require_once "Class_QueueDetails.php";
require_once "../UploadImages.php";

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
    'CategoireID', 'BrandID', 'SexID', 'ColorID', 'UserID', 'Status'
];

foreach ($required_fields as $field) {
    if (!isset($data[$field]) && !isset($received_files[$field])) {
        error_log("Missing field: $field");
        echo json_encode(['status' => 'error', 'message' => "Missing field: $field"]);
        return;
    }
}

try {
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
            $data['Status']
        )
    ) {
        $ProductName = $data['ProductName'];
        $description = $data['description'];
        $price = $data['price'];
        $quantity = $data['quantity'];
        $offerPrice = $data['offerPrice'];
        $UserID = $data['UserID'];
        $Status = $data['Status'];

        $CategoireID = $data['CategoireID'];
        $BrandID = $data['BrandID'];
        $SexID = $data['SexID'];
        $ColorID = $data['ColorID'];

        $uploadResult = uploadImages($received_files['images']);
        if ($uploadResult['status'] === 'error') {
            echo json_encode($uploadResult);
            return;
        }
        $images_json = implode(',', $uploadResult['imagePaths']);

        $queueList = new QueueList($db);
        $queueDetails = new QueueDetails($db);

        $queueList->setQueueID($queueList->GetLastID());
        $queueList->setUserID($UserID);

        if ($queueList->Create_QueueList()) {
            $QueueID = $queueList->getQueueID();

            $queueDetails->setProductName($ProductName);
            $queueDetails->setProductDescription($description);
            $queueDetails->setProductPrice($price);
            $queueDetails->setProductOfferPrice($offerPrice);
            $queueDetails->setQuantity($quantity);
            $queueDetails->setUserID($UserID);
            $queueDetails->setStatus($Status);
            $queueDetails->setQueueID($QueueID);
            $queueDetails->setImage($images_json);

            $queueDetails->setCategoireID($CategoireID);
            $queueDetails->setBrandID($BrandID);
            $queueDetails->setSexID($SexID);
            $queueDetails->setColorID($ColorID);

            echo json_encode([
                'status' => 'success',
                'message' => 'Queue added successfully',
                'QueueID' => $QueueID
            ]);
        } else {
            throw new Exception('Failed to create queue list');
        }
    } else {
        throw new Exception('All required fields must be filled');
    }
} catch (Exception $e) {
    error_log('Error: ' . $e->getMessage());
    echo json_encode([
        'status' => 'error',
        'message' => 'An unknown error occurred: ' . $e->getMessage()
    ]);
}
