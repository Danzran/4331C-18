const urlBase = 'http://microbialeight825.microbialeight.xyz/api';
//const urlBase = 'localhost/api';
const extension = 'php';

function clickButton()
{
    let url = urlBase + '/Test.' + extension;

    let input = document.getElementById("testinput").value;
    let tmp = {text:input};
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
                let jsonObj = JSON.parse(xhr.responseText);
                document.getElementById("buttonResult").innerHTML = jsonObj.text;
            }
        }
        xhr.send(payload);
    }
    catch(err)
    {
        document.getElementById("buttonResult").innerHTML = err.message;
    }
}