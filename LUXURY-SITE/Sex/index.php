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

$menuData = [
    "allDropdown" => [
        "title" => "ALL",
        "sections" => [
            [
                "link" => "/Items",
                "header" => "All products",
                "items" => []
            ]
        ]
    ]
];

// تحويل الفئات إلى مصفوفة من العناصر مع إضافة "All " قبل كل فئة
$allCategoryItems = [];
foreach ($allCategories as $category) {
    $allCategoryItems[] = [
        'id' => $category['CategoireID'], // افتراضًا أن الـ ID موجود في الحقل 'CategoireID'
        'name' => 'All ' . $category['Name']
    ];
}


$menuData['allDropdown']['sections'][0]['items'] = $allCategoryItems;

foreach ($allSex as $sex) {
    // تحويل الفئات إلى مصفوفة من العناصر مع إضافة اسم الجنس قبل كل فئة
    $sexCategoryItems = [];
    foreach ($allCategories as $category) {
        $sexCategoryItems[] = [
            'id' => $category['CategoireID'],
            'name' => $sex['Name'] . ' ' . $category['Name']
        ];
    }
    
    $menuData[$sex['SexID']] = [
        "title" => $sex['Name'],
        "sections" => [
            [
                "link" => "/Items",
                "header" => $sex['Name'],
                "items" => $sexCategoryItems
            ]
        ]
    ];
}

echo json_encode($menuData);
?>
