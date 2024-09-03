
<?php

	$inData = getRequestInfo();

	$conn = new mysqli("localhost", "ContactAPI", "apipass", "Contact_Manager"); 	
	if( $conn->connect_error )
	{
		returnWithError( $conn->connect_error );
	}
	else
	{
		$paddedName = "%" . $inData["name"] . "%";
		$stmt = $conn->prepare("SELECT ID, FirstName, LastName, Email, Phone, Address FROM Contacts WHERE (LOWER(FirstName) LIKE Lower(?) OR LOWER(LastName) LIKE LOWER(?) OR LOWER(CONCAT(FirstName, ' ', LastName)) LIKE LOWER(?)) AND User_ID = ?");
		$stmt->bind_param("ssss", $paddedName, $paddedName, $paddedName, $inData["id"]);
		$stmt->execute();
		$result = $stmt->get_result();

		if($arr = $result->fetch_all())
		{
			returnWithInfo($arr);
		}
		else
		{
			returnWithError("No records found.");
		}

		$stmt->close();
		$conn->close();
	}
	
	function getRequestInfo()
	{
		return json_decode(file_get_contents('php://input'), true);
	}

	function sendResultInfoAsJson( $obj )
	{
		header('Content-type: application/json');
		echo $obj;
	}
	
	function returnWithError( $err )
	{
		$retValue = '{"id":0,"firstName":"","lastName":"","error":"' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}
	
	function returnWithInfo( $resArray)
	{
		$retValue = json_encode($resArray);
		sendResultInfoAsJson( $retValue );
	}
	
?>
