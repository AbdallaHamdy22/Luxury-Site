<?php
require_once "../DataBase/Class_Connection.php";
require_once 'Class_Brand.php';


// Create a database connection
$database = new Connection();
$db = $database->connect();

$category = new Brand($db);
for ($i = 0; $i < 1; $i++) {
$category->setID(8);

$category->setName($category->getID()."tst");
$category->setImage("img");


$category->Update_Brand();
}
echo "done";
?>
