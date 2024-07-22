<?php
class Order {
    private $conn;
    private $table_name = "orders";

    private $OrderID;
    private $OrderDate;
    private $Status;
    private $UserID;
    private $PaymentID;

    public function __construct($db) {
        $this->conn = $db;
    }
    public function GetLastID()
    {
        $sql = "SELECT MAX(OrderID) as LastID FROM ".$this->table_name;
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['LastID']+1;
    }

    // Getters and Setters
    public function getOrderID() {
        return $this->OrderID;
    }

    public function setOrderID($OrderID) {
        $this->OrderID = $OrderID;
    }
    public function getPaymentID() {
        return $this->PaymentID;
    }

    public function setPaymentID($PaymentID) {
        $this->PaymentID = $PaymentID;
    }

    public function getOrderDate() {
        return $this->OrderDate;
    }

    public function setOrderDate($OrderDate) {
        $this->OrderDate = $OrderDate;
    }

    public function getStatus() {
        return $this->Status;
    }

    public function setStatus($Status) {
        $this->Status = $Status;
    }

    public function getUserID() {
        return $this->UserID;
    }

    public function setUserID($UserID) {
        $this->UserID = $UserID;
    }

    // CRUD Methods
    public function Get_All_Orders() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Get_Order_By_ID($id) {
        $query = "SELECT * FROM " . $this->table_name . " WHERE OrderID = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $id);
        $stmt->execute();
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }

    public function Create_Order() {
        $query = "INSERT INTO " . $this->table_name . " (OrderID, OrderDate, Status, UserID, PaymentID) VALUES (:OrderID, :OrderDate, :Status, :UserID, :PaymentID)";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(":OrderID", $this->OrderID);
        $stmt->bindParam(":OrderDate", $this->OrderDate);
        $stmt->bindParam(":Status", $this->Status);
        $stmt->bindParam(":UserID", $this->UserID);
        $stmt->bindParam(":PaymentID", $this->PaymentID);
    
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    
    public function Update_Order() {
        $query = "UPDATE " . $this->table_name . " SET OrderDate = :OrderDate, Status = :Status, UserID = :UserID WHERE OrderID = :OrderID";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":OrderDate", $this->OrderDate);
        $stmt->bindParam(":Status", $this->Status);
        $stmt->bindParam(":UserID", $this->UserID);
        $stmt->bindParam(":OrderID", $this->OrderID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function Delete_Order() {
        $query = "DELETE FROM " . $this->table_name . " WHERE OrderID = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->OrderID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
