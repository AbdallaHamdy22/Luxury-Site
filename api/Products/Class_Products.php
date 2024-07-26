<?php
class Products
{
    private int $ID;
    private string $Name;
    private string $Description = '';
    private int $Productionyear;
    private float $Price;
    private float $UserPrice = 0;
    private float $Quantity = 0;
    private string $Image;
    private float $OfferPrice = 0;
    private Brand $Brand;
    private Categoire $Categoire;
    private Color $Color;
    private Sex $Sex;
    private $conn;


    public function __construct($db)
    {
        $this->conn = $db;
        $this->Brand = new Brand($db);
        $this->Categoire = new Categoire($db);
        $this->Color = new Color($db);
        $this->Sex = new Sex($db);
    }

    public function checkProductsByOtherID($brandID, $type)
    {
        $query = "SELECT COUNT(*) as count FROM Products WHERE " . $type . " = :brandID";
        $stmt = $this->conn->prepare($query);
        $stmt->bindParam(':brandID', $brandID);
        $stmt->execute();

        $row = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($row['count'] > 0) {
            return true;
        }

        return false;
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
            $this->UserPrice = $result['UserPrice'];
            $this->Productionyear = $result['ProductionYear'];
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
    public function Get_Product_Data_With_Pagination($start = 0, $limit = 6)
    {
        $sql = "SELECT p.*, 
                       b.Name AS BrandName, 
                       c.Name AS CategoryName, 
                       col.Name AS ColorName, 
                       s.Name AS SexName
                FROM products p
                LEFT JOIN brand b ON p.BrandID = b.BrandID
                LEFT JOIN categoire c ON p.CategoireID = c.CategoireID
                LEFT JOIN prodcut_color col ON p.Color_ID = col.Color_ID
                LEFT JOIN sex s ON p.SexID = s.SexID
                LIMIT :start, :limit";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':start', $start, PDO::PARAM_INT);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return $results;
    }
    public function getSex()
    {
        return $this->Sex;
    }

    public function Get_Total_Product_Count()
    {
        $sql = "SELECT COUNT(*) as count FROM products";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'];
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
    public function getID(): int
    {
        return $this->ID;
    }

    public function setID(int $ID): void
    {
        $this->ID = $ID;
    }

    // Getter and Setter for Name
    public function getName(): string
    {
        return $this->Name;
    }

    public function setName(string $Name): void
    {
        $this->Name = $Name;
    }
    public function Delete_Product()
    {
        $sql = "DELETE FROM products WHERE ProductID = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $this->ID, PDO::PARAM_INT);

        return $stmt->execute();
    }

    // Getter and Setter for Description
    public function setDescription(string $Description): void
    {
        $this->Description = $Description;
    }

    public function getDescription(): string
    {
        return $this->Description;
    }

    public function setProduction_year(string $Production_year): void
    {
        $this->Productionyear = $Production_year;
    }
    public function getProduction_year(): string
    {
        return $this->Productionyear;
    }

    // Getter and Setter for Price
    public function getPrice(): float
    {
        return $this->Price;
    }

    public function setPrice(float $Price): void
    {
        $this->Price = $Price;
    }
    public function getUserPrice(): float
    {
        return $this->UserPrice;
    }

    public function setUSerPrice(float $UserPrice): void
    {
        $this->UserPrice = $UserPrice;
    }

    // Getter and Setter for Quantity
    public function getQuantity(): float
    {
        return $this->Quantity;
    }

    public function setQuantity(float $Quantity): void
    {
        $this->Quantity = $Quantity;
    }

    // Getter and Setter for Image
    public function getImage(): string
    {
        return $this->Image;
    }

    public function setImage(string $Image): void
    {
        $this->Image = $Image;
    }

    // Getter and Setter for OfferPrice
    public function getOfferPrice(): float
    {
        return $this->OfferPrice;
    }

    public function setOfferPrice(float $OfferPrice): void
    {
        $this->OfferPrice = $OfferPrice;
    }
    public function setBrandID($brandID)
    {

        $this->Brand->setID($brandID);
    }
    public function setCategoryID($CategoryID)
    {

        $this->Categoire->setID($CategoryID);
    }
    public function setColorID($colorID)
    {

        $this->Color->setID($colorID);
    }
    public function setSexID($SexID)
    {

        $this->Sex->setID($SexID);
    }
    public function Create_Product()
    {
        $sql = "INSERT INTO products 
            (ProductID, Name, Description, ProductionYear, BraceletMaterial, Price,UserPrice, Quantity, Image, OfferPrice, BrandID, CategoireID, Color_ID, SexID)
            VALUES 
            (:productid, :name, :description, :productionyear, :braceletmaterial, :price,:UserPrice, :quantity, :image, :offerprice, :brandid, :categoireid, :colorid, :sexid)";
        $stmt = $this->conn->prepare($sql);

        // Define variables for the values to be bound
        $brandid = $this->Brand->getID();
        $categoireid = $this->Categoire->getID();
        $colorid = $this->Color->getID();
        $sexid = $this->Sex->getID();

        $stmt->bindParam(':productid', $this->ID);
        $stmt->bindParam(':name', $this->Name);
        $stmt->bindParam(':description', $this->Description);
        $stmt->bindParam(':productionyear', $this->Productionyear);
        $stmt->bindParam(':price', $this->Price);
        $stmt->bindParam(':UserPrice', $this->UserPrice);
        $stmt->bindParam(':quantity', $this->Quantity);
        $stmt->bindParam(':image', $this->Image);
        $stmt->bindParam(':offerprice', $this->OfferPrice);
        $stmt->bindParam(':brandid', $brandid);
        $stmt->bindParam(':categoireid', $categoireid);
        $stmt->bindParam(':colorid', $colorid);
        $stmt->bindParam(':sexid', $sexid);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }



    // Get the last inserted ID
    public function GetLastID()
    {
        $sql = "SELECT MAX(ProductID) as LastID FROM products";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['LastID'];
    }
    public function Update_Product()
    {
        $sql = "UPDATE products SET 
            Name = :name,
            Description = :description,
            ProductionYear = :productionyear,
            BraceletMaterial = :braceletmaterial,
            Price = :price,
            Quantity = :quantity,
            Image = :image,
            OfferPrice = :offerprice,
            BrandID = :brandid,
            CategoireID = :categoireid,
            Color_ID = :colorid,
            SexID = :sexid
            WHERE ProductID = :productid";

        $stmt = $this->conn->prepare($sql);

        $brandid = $this->Brand->getID();
        $categoireid = $this->Categoire->getID();
        $colorid = $this->Color->getID();
        $sexid = $this->Sex->getID();

        $stmt->bindParam(':name', $this->Name);
        $stmt->bindParam(':description', $this->Description);
        $stmt->bindParam(':productionyear', $this->Productionyear);
        $stmt->bindParam(':price', $this->Price);
        $stmt->bindParam(':quantity', $this->Quantity);
        $stmt->bindParam(':image', $this->Image);
        $stmt->bindParam(':offerprice', $this->OfferPrice);
        $stmt->bindParam(':brandid', $brandid); // Use variable
        $stmt->bindParam(':categoireid', $categoireid); // Use variable
        $stmt->bindParam(':colorid', $colorid); // Use variable
        $stmt->bindParam(':sexid', $sexid); // Use variable
        $stmt->bindParam(':productid', $this->ID);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
}
