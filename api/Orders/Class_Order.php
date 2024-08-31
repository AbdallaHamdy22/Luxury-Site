<?php
class Order {
    private $conn;
    private $table_name = "orders";

    // Order attributes
    private $OrderID;
    private $OrderDate;
    private $Status;
    private $UserID;    
    private $Address;
    private $Street;
    private $ApartmentNumber;
    private $City;
    private $State;
    private $ZipCode;
    private $Country;
    private $PhoneNumber;
    private $Notes;

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
   

    public function getAddress() {
        return $this->Address;
    }

    public function setAddress($Address) {
        $this->Address = $Address;
    }

    public function getStreet() {
        return $this->Street;
    }

    public function setStreet($Street) {
        $this->Street = $Street;
    }

    public function getApartmentNumber() {
        return $this->ApartmentNumber;
    }

    public function setApartmentNumber($ApartmentNumber) {
        $this->ApartmentNumber = $ApartmentNumber;
    }

    public function getCity() {
        return $this->City;
    }

    public function setCity($City) {
        $this->City = $City;
    }

    public function getState() {
        return $this->State;
    }

    public function setState($State) {
        $this->State = $State;
    }

    public function getZipCode() {
        return $this->ZipCode;
    }

    public function setZipCode($ZipCode) {
        $this->ZipCode = $ZipCode;
    }

    public function getCountry() {
        return $this->Country;
    }

    public function setCountry($Country) {
        $this->Country = $Country;
    }

    public function getPhoneNumber() {
        return $this->PhoneNumber;
    }

    public function setPhoneNumber($PhoneNumber) {
        $this->PhoneNumber = $PhoneNumber;
    }

    public function getNotes() {
        return $this->Notes;
    }

    public function setNotes($Notes) {
        $this->Notes = $Notes;
    }

    // CRUD Methods
    public function Get_All_Orders() {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Get_All_Orders_byStatus($status = 'pending') {
        $query = "SELECT * FROM " . $this->table_name . " WHERE Status = :status";
        $stmt = $this->conn->prepare($query);
         // Define the status value
        $stmt->bindParam(':status', $status);
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
        $query = "INSERT INTO " . $this->table_name . " 
                  (OrderID, OrderDate, Status, Address, Street, ApartmentNumber, City, State, ZipCode, Country, PhoneNumber, Notes,UserID) 
                  VALUES (:OrderID, :OrderDate, :Status,:Address, :Street, :ApartmentNumber, :City, :State, :ZipCode, :Country, :PhoneNumber, :Notes,:UserID)";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":OrderID", $this->OrderID);
        $stmt->bindParam(":OrderDate", $this->OrderDate);
        $stmt->bindParam(":Status", $this->Status);
        $stmt->bindParam(":UserID", $this->UserID);        
        $stmt->bindParam(":Address", $this->Address);
        $stmt->bindParam(":Street", $this->Street);
        $stmt->bindParam(":ApartmentNumber", $this->ApartmentNumber);
        $stmt->bindParam(":City", $this->City);
        $stmt->bindParam(":State", $this->State);
        $stmt->bindParam(":ZipCode", $this->ZipCode);
        $stmt->bindParam(":Country", $this->Country);
        $stmt->bindParam(":PhoneNumber", $this->PhoneNumber);
        $stmt->bindParam(":Notes", $this->Notes);
    
        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    
    public function Update_Order() {
        $query = "UPDATE " . $this->table_name . " SET OrderDate = :OrderDate, Status = :Status, UserID = :UserID, Address = :Address, Street = :Street, ApartmentNumber = :ApartmentNumber, City = :City, State = :State, ZipCode = :ZipCode, Country = :Country, PhoneNumber = :PhoneNumber, Notes = :Notes WHERE OrderID = :OrderID";
        $stmt = $this->conn->prepare($query);

        $stmt->bindParam(":OrderDate", $this->OrderDate);
        $stmt->bindParam(":Status", $this->Status);
        $stmt->bindParam(":UserID", $this->UserID);
        $stmt->bindParam(":Address", $this->Address);
        $stmt->bindParam(":Street", $this->Street);
        $stmt->bindParam(":ApartmentNumber", $this->ApartmentNumber);
        $stmt->bindParam(":City", $this->City);
        $stmt->bindParam(":State", $this->State);
        $stmt->bindParam(":ZipCode", $this->ZipCode);
        $stmt->bindParam(":Country", $this->Country);
        $stmt->bindParam(":PhoneNumber", $this->PhoneNumber);
        $stmt->bindParam(":Notes", $this->Notes);
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
