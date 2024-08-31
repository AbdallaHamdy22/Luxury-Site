<?php
class QueueDetails
{
    private string $ProductName = '';
    private string $ProductDescription = '';
    private float $Quantity = 0;
    private int $CategoireID = 0;
    private int $BrandID = 0;
    private int $SexID = 0;
    private int $ColorID = 0;
    private int $QueueID = 0;
    private int $UserID = 0;
    private string $Status = '';
    private string $Image = '';
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }

    public function Get_Queue_Details_By_QueueID($queueID)
    {
        $sql = "SELECT * FROM queuedetails WHERE QueueID = :queueid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':queueid', $queueID, PDO::PARAM_INT);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    // Getter and Setter for ProductName
    public function getProductName(): string
    {
        return $this->ProductName;
    }

    public function setProductName(string $ProductName): void
    {
        $this->ProductName = $ProductName;
    }

    // Getter and Setter for ProductDescription
    public function getProductDescription(): string
    {
        return $this->ProductDescription;
    }

    public function setProductDescription(string $ProductDescription): void
    {
        $this->ProductDescription = $ProductDescription;
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

    // Getter and Setter for CategoireID
    public function getCategoireID(): int
    {
        return $this->CategoireID;
    }

    public function setCategoireID(int $CategoireID): void
    {
        $this->CategoireID = $CategoireID;
    }

    // Getter and Setter for BrandID
    public function getBrandID(): int
    {
        return $this->BrandID;
    }

    public function setBrandID(int $BrandID): void
    {
        $this->BrandID = $BrandID;
    }

    // Getter and Setter for SexID
    public function getSexID(): int
    {
        return $this->SexID;
    }

    public function setSexID(int $SexID): void
    {
        $this->SexID = $SexID;
    }

    // Getter and Setter for ColorID
    public function getColorID(): int
    {
        return $this->ColorID;
    }

    public function setColorID(int $ColorID): void
    {
        $this->ColorID = $ColorID;
    }

    // Getter and Setter for QueueID
    public function getQueueID(): int
    {
        return $this->QueueID;
    }

    public function setQueueID(int $QueueID): void
    {
        $this->QueueID = $QueueID;
    }
    public function getUserID(): int
    {
        return $this->UserID;
    }

    public function setUserID(int $UserID): void
    {
        $this->UserID = $UserID;
    }
    // Getter and Setter for Image
    public function getStatus(): string
    {
        return $this->Status;
    }

    public function setStatus(string $Status): void
    {
        $this->Status = $Status;
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

    public function Create_QueueDetail()
    {
        $sql = "INSERT INTO queuedetails 
                (ProductName, ProductDescription, Quantity, CategoireID, BrandID, SexID, Color_ID, QueueID, Image, UserID, Status) 
                VALUES 
                (:productname, :productdescription, :quantity, :categoireid, :brandid, :sexid, :colorid, :queueid, :image, :userid, :status)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':productname', $this->ProductName);
        $stmt->bindParam(':productdescription', $this->ProductDescription);
        $stmt->bindParam(':quantity', $this->Quantity);
        $stmt->bindParam(':categoireid', $this->CategoireID);
        $stmt->bindParam(':brandid', $this->BrandID);
        $stmt->bindParam(':sexid', $this->SexID);
        $stmt->bindParam(':colorid', $this->ColorID);
        $stmt->bindParam(':queueid', $this->QueueID);
        $stmt->bindParam(':image', $this->Image);
        $stmt->bindParam(':userid', $this->UserID);
        $stmt->bindParam(':status', $this->Status);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function Update_QueueDetail()
    {
        $sql = "UPDATE queuedetails SET 
                ProductName = :productname, 
                ProductDescription = :productdescription,
                Quantity = :quantity, 
                CategoireID = :categoireid, 
                BrandID = :brandid, 
                SexID = :sexid, 
                Color_ID = :colorid,
                Image = :image,
                UserID = :userid,
                Status = :status
                WHERE QueueID = :queueid";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':productname', $this->ProductName);
        $stmt->bindParam(':productdescription', $this->ProductDescription);
        $stmt->bindParam(':quantity', $this->Quantity);
        $stmt->bindParam(':categoireid', $this->CategoireID);
        $stmt->bindParam(':brandid', $this->BrandID);
        $stmt->bindParam(':sexid', $this->SexID);
        $stmt->bindParam(':colorid', $this->ColorID);
        $stmt->bindParam(':queueid', $this->QueueID);
        $stmt->bindParam(':image', $this->Image);
        $stmt->bindParam(':userid', $this->UserID);
        $stmt->bindParam(':status', $this->Status);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function Delete_QueueDetail()
    {
        $sql = "DELETE FROM queuedetails WHERE QueueID = :queueid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':queueid', $this->QueueID, PDO::PARAM_INT);

        return $stmt->execute();
    }
}
