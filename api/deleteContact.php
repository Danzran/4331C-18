<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "ContactAPI", "apipass", "Contact_Manager");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        //first time with php and idk if this is going to work
        //used the createContact.php but slightly modified it
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE (User_ID) Values (?)");
        $stmt->bind_param("i", $inData["User_ID"]);

        if ($stmt->execute()) 
        {
            returnWithInfo("Contact deleted successfully");
        } 
        else 
        {
            returnWithError("Failed to delete contact: " . $stmt->error);
        }

    }

    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    function returnWithError($err)
    {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($message)
    {
        $retValue = '{"message":"' . $message . '"}';
        sendResultInfoAsJson($retValue);
    }
    
?>
