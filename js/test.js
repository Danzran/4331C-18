//const urlBase = 'http://microbialeight825.microbialeight.xyz/api';
const urlBase = '/api';
const extension = 'php';

let userID = 0;
let firstName = "";
let lastName = "";

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

                userId = jsonObject.id;

                if(userId < 1)
                {
                    document.getElementById("loginResult").innerHTML = "Invalid username or password.";
                    return;
                }

                firstName = jsonObject.firstName;
                lastName = jsonObject.lastName;
                userID = jsonObject.id;
                document.getElementById("loginResult").innerHTML = "Welcome, " + firstName + " " + lastName + "!";
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        document.getElementById("loginResult").innerHTML = err.message;
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

                for(let i = 0; i < jsonObject.length; i++)
                {
                    let info = jsonObject[i];
                    let elem = document.createElement("p");
                    document.body.appendChild(elem);
                    elem.setAttribute("class", "ContactDisplay");
                    elem.innerHTML = "Name: " + info[1] + " " + info[2] + " Email: " + info[3] + " Phone: " + info[4] + " Address: " + info[4]; 
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
        elements[0].parentNode.removeChild(elements[0]);
    }
}