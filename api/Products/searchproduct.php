<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$query = $_GET['query'] ?? '';

$products = [
    ['name' => 'iPhone 12'],
    ['name' => 'Galaxy S21'],
    ['name' => 'PlayStation 5'],
    // ...
];

$results = array_filter($products, function($product) use ($query) {
    return stripos($product['name'], $query) !== false;
});

echo json_encode(array_values($results));
?>
