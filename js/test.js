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
                document.getElementById("loginResult").innerHTML = "Welcome, " + firstName + " " + lastName + "!";
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        document.getElementById("buttonResult").innerHTML = err.message;
    }
}