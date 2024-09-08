<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "ContactAPI", "apipass", "Contact_Manager");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        // Correct DELETE query using ID and User_ID
        $stmt = $conn->prepare("DELETE FROM Contacts WHERE ID = ? AND User_ID = ?");
        $stmt->bind_param("ii", $inData["contactID"], $inData["userID"]);

        if ($stmt->execute()) 
        {
            if ($stmt->affected_rows > 0)
            {
                returnWithInfo("Contact deleted successfully");
            } 
            else 
            {
                returnWithError("No contact found to delete.");
            }
        } 
        else 
        {
            returnWithError("Failed to delete contact: " . $stmt->error);
        }

        $stmt->close();
        $conn->close();
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
