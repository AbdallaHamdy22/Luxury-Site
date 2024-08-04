<?php
require_once "Class_Queue.php";
require_once "Class_QueueDetails.php";
require_once "../DataBase/Class_Connection.php";

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}
$database = new Connection();
$db = $database->connect();

$data = json_decode(file_get_contents("php://input"));
if (!empty($data->QueueID)) {
    $queueID = $data->QueueID;

    $queueList = new QueueList($db);
    $queueDetails = new QueueDetails($db);

    $queueList->setQueueID($queueID);
    $queueDetails->setQueueID($queueID);

    if ($queueDetails->Delete_QueueDetail() && $queueList->Delete_QueueList()) {
        http_response_code(200);
        echo json_encode(["status" => "success", "message" => "Queue ignored successfully."]);
    } else {
        http_response_code(503);
        echo json_encode(["status" => "error", "message" => "Unable to ignore the queue."]);
    }
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "QueueID is required."]);
}
