<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_User.php';


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
// Create a new instance of the User class
$db = new Connection();
$connection = $db->connect();
$user = new User($connection);

// Get the POST data from the request body
$data = json_decode(file_get_contents("php://input"));

// Check if all required fields are filled
if (!empty($data->fName) && !empty($data->lName) && !empty($data->Email) && !empty($data->Password) && !empty($data->conf_Password) && !empty($data->number) && !empty($data->birthdate) && !empty($data->gender)) {

    // Check if the password and confirm password match
    if ($data->Password === $data->conf_Password) {

        // Register the user
        $result = $user->registerUser($data);

        if ($result) {
            $response = [
                'status' => 'success',
                'message' => 'User registered successfully.',

            ];
        } else {
            $response = [
                'status' => 'error',

            ];
        }
    } else {
        $response = [
            'status' => 'error',
            'message' => 'Passwords do not match.'
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
