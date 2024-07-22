<?php
class Sex
{
    private int $ID;
    private string $Name;    
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
    
    // Getter and Setter for Name
    public function getName(): string
    {
        return $this->Name;
    }

    public function setName(string $Name)
    {
        $this->Name = $Name;
    }
    public function Get_Gender_Data_With_Pagination($start=0, $limit=6)
    {
        $sql = "SELECT * FROM sex LIMIT :start, :limit";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':start', $start, PDO::PARAM_INT);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function Get_Total_Gender_Count()
    {
        $sql = "SELECT COUNT(*) as count FROM sex";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'];
    }
    public function Get_Sex_Data_By_ID($id)
    {
        $sql = "SELECT * FROM sex WHERE SexID = :id"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $this->ID = $result['SexID'];
            $this->Name = $result['Name']; 
                                 
            return $result;
        } else {
            return null;
        }
    }

    public function Get_All_Sex_Data()
    {
        $sql = "SELECT * FROM sex"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }
    public function Create_Sex()
    {
        $sql = "INSERT INTO sex (SexID,Name) VALUES (:ID,:name)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':name', $this->Name);
        $stmt->bindParam(':ID', $this->ID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function GetLastID()
    {
        $sql = "SELECT MAX(SexID) as LastID FROM sex";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['LastID'];
    }

    public function Update_Sex()
    {
        $sql = "UPDATE sex SET Name = :name WHERE SexID = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':name', $this->Name);
        $stmt->bindParam(':id', $this->ID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function Delete_Sex()
    {
        $sql = "DELETE FROM sex WHERE SexID = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $this->ID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
}
?>
