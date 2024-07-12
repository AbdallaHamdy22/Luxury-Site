<?php
class OrderDetails {
    private $conn;
    private $table_name = "orderdetails";

    private $OrderDetailsID;
    private $Quantity;
    private $Price;
    private $OrderID;
    private $ProductID;

    public function __construct($db) {
        $this->conn = $db;
    }

    // Getters and Setters
    public function getOrderDetailsID() {
        return $this->OrderDetailsID;
    }

    public function setOrderDetailsID($OrderDetailsID) {
        $this->OrderDetailsID = $OrderDetailsID;
    }

    public function getQuantity() {
        return $this->Quantity;
    }

    public function setQuantity($Quantity) {
        $this->Quantity = $Quantity;
    }

    public function getPrice() {
        return $this->Price;
    }

    public function setPrice($Price) {
        $this->Price = $Price;
    }

    public function getOrderID() {
        return $this->OrderID;
    }

    public function setOrderID($OrderID) {
        $this->OrderID = $OrderID;
    }

    public function getProductID() {
        return $this->ProductID;
    }

    public function setProductID($ProductID) {
        $this->ProductID = $ProductID;
    }

    // CRUD Methods
    public function Get_All_OrderDetails() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Get_OrderDetails_By_ID($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE OrderDetailsID = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function Create_OrderDetails() {
        $query = "INSERT INTO " . $this->table_name . " SET Quantity=:Quantity, Price=:Price, OrderID=:OrderID, ProductID=:ProductID";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":Quantity", $this->Quantity);
        $stmt->bindParam(":Price", $this->Price);
        $stmt->bindParam(":OrderID", $this->OrderID);
        $stmt->bindParam(":ProductID", $this->ProductID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function GetLastID()
    {
        $sql = "SELECT MAX(OrderDetailsID) as LastID FROM ".$this->table_name;
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['LastID']+1;
    }

    public function Update_OrderDetails() {
        $query = "UPDATE " . $this->table_name . " SET Quantity = :Quantity, Price = :Price, OrderID = :OrderID, ProductID = :ProductID WHERE OrderDetailsID = :OrderDetailsID";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":Quantity", $this->Quantity);
        $stmt->bindParam(":Price", $this->Price);
        $stmt->bindParam(":OrderID", $this->OrderID);
        $stmt->bindParam(":ProductID", $this->ProductID);
        $stmt->bindParam(":OrderDetailsID", $this->OrderDetailsID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function Delete_OrderDetails() {
        $query = "DELETE FROM " . $this->table_name . " WHERE OrderDetailsID = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->OrderDetailsID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
