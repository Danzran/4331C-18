<?php

    $inData = getRequestInfo();

    $conn = new mysqli("localhost", "ContactAPI", "apipass", "Contact_Manager"); 	
    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        $stmt = $conn->prepare("UPDATE Contacts SET FirstName=?, LastName=?, Email=?, Phone=?, Address=? WHERE ID=? AND User_ID=?");
        $stmt->bind_param("ssssssi", 
            $inData["firstName"], 
            $inData["lastName"], 
            $inData["email"], 
            $inData["phone"], 
            $inData["address"], 
            $inData["id"], 
            $inData["userId"]
        );

        if ($stmt->execute()) 
        {
            if ($stmt->affected_rows > 0) 
            {
                returnWithInfo("Contact updated successfully.");
            } 
            else 
            {
                returnWithError("No contact found or no changes made.");
            }
        } 
        else 
        {
            returnWithError("Failed to update contact: " . $stmt->error);
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
        $retValue = '{"error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    function returnWithInfo($info)
    {
        $retValue = '{"result":"' . $info . '"}';
        sendResultInfoAsJson($retValue);
    }

?>
