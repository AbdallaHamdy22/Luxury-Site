<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Queue.php';
require_once 'Class_QueueDetails.php';
require_once '../User/Class_User.php';
require_once '../Roles/Class_Role.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$database = new Connection();
$db = $database->connect();

$queue = new QueueList($db);
$queues = $queue->Get_All_Queues();

$user = new User($db);

$result = [];

if ($queues) {
    foreach ($queues as $queue) {
        $userID = $queue['UserID'];
        $userData = $user->Get_User_Data_By_ID($userID);
        if ($userData) {
            $queue['UserName'] = $userData['UserName'];
        } else {
            $queue['UserName'] = 'Unknown';
        }
        $result[] = $queue;
    }
}

if ($result) {
    echo json_encode($result);
} else {
    echo json_encode(["status" => "error", "message" => "Failed to fetch queue list."]);
}
?>
