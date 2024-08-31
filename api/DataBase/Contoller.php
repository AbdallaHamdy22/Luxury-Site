<?php
require_once "Class_Connection.php";
require_once '../User/Class_User.php';
require_once '../Roles/Class_Role.php';
require_once '../Products/Class_Products.php';
require_once '../Categoire/Class_Categoire.php';
require_once '../Brand/Class_Brand.php';
require_once '../Color/Class_Color.php';

// Create a database connection
$database = new Connection();
$db = $database->connect();

$product=new Products($db);
$product->Get_Product_Data_By_ID(1);
// print_r($product);



?>