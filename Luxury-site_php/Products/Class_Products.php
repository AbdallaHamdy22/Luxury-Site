<?php
class Products
{
    private int $ID;
    private string $Name;
    private string $Description;
    private int $Productionyear;
    private string $BraceletMaterial;
    private float $Price;
    private float $Quantity;
    private string $Image;
    private float $OfferPrice;
    private Brand $Brand;
    private Categoire $Categoire;
    private Color $Color;
    private Sex $Sex;
    private $conn;
    
    
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    

    public function Get_Product_Data_By_ID($id)
    {
        $sql = "SELECT * FROM products WHERE ProductID = :id"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $this->ID = $result['ProductID'];
            $this->Name = $result['Name'];
            $this->Description = $result['Description'];
            $this->Price = $result['Price'];
            $this->Quantity = $result['Quantity'];            
            $this->Image = $result['Image'];   
            $this->OfferPrice = $result['OfferPrice']; 
            $this->Productionyear = $result['Production Year'];
            $this->BraceletMaterial = $result['Bracelet Material'];
            $this->Brand = new Brand($this->conn);
            $this->Brand->Get_Brand_Data_By_ID($result['CategoireID']); 
            $this->Categoire = new Categoire($this->conn);
            $this->Categoire->Get_Categoire_Data_By_ID($result['BrandID']); 
            $this->Color = new Color($this->conn);
            $this->Color->Get_Color_Data_By_ID($result['Color_ID']); 
            $this->Sex = new Sex($this->conn);
            $this->Sex->Get_Sex_Data_By_ID($result['SexID']); 
            return $result;
        } else {
            return null;
        }
    }
    
    public function Get_Latest_Products()
    {
        $sql = "SELECT * FROM products ORDER BY ProductID DESC LIMIT 4";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function Get_All_Product_Data()
    {
        $sql = "SELECT * FROM products"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();
        
        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    // Getter and Setter for ID
    public function getID(): int {
        return $this->ID;
    }

    public function setID(int $ID): void {
        $this->ID = $ID;
    }

    // Getter and Setter for Name
    public function getName(): string {
        return $this->Name;
    }

    public function setName(string $Name): void {
        $this->Name = $Name;
    }

    // Getter and Setter for Description
    public function setDescription(string $Description): void {
        $this->Description = $Description;
    }

    public function getDescription(): string {
        return $this->Description;
    }

    public function setProduction_year(string $Production_year): void {
        $this->Productionyear = $Production_year;
    }
    public function getProduction_year(): string {
        return $this->Productionyear;
    }

    public function setBracelet_Material(string $Bracelet_Material): void {
        $this->BraceletMaterial = $Bracelet_Material;
    }
    public function getBracelet_Material(): string {
        return $this->BraceletMaterial;
    }

    

    // Getter and Setter for Price
    public function getPrice(): float {
        return $this->Price;
    }

    public function setPrice(float $Price): void {
        $this->Price = $Price;
    }

    // Getter and Setter for Quantity
    public function getQuantity(): float {
        return $this->Quantity;
    }

    public function setQuantity(float $Quantity): void {
        $this->Quantity = $Quantity;
    }

    // Getter and Setter for Image
    public function getImage(): string {
        return $this->Image;
    }

    public function setImage(string $Image): void {
        $this->Image = $Image;
    }

    // Getter and Setter for OfferPrice
    public function getOfferPrice(): float {
        return $this->OfferPrice;
    }

    public function setOfferPrice(float $OfferPrice): void {
        $this->OfferPrice = $OfferPrice;
    }         


}
?>