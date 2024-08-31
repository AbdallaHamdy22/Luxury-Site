<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Brand.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// الحصول على قيمة البحث من الـ URL
$query = $_GET['query'] ?? '';

// إنشاء اتصال بقاعدة البيانات
$database = new Connection();
$db = $database->connect();

// إنشاء كائن من الكلاس Brand
$Brand = new Brand($db);

// استخدام دالة searchByName للبحث عن العلامات التجارية
$results = $Brand->searchByName($query);

// إضافة حقل link لكل عنصر في النتائج
foreach ($results as &$result) {
    $result['link'] = './Items?brand=' . $result['BrandID'];
}

// إرجاع النتائج في شكل JSON
echo json_encode(array_values($results));
