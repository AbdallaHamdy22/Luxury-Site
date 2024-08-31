<?php
class Color
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
    
    // Getter and Setter for UserName
    public function getName(): string
    {
        return $this->Name;
    }

    public function setName(string $Name)
    {
        $this->Name = $Name;
    }
    public function Create_Color()
    {
        $sql = "INSERT INTO prodcut_color (Name) VALUES (:name)";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':name', $this->Name);
        

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function Get_Color_Data_With_Pagination($start=0, $limit=6)
    {
        $sql = "SELECT * FROM prodcut_color LIMIT :start, :limit";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':start', $start, PDO::PARAM_INT);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function Get_Total_Color_Count()
    {
        $sql = "SELECT COUNT(*) as count FROM prodcut_color";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'];
    }


    public function Get_Color_Data_By_ID($id)
    {
        $sql = "SELECT * FROM prodcut_color WHERE Color_ID = :id"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $this->ID = $result['Color_ID'];
            $this->Name = $result['Name'];                                  
            return $result;
        } else {
            return null;
        }
    }
    public function Update_Color()
    {
        $sql = "UPDATE prodcut_color SET Name = :name WHERE Color_ID = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':name', $this->Name);
        $stmt->bindParam(':id', $this->ID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }

    public function Delete_Color()
    {
        $sql = "DELETE FROM prodcut_color WHERE Color_ID = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $this->ID);

        if ($stmt->execute()) {
            return true;
        }
        return false;
    }
    public function Get_All_Color_Data()
    {
        $sql = "SELECT * FROM prodcut_color"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

}
?>