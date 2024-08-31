<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Sex.php';
require_once '../Categoire/Class_Categoire.php';
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$database = new Connection();
$db = $database->connect();

$Sex = new Sex($db);
$allSex = $Sex->Get_All_Sex_Data();
$categories = new Categoire($db);
$allCategories = $categories->Get_All_Categoire_Data();

$menuData = [];

$allSexItems = [];
foreach ($allSex as $sex) {
    $allSexItems[] = [
        'id' => $sex['SexID'],
        'name' => 'All ' . $sex['Name']
    ];
}

$menuData['allDropdown'] = [
    "title" => "ALL",
    "sections" => [
        [
            "link" => "/Items",
            "header" => "All products",
            "items" => $allSexItems
        ]
    ]
];


foreach ($allCategories as $category) {
    $categorySexItems = [];
    foreach ($allSex as $sex) {
        $categorySexItems[] = [
            'id' => $sex['SexID'],
            'name' => $category['Name'] . ' ' . $sex['Name']
        ];
    }

    $menuData[$category['CategoireID']] = [
        "title" => $category['Name'],
        "sections" => [
            [
                "link" => "/Items?category=" . $category['CategoireID'],
                "header" => $category['Name'],
                "items" => $categorySexItems
            ]
        ]
    ];
}

echo json_encode($menuData);
