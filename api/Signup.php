<?php

    $inData = getRequestInfo();

    // Connect to the database
    $conn = new mysqli("localhost", "ContactAPI", "apipass", "Contact_Manager");

    if ($conn->connect_error) 
    {
        returnWithError($conn->connect_error);
    } 
    else 
    {
        // Check if the login already exists
        $stmt = $conn->prepare("SELECT ID FROM Logins WHERE Login = ?");
        $stmt->bind_param("s", $inData["Login"]);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) 
        {
            returnWithError("Login already exists.");
        } 
        else 
        {

            // Insert the new user into the Logins table
            $stmt = $conn->prepare("INSERT INTO Logins (FirstName, LastName, Login, Password) VALUES (?, ?, ?, ?)");
            $stmt->bind_param("ssss", $inData["FirstName"], $inData["LastName"], $inData["Login"], $hashedPassword);

            if ($stmt->execute()) 
            {
                returnWithInfo("User registered successfully.");
            } 
            else 
            {
                returnWithError("Error registering user: " . $stmt->error);
            }
        }

        $stmt->close();
        $conn->close();
    }

    // Function to retrieve JSON input data
    function getRequestInfo()
    {
        return json_decode(file_get_contents('php://input'), true);
    }

    // Function to send JSON response
    function sendResultInfoAsJson($obj)
    {
        header('Content-type: application/json');
        echo $obj;
    }

    // Function to return an error in JSON format
    function returnWithError($err)
    {
        $retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
        sendResultInfoAsJson($retValue);
    }

    // Function to return a success message in JSON format
    function returnWithInfo($message)
    {
        $retValue = '{"message":"' . $message . '"}';
        sendResultInfoAsJson($retValue);
    }

?>
