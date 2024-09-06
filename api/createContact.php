<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "ContactAPI", "apipass", "Contact_Manager");
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("INSERT INTO Contacts (FirstName, LastName, Email, Phone, Address, User_ID) VALUES (?, ?, ?, ?, ?, ?)");
        
        // Ensure the keys match the exact JSON structure
        $stmt->bind_param("sssssi", $inData["FirstName"], $inData["LastName"], $inData["Email"], $inData["Phone"], $inData["Address"], $inData["User_ID"]);

        if ($stmt->execute()) 
        {
            returnWithInfo("Contact created successfully");
        } 
        else 
        {
            returnWithError("Failed to create contact: " . $stmt->error);
        }

        $stmt->close();
        $conn->close();
    }

    function getRequestInfo()
    {
        // Convert incoming JSON to associative array
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
