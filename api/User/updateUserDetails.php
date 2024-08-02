<?php
require_once "../DataBase/Class_Connection.php";
require_once './Class_User.php';
require_once '../Roles/Class_Role.php';
require_once "../UploadOneImage.php";
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

if (!empty($data->UserID) && !empty($data->UserName) && !empty($data->Email) && !empty($data->Password)) {
    $user->setID($data->UserID);
    $user->setUserName($data->UserName);
    $user->setEmail($data->Email);
    $user->setPassword($data->Password);

    $uploadResult = ['status' => 'success', 'imagePaths' => []];
    if (strpos($data->ProfileImage, 'data:image') === 0) {
        // Only upload image if it's a base64 encoded string
        $uploadResult = uploadImages($data->ProfileImage);
    }

    if ($uploadResult['status'] === 'error') {
        $response = $uploadResult;
    } else {
        if (!empty($uploadResult['imagePaths'])) {
            $images_json = implode(',', $uploadResult['imagePaths']);
            $user->setProfileImage($images_json);
        } else {
            // Keep the existing image if no new image was uploaded
            $user->setProfileImage($data->ProfileImage);
        }

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
