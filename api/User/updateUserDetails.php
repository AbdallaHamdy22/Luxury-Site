<?php
require_once "../DataBase/Class_Connection.php";
require_once './Class_User.php';
require_once '../Roles/Class_Role.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
session_start();

// Create a new instance of the User class
$db = new Connection();
$connection = $db->connect();
$user = new User($connection);

// Get the POST data from the request body
$data = json_decode(file_get_contents("php://input"));
file_put_contents('php://stderr', print_r($data, TRUE));

if (!empty($data->userID) && !empty($data->userName) && !empty($data->email) && !empty($data->password)) {
    $user->setID($data->userID);
    $user->setUserName($data->userName);
    $user->setEmail($data->email);
    $user->setPassword($data->password);
    $user->setProfileImage($data->profileImage);

    if ($user->updateUserDetails()) {
        $response = [
            'status' => 'success',
            'message' => 'User details updated successfully.'
        ];
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Failed to update user details. Please try again.'
        ];
    }
} else {
    $response = [
        'status' => 'error',
        'message' => 'All fields are required.'
    ];
}

// Set the response code and content type
http_response_code(200);
header('Content-Type: application/json');

// Output the response in JSON format
echo json_encode($response);
