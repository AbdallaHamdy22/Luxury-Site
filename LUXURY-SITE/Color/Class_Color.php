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