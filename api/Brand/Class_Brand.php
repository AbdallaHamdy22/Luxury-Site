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
        public function Create_Brand()
        {
            $sql = "INSERT INTO brand (BrandID , Name, Image) VALUES (:ID, :Name, :Image)";
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
            $sql = "SELECT MAX(BrandID) as LastID FROM brand";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result['LastID']+1;
        }
        public function Update_Brand()
        {
            $sql = "UPDATE brand SET Name = :Name, Image = :Image WHERE BrandID = :ID";
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
        public function Delete_Brand()
    {
        $sql = "DELETE FROM brand WHERE BrandID = :ID";
        $stmt = $this->conn->prepare($sql);

        // Bind data
        $stmt->bindParam(':ID', $this->ID);

        // Execute query
        if($stmt->execute()){
            return true;
        }
        return false;
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
        public function Get_Brand_Data_With_Pagination($start=0, $limit=6)
        {
            $sql = "SELECT * FROM brand LIMIT :start, :limit";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':start', $start, PDO::PARAM_INT);
            $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
            $stmt->execute();
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $results;
        }

        public function Get_Total_Brands_Count()
        {
            $sql = "SELECT COUNT(*) as count FROM brand";
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            
            $result = $stmt->fetch(PDO::FETCH_ASSOC);

            return $result['count'];
        }
        public function Get_All_Brand_Data()
        {
            $sql = "SELECT * FROM brand"; 
            $stmt = $this->conn->prepare($sql);
            $stmt->execute();
            
            
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

            return $results;
        }
        
        public function searchByName($name)
        {
            $sql = "SELECT * FROM brand WHERE Name LIKE :name";
            $stmt = $this->conn->prepare($sql);
            $name = "%$name%"; // Add wildcards for partial matching
            $stmt->bindParam(':name', $name, PDO::PARAM_STR);
            $stmt->execute();
    
            $results = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
            return $results;
        }
    }
    ?>