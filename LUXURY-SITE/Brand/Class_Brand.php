<?php
class Brand
{
    private int $ID;
    private string $Name;
    private string $Image;
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

    // Getter and Setter for Image
    public function getImage(): string
    {
        return $this->Image;
    }

    public function setImage(string $Image)
    {
        $this->Image = $Image;
    }

    public function Get_Brand_Data_By_ID($id)
    {
        $sql = "SELECT * FROM brand WHERE BrandID = :id"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $this->ID = $result['BrandID'];
            $this->Name = $result['Name']; 
            $this->Image = $result['Image'];                       
            return $result;
        } else {
            return null;
        }
    }
    public function Get_All_Brand_Data()
    {
        $sql = "SELECT * FROM brand"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

}
?>