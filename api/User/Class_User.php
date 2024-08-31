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
    public function Get_Total_User_Count()
    {
        $sql = "SELECT COUNT(*) as count FROM users";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['count'];
    }
    public function Get_User_Data_With_Pagination($start = 0, $limit = 6)
    {
        $sql = "SELECT * FROM users LIMIT :start, :limit";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':start', $start, PDO::PARAM_INT);
        $stmt->bindParam(':limit', $limit, PDO::PARAM_INT);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }
    public function registerUser($data)
    {
        try {
            $this->UserName = $data->fName . ' ' . $data->lName;
            $this->Password = $data->Password;
            $this->Email = $data->Email;
            $this->ProfileImage = '';
            $roleID = 2;

            $sql = "INSERT INTO users (UserName, Password, Email, ProfileImage, RoleID) VALUES (:UserName, :Password, :Email, :ProfileImage, :RoleID)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':UserName', $this->UserName);
            $stmt->bindParam(':Password', $this->Password);
            $stmt->bindParam(':Email', $this->Email);
            $stmt->bindParam(':ProfileImage', $this->ProfileImage);
            $stmt->bindParam(':RoleID', $roleID);

            if ($stmt->execute()) {

                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return false;
        }
    }
    public function deleteuser()
    {
        $sql = "DELETE FROM users WHERE UserID = :userid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':userid', $this->ID, PDO::PARAM_INT);

        return $stmt->execute();
    }
    public function createuser($data)
    {
        try {
            $this->UserName = $data->fName . ' ' . $data->lName;
            $this->Password = $data->Password;
            $this->Email = $data->Email;
            $this->ProfileImage = '';
            $roleID = $data->roleid;

            $sql = "INSERT INTO users (UserName, Password, Email, ProfileImage, RoleID) VALUES (:UserName, :Password, :Email, :ProfileImage, :RoleID)";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':UserName', $this->UserName);
            $stmt->bindParam(':Password', $this->Password);
            $stmt->bindParam(':Email', $this->Email);
            $stmt->bindParam(':ProfileImage', $this->ProfileImage);
            $stmt->bindParam(':RoleID', $roleID);

            if ($stmt->execute()) {

                return true;
            } else {
                return false;
            }
        } catch (Exception $e) {
            return false;
        }
    }
    public function updateUserDetails()
    {
        try {
            $sql = "UPDATE users SET UserName = :UserName, Password = :Password, Email = :Email, ProfileImage = :ProfileImage WHERE UserID = :UserID";
            $stmt = $this->conn->prepare($sql);
            $stmt->bindParam(':UserID', $this->ID, PDO::PARAM_INT);
            $stmt->bindParam(':UserName', $this->UserName, PDO::PARAM_STR);
            $stmt->bindParam(':Password', $this->Password, PDO::PARAM_STR);
            $stmt->bindParam(':Email', $this->Email, PDO::PARAM_STR);
            $stmt->bindParam(':ProfileImage', $this->ProfileImage, PDO::PARAM_STR);

            return $stmt->execute();
        } catch (Exception $e) {
            return false;
        }
    }

    public function Get_User_Data_By_ID($id)
    {
        try {
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
        } catch (Exception $e) {
            error_log("Error fetching user data: " . $e->getMessage());
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
