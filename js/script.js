//const urlBase = 'http://microbialeight825.microbialeight.xyz/api';
const urlBase = '/api';
const extension = 'php';

let userID = 0;
let firstName = "";
let lastName = "";
let cID = 0;
let cFirstName = "";
let cLastName = "";
let cEmail = "";
let cPhone = "";
let cAddress = "";

function saveCookie()
{
	let minutes = 20;
	let date = new Date();
	date.setTime(date.getTime()+(minutes*60*1000));	
	document.cookie = "firstName=" + firstName + ",lastName=" + lastName + ",userId=" + userID +  ",cID=" + cID + ",cfirstName=" + cFirstName + ",cLastName=" + cLastName + ",cEmail=" + cEmail + ",cPhone=" + cPhone + ",cAddress=" + cAddress + ";expires=" + date.toGMTString();
    console.log("Out: " + document.cookie);
}

function readCookie()
{
	userID = -1;
	let data = document.cookie;
    console.log("In: " + data);
	let splits = data.split(",");
	for(var i = 0; i < splits.length; i++) 
	{
		let thisOne = splits[i].trim();
		let tokens = thisOne.split("=");
		if( tokens[0] == "firstName" )
		{
			firstName = tokens[1];
		}
		else if( tokens[0] == "lastName" )
		{
			lastName = tokens[1];
		}
		else if( tokens[0] == "userId" )
		{
			userID = parseInt( tokens[1].trim() );
		}
        else if( tokens[0] == "cId" )
        {
            cID = parseInt( tokens[1].trim() );
        }
        else if( tokens[0] == "cFirstName" )
        {
            cfirstName = tokens[1];
        }
        else if( tokens[0] == "cLastName" )
        {
            cLastName = tokens[1];
        }
        else if( tokens[0] == "cEmail" )
        {
            cEmail = tokens[1];
        }
        else if( tokens[0] == "cPhone" )
        {
            cPhone = tokens[1];
        }
        else if( tokens[0] == "cAddress" )
        {
            cAddress = tokens[1];
        }
	}
	
	if( userID < 0 )
	{
		window.location.href = "index.html";
	}
    else
    {
        let welcome = document.getElementById("welcome");
        if(welcome)
        {
            welcome.innerHTML = "Welcome, " + firstName + " " + lastName + ". ";
        }
    }
}
function doLogin()
{
    let url = urlBase + '/Login.' + extension;

    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let tmp = {login:username, password:password};
    let payload = JSON.stringify(tmp);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);

                userID = jsonObject.id;

                if(userID < 1)
                {
                    document.getElementById("loginResult").innerHTML = "Invalid username or password.";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;

                saveCookie();

                window.location.href = "dashboard.html"
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
    }
}
function doSignup(){
    let url = urlBase + '/Signup.' + extension;

    let firstname = document.getElementById("firstname-input").value;
    let lastname = document.getElementById("lastname-input").value;
    let username = document.getElementById("username-input").value;
    let password = document.getElementById("password-input").value;
    let confirmpassword = document.getElementById("confirm-password-input").value;

    if(!firstname || !lastname || !username || !password || !confirmpassword){
        document.getElementById("signupResult").innerHTML = "Please fill out all fields";
        return;
    }

    if(password !== confirmpassword){
        document.getElementById("signupResult").innerHTML = "Passwords do not match";
        return;
    }

    let tmp = {FirstName: firstname, LastName: lastname, Login: username, Password: password};
    let payload = JSON.stringify(tmp);

    let xhr = newHTTPRequest();
    xhr.open("POST",url,true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    
    xhr.onreadystatechange = function(){
        if(this.readyState == 4){
            if(this.status == 200){
                let response = JSON.parse(xhr.responseText);

                if(response.error){
                        document.getElementById("signupResult").innerHTML = response.error;
                }else {
                    document.getElementById("signupResult").innerHTML = response.message;
                    if(response.message === "User registered successfully"){
                        window.location.href = "login.html"
                        }
                    }
                } 
            }
        };
    xhr.send(payload);
}
function addContact()
{
    let url = urlBase + "/Create." + extension;

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if(!firstName || !lastName || !email || !phone || !address)
    {
        document.getElementById("addResult").innerHTML = "Please fill out all fields!";
        return;
    }

    let tmp = {userID: userID, firstName: firstName, lastName: lastName, email: email, phone: phone, address: address};
    let payload = JSON.stringify(tmp);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                document.getElementById("addResult").innerHTML = "Contact created successfully."
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = "Could not create contact!";
    }
    
}
function editContact(contactID)
{
    let url = urlBase + '/Edit.' + extension;

    let firstName = document.getElementById("firstName").value;
    let lastName = document.getElementById("lastName").value;
    let email = document.getElementById("email").value;
    let phone = document.getElementById("phone").value;
    let address = document.getElementById("address").value;

    if(!firstName || !lastName || !email || !phone || !address)
    {
        document.getElementById("editResult").innerHTML = "Please fill out all fields!";
        return;
    }
    
    let tmp = {userID: userID, firstName: firstName, lastName: lastName, email: email, phone: phone, address: address};
    let payload = JSON.stringify(tmp);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                document.getElementById("editResult").innerHTML = "Contact updated successfully."
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = "Could not update contact!";
    }
}
function deleteContact(contactID)
{
    let url = urlBase + '/Delete.' + extension;

    let tmp = {userID: userID, contactID: contactID};
    let payload = JSON.stringify(tmp);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                alert("Contact deleted.");
                doSearch();
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        alert("Error deleting contact.")
    }
}
function doSearch()
{
    let url = urlBase + '/Search.' + extension;

    let name = document.getElementById("searchName").value;

    let tmp = {name:name, id:userID};
    let payload = JSON.stringify(tmp);

    let xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
    try
    {
        xhr.onreadystatechange = function()
        {
            if(this.readyState == 4 && this.status == 200)
            {
                let jsonObject = JSON.parse(xhr.responseText);

                removeElementsByClass("ContactDisplay");

                let parent = document.getElementById("searchResultTable");
                for(let i = 0; i < jsonObject.length; i++)
                {
                    let info = jsonObject[i];
                    makeContactDisplay(info, parent);
                }
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        document.getElementById("searchResult").innerHTML = err.message;
    }
}

function removeElementsByClass(className)
{
    let elements = document.getElementsByClassName(className);
    while(elements.length > 0)
    {
        elements[0].innerHTML = '';
        elements[0].parentNode.removeChild(elements[0]);
    }
}
function makeContactDisplay(info, parent)
{
    console.log("Making...");
    let row = document.createElement("tr");
    row.className = "ContactDisplay";
    parent.appendChild(row);

    let name = document.createElement("td");
    name.innerHTML = info[1] + " " + info[2];
    row.appendChild(name);

    let email = document.createElement("td");
    email.innerHTML = info[3];
    row.appendChild(email);

    let phone = document.createElement("td");
    phone.innerHTML = info[4];
    row.appendChild(phone);

    let addy = document.createElement("td");
    addy.innerHTML = info[5];
    row.appendChild(addy);

    let controls = document.createElement("td");
    row.appendChild(controls);

    let edit = document.createElement("a");
    edit.innerHTML = "Edit | ";
    controls.appendChild(edit);
    edit.href = "edit-contact.html";
    edit.onclick = function()
    {

    };

    let del = document.createElement("a");
    del.innerHTML = "Delete";
    controls.appendChild(del);
    del.href = "#";
    del.onclick = function() 
    { 
        deleteContact(info[0]);
        
    };
}

function returnToDash()
{
    window.location.href = "dashboard.html"
}
