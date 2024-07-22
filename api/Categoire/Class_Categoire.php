<?php
class Categoire
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
    
    // Getter and Setter for Name
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

    public function Get_Categoire_Data_By_ID($id)
    {
        $sql = "SELECT * FROM Categoire WHERE CategoireID = :id"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $this->ID = $result['CategoireID'];
            $this->Name = $result['Name']; 
            $this->Image = $result['Image'];                       
            return $result;
        } else {
            return null;
        }
    }

    public function Get_All_Categoire_Data()
    {
        $sql = "SELECT * FROM Categoire"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function Get_Categoire_Data_With_Pagination($start=0, $limit=6)
    {
        $sql = "SELECT * FROM Categoire LIMIT :start, :limit";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':start', $start, PDO::PARAM_INT);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function Get_Total_Categories_Count()
    {
        $sql = "SELECT COUNT(*) as count FROM Categoire";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'];
    }

    public function Create_Categoire()
    {
        $sql = "INSERT INTO Categoire (CategoireID , Name, Image) VALUES (:ID, :Name, :Image)";
        $stmt = $this->conn->prepare($sql);

        // Bind data
        $stmt->bindParam(':ID', $this->ID);
        $stmt->bindParam(':Name', $this->Name);
        $stmt->bindParam(':Image', $this->Image);

        // Execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }

    public function GetLastID()
    {
        $sql = "SELECT MAX(CategoireID) as LastID FROM Categoire";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['LastID']+1;
    }
    public function Update_Categoire()
    {
        $sql = "UPDATE Categoire SET Name = :Name, Image = :Image WHERE CategoireID = :ID";
        $stmt = $this->conn->prepare($sql);

        // Bind data
        $stmt->bindParam(':ID', $this->ID);
        $stmt->bindParam(':Name', $this->Name);
        $stmt->bindParam(':Image', $this->Image);

        // Execute query
        if($stmt->execute()){
            return true;
        }
        return false;
    }
    public function Delete_Categoire()
{
    $sql = "DELETE FROM Categoire WHERE CategoireID = :ID";
    $stmt = $this->conn->prepare($sql);

    // Bind data
    $stmt->bindParam(':ID', $this->ID);

    // Execute query
    if($stmt->execute()){
        return true;
    }
    return false;
}

}
?>
