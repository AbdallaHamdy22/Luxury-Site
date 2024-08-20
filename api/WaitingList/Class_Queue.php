<?php
class QueueList
{
    private int $QueueID;
    private int $UserID;
    private $conn;

    public function __construct($db)
    {
        $this->conn = $db;
    }
    public function Get_All_Queues()
    {
        $sql = "SELECT * FROM queuelist";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

        return $results;
    }

    public function Get_QueueList_Data_By_ID($id)
    {
        $sql = "SELECT * FROM queuelist WHERE QueueID = :id";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':id', $id, PDO::PARAM_INT);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($result) {
            $this->QueueID = $result['QueueID'];
            $this->UserID = $result['UserID'];
            return $result;
        } else {
            return null;
        }
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

    // Getter and Setter for UserID
    public function getUserID(): int
    {
        return $this->UserID;
    }

    public function setUserID(int $UserID): void
    {
        $this->UserID = $UserID;
    }

    public function Create_QueueList()
    {
        $sql = "INSERT INTO queuelist (QueueID, UserID) VALUES (:queueid, :userid)";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':queueid', $this->QueueID);
        $stmt->bindParam(':userid', $this->UserID);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }
    public function GetLastID()
    {
        $sql = "SELECT MAX(QueueID) as LastID FROM queuelist";
        $stmt = $this->conn->prepare($sql);
        $stmt->execute();

        $result = $stmt->fetch(PDO::FETCH_ASSOC);

        return $result['LastID'] + 1;
    }

    public function Update_QueueList()
    {
        $sql = "UPDATE queuelist SET UserID = :userid WHERE QueueID = :queueid";
        $stmt = $this->conn->prepare($sql);

        $stmt->bindParam(':userid', $this->UserID);
        $stmt->bindParam(':queueid', $this->QueueID);

        if ($stmt->execute()) {
            return true;
        }

        return false;
    }

    public function Delete_QueueList()
    {
        $sql = "DELETE FROM queuelist WHERE QueueID = :queueid";
        $stmt = $this->conn->prepare($sql);
        $stmt->bindParam(':queueid', $this->QueueID, PDO::PARAM_INT);

        return $stmt->execute();
    }
}
