<?php
class OrderDetails
{
    private $conn;
    private $table_name = "orderdetails";

    private $OrderDetailsID;
    private $Quantity;
    private $Price;
    private $OrderID;
    private $ProductID;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Getters and Setters
    public function getOrderDetailsID()
    {
        return $this->OrderDetailsID;
    }

    public function setOrderDetailsID($OrderDetailsID)
    {
        $this->OrderDetailsID = $OrderDetailsID;
    }

    public function getQuantity()
    {
        return $this->Quantity;
    }

    public function setQuantity($Quantity)
    {
        $this->Quantity = $Quantity;
    }

    public function getPrice()
    {
        return $this->Price;
    }

    public function setPrice($Price)
    {
        $this->Price = $Price;
    }

    public function getOrderID()
    {
        return $this->OrderID;
    }

    public function setOrderID($OrderID)
    {
        $this->OrderID = $OrderID;
    }

    public function getProductID()
    {
        return $this->ProductID;
    }

    public function setProductID($ProductID)
    {
        $this->ProductID = $ProductID;
    }

    public function updateProductQuantity()
    {
        try {
            // Fetch the current quantity from the database
            $select_query = "SELECT Quantity FROM Products WHERE ProductID = :productID FOR UPDATE";
            $select_stmt = $this->conn->prepare($select_query);
            $select_stmt->bindParam(':productID', $this->ProductID, PDO::PARAM_INT);
            $select_stmt->execute();

            // Fetch the current quantity
            $currentQuantity = $select_stmt->fetchColumn();

            // Check if the quantity is enough to fulfill the order
            if ($currentQuantity < $this->Quantity) {
                throw new Exception("Insufficient quantity available.");
            }

            // Calculate the new quantity
            $newQuantity = $currentQuantity - $this->Quantity;

            // Update the product quantity in the database
            $update_query = "UPDATE Products SET Quantity = :quantity WHERE ProductID = :productID";
            $update_stmt = $this->conn->prepare($update_query);
            $update_stmt->bindParam(':quantity', $newQuantity, PDO::PARAM_INT);
            $update_stmt->bindParam(':productID', $this->ProductID, PDO::PARAM_INT);

            return $update_stmt->execute();
        } catch (Exception $e) {
            throw $e;
        }
    }

    // CRUD Methods
    public function Get_All_OrderDetails()
    {
        $query = "SELECT * FROM " . $this->table_name;
        $stmt = $this->conn->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Get_OrderDetails_By_ID($id)
    {
        $query = "SELECT * FROM " . $this->table_name . " WHERE OrderID = :queueid";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':queueid', $id);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function Create_OrderDetails()
    {
        // Define the SQL query
        $query = "INSERT INTO " . $this->table_name . " (Quantity, Price, OrderID, ProductID) VALUES (:Quantity, :Price, :OrderID, :ProductID)";

        // Prepare the SQL statement
        $stmt = $this->conn->prepare($query);

        // Bind parameters
        $stmt->bindParam(":Quantity", $this->Quantity);
        $stmt->bindParam(":Price", $this->Price);
        $stmt->bindParam(":OrderID", $this->OrderID);
        $stmt->bindParam(":ProductID", $this->ProductID);

        // Execute the statement and check for success
        if ($stmt->execute()) {
            return true;
        } else {
            // Output error information for debugging
            $errorInfo = $stmt->errorInfo();
            error_log("Error executing query: " . $errorInfo[2]);
            return false;
        }
    }

    public function GetLastID()
    {
        $sql = "SELECT MAX(OrderDetailsID) as LastID FROM " . $this->table_name;
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['LastID'] + 1;
    }

    public function Update_OrderDetails()
    {
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

    public function Delete_OrderDetails()
    {
        $query = "DELETE FROM " . $this->table_name . " WHERE OrderID = ?";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(1, $this->OrderDetailsID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
