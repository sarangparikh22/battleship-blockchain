console.log('Working...');
let accountAddress;
let amount;

function sendTx(){
    accountAddress = document.getElementById('accountAddress').value;    
    amount = document.getElementById('amount').value;
    //call API with accountAddress and Amount
    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
    var theUrl = "http://172.16.17.97:3001/sendConfidentialTransaction";
    xmlhttp.open("POST", theUrl);
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.onload = function (){
        if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
            alert("Confidential Transaction Executed");
        }
    }
    xmlhttp.send(JSON.stringify({ "receiver": "0x87897m", "value": amount }));
}
let userInvoke;
let userRevoke;


function invoke(){
    if(document.getElementById('bob1').checked){
        userInvoke = "0";
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/grant";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log(xmlhttp.responseText);
            }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": userRevoke, "policyName": "admin" }));
    }
    if(document.getElementById('bob2').checked){
        userRevoke = "1";
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/grant";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                console.log(xmlhttp.responseText);
            }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": userRevoke, "policyName": "admin" }));
    }
}

function revoke(){
    if(document.getElementById('bob1').checked){
        userRevoke = "0";
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/revoke";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                alert("Access to Policy Revoked! :( ");
                console.log(xmlhttp.responseText);
            }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": userRevoke, "policyName": "admin" }));
    }
    if(document.getElementById('bob2').checked){
        userRevoke = "1";
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/revoke";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                alert("Access to Policy Revoked! :( ");
                console.log(xmlhttp.responseText);
            }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": userRevoke, "policyName": "admin" }));
    }
}


