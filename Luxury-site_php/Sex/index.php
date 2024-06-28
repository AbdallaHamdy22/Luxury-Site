<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Sex.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// Create a database connection
$database = new Connection();
$db = $database->connect();

// Create an instance of the Sex class
$Sex = new Sex($db);

// Fetch all sex data
$allSex = $Sex->Get_All_Sex_Data();

$menuData = [
    "allDropdown" => [
        "title" => "ALL",
        "sections" => [
            [
                "link" => "/Items",
                "header" => "All products",
                "items" => ['Shoulder Bags', 'Totes Bags', 'Clutches', 'Hobos Bags', 'Satchel Bags', 'Women Wallets', 'Exotic Bags', 'Everyday Bags', 'Evening Bags', 'Women Backpacks', 'Women Briefcases', 'Women Suitcases', 'Women Belt Bags', 'All Bags >']
            ]
        ]
    ]
];

// Dynamically add allSex data to menuData
foreach ($allSex as $sex) {
    $menuData[$sex['Name']] = [
        "title" => $sex['Name'],
        "sections" => [
            [
                "header" => $sex['Name'],
                "items" => ['Item 1', 'Item 2', 'Item 3'] // You can replace this with actual data related to each category
            ]
        ]
    ];
}

echo json_encode($menuData);
?>
