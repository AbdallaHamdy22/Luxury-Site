<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

require_once '../DataBase/Class_Connection.php';

$database = new Connection();
$conn = $database->connect();

$data = json_decode(file_get_contents('php://input'), true);

$productID = $data['ProductID'] ?? null;
$newQuantity = $data['quantity'] ?? null;

if (!$productID || !$newQuantity) {
    echo json_encode(['error' => 'Invalid input']);
    exit();
}

try {
    // Remove any minimum quantity constraint checks here
    $query = "UPDATE products SET Quantity = :quantity WHERE ProductID = :productID";
    $stmt = $conn->prepare($query);

    $stmt->bindParam(':quantity', $newQuantity, PDO::PARAM_INT);
    $stmt->bindParam(':productID', $productID, PDO::PARAM_INT);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['error' => 'Failed to update quantity']);
    }
} catch (PDOException $e) {
    echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
}

$conn = null; // Close connection
