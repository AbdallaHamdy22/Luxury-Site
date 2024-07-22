<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Queue.php';
require_once 'Class_QueueDetails.php';
require_once '../User/Class_User.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Create a database connection
$database = new Connection();
$db = $database->connect();

// Get the queue ID from the request
$queueID = isset($_GET['QueueID']) ? intval($_GET['QueueID']) : 0;

if ($queueID > 0) {
    // Create an instance of the QueueDetails class
    $queueDetails = new QueueDetails($db);

    // Fetch the queue details by ID
    $results = $queueDetails->Get_Queue_Details_By_QueueID($queueID);

    if ($results) {
        $details = [];

        foreach ($results as $result) {
            // Fetch category details
            $category = new Categoire($db);
            $categoryData = $category->Get_Categoire_Data_By_ID($result['CategoireID']);

            // Fetch brand details
            $brand = new Brand($db);
            $brandData = $brand->Get_Brand_Data_By_ID($result['BrandID']);

            // Fetch color details
            $color = new Color($db);
            $colorData = $color->Get_Color_Data_By_ID($result['Color_ID']);

            // Fetch sex details
            $sex = new Sex($db);
            $sexData = $sex->Get_Sex_Data_By_ID($result['SexID']);

            // Combine all details into a single response
            $details[] = array_merge($result, [
                'CategoryName' => $categoryData['Name'],
                'BrandName' => $brandData['Name'],
                'ColorName' => $colorData['Name'],
                'SexName' => $sexData['Name']
            ]);
        }

        echo json_encode($details);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to fetch queue details."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid queue ID."]);
}
