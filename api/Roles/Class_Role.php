<?php
class Role
{
    private int $ID;
    private string $RoleName;
    private $conn;


    public function __construct($db)
    {
        $this->conn = $db;
    }

    // Getter and Setter for ID
    public function getID(): int
    {
        return $this->ID;
    }

    public function setID(int $ID)
    {
        $this->ID = $ID;
    }

    // Getter and Setter for UserName
    public function getRoleName(): string
    {
        return $this->RoleName;
    }

    public function setRoleName(string $RoleName)
    {
        $this->RoleName = $RoleName;
    }
    public function Get_Role_Data_By_ID($id)
    {
        try {
            $sql = "SELECT * FROM roles WHERE RoleID = :id";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':id', $id, PDO::PARAM_INT);
            $stmt->execute();

            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($result) {
                $this->ID = $result['RoleID'];
                $this->RoleName = $result['RoleName'];
                return $result;
            } else {
                return null; // Explicitly return null if no data found
            }
        } catch (Exception $e) {
            error_log("Error fetching role data: " . $e->getMessage());
            return null; // Return null on error
        }
    }
    public function Get_Role_Data()
    {
        try {
            $sql = "SELECT * FROM roles";
            $stmt = $this->conn->prepare($sql);           
            $stmt->execute();

            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($result) {                
                return $result;
            } else {
                return null; // Explicitly return null if no data found
            }
        } catch (Exception $e) {
            error_log("Error fetching role data: " . $e->getMessage());
            return null; // Return null on error
        }
    }
}
