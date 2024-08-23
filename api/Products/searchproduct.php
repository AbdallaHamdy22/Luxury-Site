<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';
require_once '../Sex/Class_Sex.php';

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

// إنشاء اتصال بقاعدة البيانات
$database = new Connection();
$db = $database->connect();

// إنشاء كائن من الكلاس Products
$products = new Products($db);

// الحصول على الكلمة المفتاحية للبحث من الـ URL
$query = $_GET['query'] ?? '';

// استخدام دالة searchProducts للبحث عن المنتجات
$results = $products->searchProducts($query);

// إرجاع النتائج في شكل JSON
echo json_encode(array_values($results));
?>
