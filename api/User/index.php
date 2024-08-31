<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:3000"); // استبدل بـ URL تطبيق React
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");

file_put_contents('php://stderr', print_r("Session Data: " . json_encode($_SESSION) . "\n", TRUE));

if (isset($_SESSION['user'])) {
    echo json_encode(["status" => "success", "user" => $_SESSION['user']]);
} else {
    echo json_encode(["status" => "error", "message" => "User not logged in"]);
}
?>
