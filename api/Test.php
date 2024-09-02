<?php

    $inData = getRequestInfo();

    $input = $inData['text'];

    if($conn->connect_error)
    {
        returnWithError($conn->connect_error);
    }
    else
    {
        returnWithInfo('You gave me ' . $input);
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
		$retValue = '{"error":' . $err . '"}';
		sendResultInfoAsJson( $retValue );
	}

    function returnWithInfo( $testInfo )
	{
		$retValue = '{"text":"' . $testInfo . '"}';
		sendResultInfoAsJson( $retValue );
	}
?>