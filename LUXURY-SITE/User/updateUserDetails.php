<?php
require_once 'config/database.php'; // Include your database configuration file
require_once 'User.php'; // Include your User class file

// Create a new instance of the User class
$db = new Connection();
$connection = $db->connect();
$user = new User($connection);

// Get the POST data from the request body
$data = json_decode(file_get_contents("php://input"));

if (!empty($data->userID) && !empty($data->userName) && !empty($data->email) && !empty($data->password)) {
    $user->setID($data->userID);
    $user->setUserName($data->userName);
    $user->setEmail($data->email);
    $user->setPassword($data->password); // Optionally hash the password if needed
    $user->setProfileImage($data->profileImage); // Handle image uploading separately if needed

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
?>
