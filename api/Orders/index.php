<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Order.php';
require_once '../User/Class_User.php';
require_once '../Roles/Class_Role.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
// Create a database connection
$database = new Connection();
$db = $database->connect();

$order = new Order($db);

$queues=$order->Get_All_Orders();

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

echo json_encode($result) 
?>

