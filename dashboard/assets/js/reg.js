console.log('Regulatory...');
let noteHash = "0xdf87dsds8f78adf78789";
let fromAccount = "0xdf87dsds8f78adf78789";
let to = "0xdf87dsds8f78adf78789";
let value = 0;
let user = "admin";
let encMsg;
let label;
window.addEventListener('load', fetchNotes);

var firebaseConfig = {
    apiKey: "AIzaSyAm8q-wIxsRpZ4EDHqEReImwIyE73dYHjc",
    authDomain: "selective-zkp.firebaseapp.com",
    databaseURL: "https://selective-zkp.firebaseio.com",
    projectId: "selective-zkp",
    storageBucket: "",
    messagingSenderId: "591943542741",
    appId: "1:591943542741:web:82b59e137212ba9f"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

function viewSecretAmount(id){
    if(user == "CEO"){
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/retrieve";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            document.getElementById(id).innerHTML = xhr.responseText;
                        }else{
                            document.getElementById(id).innerHTML = "Not Authorized";
                        }
                        console.log('Not Auth')
                    }
                    xhr.open('GET', `http://172.16.17.97:3001/getValFromViewingKey?viewingKey=${JSON.parse(xmlhttp.responseText)[0]}`, true);
                    xhr.send(null);
            }else{
                document.getElementById(id).innerHTML = "Not Authorized";
                console.log('Not Auth');
            }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": "1", "policyName":"admin", "encViewKey": encMsg}));
    }else if(user == "HR"){
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/retrieve";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            document.getElementById(id).innerHTML = xhr.responseText;
                        }
                    }
                    xhr.open('GET', `http://172.16.17.97:3001/getValFromViewingKey?viewingKey=${JSON.parse(xmlhttp.responseText)[0]}`, true);
                    xhr.send(null);
            }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": "2", "policyName":"admin", "encViewKey": encMsg}));
    }else if(user == "EMP"){
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/retrieve";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            document.getElementById(id).innerHTML = xhr.responseText;
                        }
                    }
                    xhr.open('GET', `http://172.16.17.97:3001/getValFromViewingKey?viewingKey=${JSON.parse(xmlhttp.responseText)[0]}`, true);
                    xhr.send(null);
            }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": "3", "policyName":"admin", "encViewKey": encMsg}));
    }else{
        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
        var theUrl = "http://172.16.17.97:5500/retrieve";
        xmlhttp.open("POST", theUrl);
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        xmlhttp.onload = function (){
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                var xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState == XMLHttpRequest.DONE) {
                            document.getElementById(id).innerHTML = xhr.responseText;
                            var xhrr = new XMLHttpRequest();
                            var reProxyUrl ="http://172.16.17.97:5500/reqEnc";
                            xhrr.open("POST", reProxyUrl);
                            xhrr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
                            xhrr.onload = function(){
                                if(this.readyState === XMLHttpRequest.DONE && this.status === 200){
                                    console.log(xhrr.responseText);
                                }
                            }
                            // console.log(label);
                            xhrr.send(JSON.stringify({ "message": JSON.parse(xmlhttp.responseText)[0], "noteHash": id, "from": fromAccount, "to": to, "label": label}));
                        }
                    }
                    xhr.open('GET', `http://172.16.17.97:3001/getValFromViewingKey?viewingKey=${JSON.parse(xmlhttp.responseText)[0]}`, true);
                    xhr.send(null);
                }
        }
        xmlhttp.send(JSON.stringify({ "bobIndex": "0", "policyName":"admin", "encViewKey": encMsg}));
    }
}

function fetchNotes(){
    i = 0;
    var starCountRef = firebase.database().ref('notes/');
    starCountRef.on('value', function(snapshot) {
        snapshot.forEach(snappy => {
            encMsg = snappy.val().encMsg;
            fromAccount = snappy.val().from;
            to = snappy.val().to;
            label = Object.keys(snapshot.val())[i++];
            document.getElementById('cardsHere').innerHTML += `<div class="card" style="background-color: #f5f5f5;box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s; margin-bottom: 20px;">
        <div class="container">
            <h5><b>From:</b> ${snappy.val().from}</h5>
            <h5><b>To:</b> ${snappy.val().to}</h5>
            <h5><b>NoteHash:</b> ${snappy.val().noteHash}</h5>
            <h5><b>Value</b><p id="${snappy.val().noteHash}"></p></h5>
            <input class="btn btn-success" type="button" id="${snappy.val().noteHash}" onclick="viewSecretAmount(this.id)" value="View Amount" />
        </div>
    </div>`;
        });
    });

    
}

function setRole(){
    if(document.getElementById('CEO').checked){
        user = "CEO";
    }
    if(document.getElementById('HR').checked){
        user = "HR";
    }
    if(document.getElementById('EMP').checked){
        user = "EMP";
    }
}
