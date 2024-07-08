<?php
class User
{
    private int $ID;
    private string $UserName;
    private string $Password;
    private string $Email;
    private string $ProfileImage;
    private Role $role;
    private $conn;
    
    
    public function __construct($db)
    {
        $this->conn = $db;
    }
    
    

    public function Get_User_Data_By_ID($id)
    {
        $sql = "SELECT * FROM users WHERE UserID = :id"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $this->ID = $result['UserID'];
            $this->UserName = $result['UserName'];
            $this->Password = $result['Password'];
            $this->Email = $result['Email'];
            $this->ProfileImage = $result['ProfileImage'];            
            $this->role = new Role($this->conn);
            $this->role->Get_Role_Data_By_ID($result['RoleID']);            
            return $result;
        } else {
            return null;
        }
    }


    public function Get_User_Data_By_Email($Email)
    {
        $sql = "SELECT * FROM users WHERE Email = :Email"; 
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':Email', $Email, PDO::PARAM_STR); 
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result) {
            $this->ID = $result['UserID'];
            $this->UserName = $result['UserName'];
            $this->Password = $result['Password'];
            $this->Email = $result['Email'];
            $this->ProfileImage = $result['ProfileImage'];            
            $this->role = new Role($this->conn);
            $this->role->Get_Role_Data_By_ID($result['RoleID']);            
            return $result;
        } else {
            return null;
        }
    }
    
    

    public function Display_User_Data()
    {
        return [
            'ID' => $this->ID,
            'UserName' => $this->UserName,
            'Email' => $this->Email,
            'ProfileImage' => $this->ProfileImage,
            'Role' => [
                'ID' => $this->role->getID(),
                'RoleName' => $this->role->getRoleName()
            ]
        ];
    }

    public function Verify_User($email, $password)
    {
        $sql = "SELECT * FROM users WHERE Email = :email AND Password = :password";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':email', $email, PDO::PARAM_STR);
        $stmt->bindParam(':password', $password, PDO::PARAM_STR);
        $stmt->execute();
        
        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            return true;
        } else {
            return false;
        }
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
    public function getUserName(): string
    {
        return $this->UserName;
    }

    public function setUserName(string $UserName)
    {
        $this->UserName = $UserName;
    }

    // Getter and Setter for Password
    public function getPassword(): string
    {
        return $this->Password;
    }

    public function setPassword(string $Password)
    {
        $this->Password = $Password;
    }

    // Getter and Setter for Email
    public function getEmail(): string
    {
        return $this->Email;
    }

    public function setEmail(string $Email)
    {
        $this->Email = $Email;
    }

    // Getter and Setter for ProfileImage
    public function getProfileImage(): string
    {
        return $this->ProfileImage;
    }

    public function setProfileImage(string $ProfileImage)
    {
        $this->ProfileImage = $ProfileImage;
    }



}
?>