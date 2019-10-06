var web3 = new Web3("ws://localhost:8545");

let shipHashLocationP1 = [];
let shipLocationP1 = [];

let shipHashLocationP2 = [];
let shipLocationP2 = [];

let p1 = "0x90f8bf6a479f320ead074411a4b0e7944ea8c9c1";
let p2 = "0xffcf8fdee72ac11b5c542428b35eef5769c409f0";


// let contractAddress = "0xe78a0f7e598cc8b0bb87894b0f60dd2a88d6a8ab";

let contractAddress = "0x67B5656d60a809915323Bf2C40A8bEF15A152e3e";

let contractABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "defray",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_positionToAttack",
				"type": "uint256"
			}
		],
		"name": "play",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_secret",
				"type": "string"
			},
			{
				"name": "_ship",
				"type": "string"
			}
		],
		"name": "reveal",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "stake",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"name": "_p1",
				"type": "address"
			},
			{
				"name": "_p2",
				"type": "address"
			},
			{
				"name": "_p1HashLoc",
				"type": "bytes32[]"
			},
			{
				"name": "_p2HashLoc",
				"type": "bytes32[]"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "canPlay",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_secret",
				"type": "string"
			},
			{
				"name": "_ship",
				"type": "string"
			}
		],
		"name": "checkHash",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "contractBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "p1",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "p1HashLoc",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "p2",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "p2HashLoc",
		"outputs": [
			{
				"name": "",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "pos",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "setter",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "shipsDestroyedp1",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "shipsDestroyedp2",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

let myContract;
function payP1(){
    myContract = new web3.eth.Contract(contractABI, contractAddress);
    web3.eth.getAccounts((err,accounts) => {
        if(err){
            console.log(err)
        }
        myContract.methods.stake().send({from: accounts[0], value: web3.utils.toWei('1', 'ether')})
    })
}

function payP2(){
    myContract = new web3.eth.Contract(contractABI, contractAddress);
    web3.eth.getAccounts((err,accounts) => {
        if(err){
            console.log(err)
        }
        myContract.methods.stake().send({from: accounts[1], value: web3.utils.toWei('1', 'ether')})
    })  
}



// myContract.methods.contractBalance().call().then((bal) => {
//     console.log(bal);
// })

//Game Functions
function setGridP1(){
    let ship = (document.getElementById('shipPos').value).split(',');
    setShipPositionAndGetHashP1(ship[0], ship[1], ship[2]);
}

function setShipPositionAndGetHashP1(s1,s2,s3){
    shipHashLocationP1 = [];
    shipLocationP1 = [];
    document.getElementById('p1T').innerHTML = "";
    let tableData = "";
    for(i=0;i<16;i++){
        if(s1 == i || s2 == i || s3 == i){
            let randNum = Math.floor(Math.random()*1000);
            shipLocationP1.push(randNum+"1");
            shipHashLocationP1.push(web3.utils.keccak256(randNum+"1"));
            let lI = i;
            if(lI==0 || lI==4 || lI ==8 || lI ==12){
                tableData += `<tr><td id="p1O${i}">${shipLocationP1[i]}</td>`;
            }else if(lI==3 || lI==7 || lI ==11 || lI == 15){
                tableData += `<td id="p1O${i}">${shipLocationP1[i]}</td></tr>`;
            }else{
                tableData += `<td id="p1O${i}">${shipLocationP1[i]}</td>`;
            }
        }else{
            let randNum = Math.floor(Math.random()*1000);
            shipLocationP1.push(randNum+"0");
            shipHashLocationP1.push(web3.utils.keccak256(randNum+"0"));
            let lI = i;
            if(lI==0 || lI==4 || lI ==8 || lI == 12){
                tableData += `<tr><td id="p1O${i}">${shipLocationP1[i]}</td>`;
            }else if(lI==3 || lI==7 || lI ==11 || lI==15){
                tableData += `<td id="p1O${i}">${shipLocationP1[i]}</td></tr>`;
            }else{
                tableData += `<td id="p1O${i}">${shipLocationP1[i]}</td>`;
            }
        }
    }
    document.getElementById('p1T').innerHTML = `<table  cellspacing="500">${tableData}</table>`
    console.log(JSON.stringify(shipHashLocationP1));
    console.log('------------------------------');
    console.log(shipLocationP1);
    let partyData = "";
    for (let i = 0; i < 16; i++) {
        let lI = i;
        if(lI==0 || lI==4 || lI ==8 || lI == 12){
            partyData += `<tr><td ><button type="button" class='btn' id="p1${i}" onclick="attackByP1(this.id)"><img id="imgp1${i}" src="tile.jpg" height="100" width="100"></button></td>`;
        }else if(lI==3 || lI==7 || lI ==11 || lI==15){
            partyData += `<td ><button type="button" class='btn' id="p1${i}" onclick="attackByP1(this.id)"><img  id="imgp1${i}" src="tile.jpg" height="100" width="100"></button></td></tr>`;
        }else{
            partyData += `<td ><button type="button" class='btn' id="p1${i}" onclick="attackByP1(this.id)"><img  id="imgp1${i}" src="tile.jpg" height="100" width="100"></button></td>`;
        }
    }
    document.getElementById('p1C').innerHTML = `<table>${partyData}</table>`
}


function setGridP2(){
    let ship = (document.getElementById('shipPosP2').value).split(',');
    setShipPositionAndGetHashP2(ship[0], ship[1], ship[2]);
}

function setShipPositionAndGetHashP2(s1,s2,s3){
    shipHashLocationP2 = [];
    shipLocationP2 = [];
    let tableData = "";
    for(i=0;i<16;i++){
        if(s1 == i || s2 == i || s3 == i){
            let randNum = Math.floor(Math.random()*1000);
            shipLocationP2.push(randNum+"1");
            shipHashLocationP2.push(web3.utils.keccak256(randNum+"1"));
            let lI = i;
            if(lI==0 || lI==4 || lI ==8 || lI ==12){
                tableData += `<tr><td id="p2O${i}">${shipLocationP2[i]}</td>`;
            }else if(lI==3 || lI==7 || lI ==11 || lI == 15){
                tableData += `<td id="p2O${i}">${shipLocationP2[i]}</td></tr>`;
            }else{
                tableData += `<td id="p2O${i}">${shipLocationP2[i]}</td>`;
            }
        }else{
            let randNum = Math.floor(Math.random()*1000);
            shipLocationP2.push(randNum+"0");
            shipHashLocationP2.push(web3.utils.keccak256(randNum+"0"));
            let lI = i;
            if(lI==0 || lI==4 || lI ==8 || lI ==12){
                tableData += `<tr><td id="p2O${i}">${shipLocationP2[i]}</td>`;
            }else if(lI==3 || lI==7 || lI ==11 || lI == 15){
                tableData += `<td id="p2O${i}">${shipLocationP2[i]}</td></tr>`;
            }else{
                tableData += `<td id="p2O${i}">${shipLocationP2[i]}</td>`;
            }
        }
    }
    document.getElementById('p2T').innerHTML = `<table  cellspacing="500">${tableData}</table>`
    console.log(JSON.stringify(shipHashLocationP2));
    console.log('------------------------------');
    console.log(shipLocationP2);
    let partyData = "";
    for (let i = 0; i < 16; i++) {
        let lI = i;
        if(lI==0 || lI==4 || lI ==8 || lI == 12){
            partyData += `<tr><td ><button type="button" class='btn' id="p2${i}" onclick="attackByP2(this.id)"><img  id="imgp2${i}" src="tile.jpg" height="100" width="100"></button></td>`;
        }else if(lI==3 || lI==7 || lI ==11 || lI==15){
            partyData += `<td ><button type="button" class='btn' id="p2${i}" onclick="attackByP2(this.id)"><img id="imgp2${i}" src="tile.jpg" height="100" width="100"></button></td></tr>`;
        }else{
            partyData += `<td ><button type="button" class='btn' id="p2${i}" onclick="attackByP2(this.id)"><img  id="imgp2${i}" src="tile.jpg" height="100" width="100"></button></td>`;
        }
    }
    document.getElementById('p2C').innerHTML = `<table  cellspacing="500">${partyData}</table>`
}



function deploy(){
    let p1 = document.getElementById('p1').value;
    let p2 = document.getElementById('p2').value;
    let p1L = document.getElementById('p1L').value;
    let p2L = document.getElementById('p2L').value;

    let url = `http://localhost:3000/saru?p1=${p1}&p2=${p2}&p1L=${p1L}&p2L=${p2L}`;

    doCall(url, (cA) => {
        setInterval(startTurnCheckP1, 500);
        setInterval(startTurnCheckP2, 500); 
        console.log(cA);
    });
    // setInterval(startTurnCheckP1, 500);
}

function doCall(theUrl, callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            contractAddress = xmlHttp.responseText;
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function startTurnCheckP1(){
    myContract = new web3.eth.Contract(contractABI, contractAddress);
    web3.eth.getAccounts((err,accounts) => {
        myContract.methods.canPlay().call({from: accounts[0]})
        .then(res => {
            // console.log(res);
            if(res == false){
                for(i=0;i<16;i++){
                    document.getElementById("p1"+i).disabled = true;
                    try{
                        document.getElementById(`imgp1${i}`).className = ' test';
                    }catch{
                        
                    }
                }
            }else{
                for(i=0;i<16;i++){
                    document.getElementById("p1"+i).disabled = false;
                    try{
                        document.getElementById(`imgp1${i}`).className = '';
                    }catch{

                    }

                }
            }
        })
    })
}
function startTurnCheckP2(){
    myContract = new web3.eth.Contract(contractABI, contractAddress);
    web3.eth.getAccounts((err,accounts) => {
        myContract.methods.canPlay().call({from: accounts[1]})
        .then(res => {
            // console.log(res);
            if(res == false){
                for(i=0;i<16;i++){
                    document.getElementById("p2"+i).disabled = true;
                    try{
                        document.getElementById(`imgp2${i}`).className = ' test';

                    }catch{

                    }

                }
            }else{
                for(i=0;i<16;i++){
                    document.getElementById("p2"+i).disabled = false;
                    try{
                        document.getElementById(`imgp2${i}`).className = '';
                    }catch{}
                }
            }
        })
    })
}

function attackByP1(cell){
    let loc = cell.split('p1')[1];
    myContract = new web3.eth.Contract(contractABI, contractAddress);
    web3.eth.getAccounts((err, accounts) => {
        myContract.methods.play(loc).send({from: accounts[0]})
        .then(res => {
            myContract.methods.reveal(Math.floor((shipLocationP2[loc] / 10)).toString(), Math.floor((shipLocationP2[loc] % 10)).toString()).send({from: accounts[1], gas: 300000})
            .then(r => {
                myContract.methods.canPlay().call({from: accounts[1]}).then(res => {
                    if(res == true){
                        document.getElementById("p2O"+loc).innerHTML = '<img src="lol.gif" height="100" width="100">';
                        document.getElementById("p1"+loc).innerHTML = '<img src="lol.gif" height="100" width="100">';

                    }else{
                        document.getElementById("p2O"+loc).innerHTML = '<img src="win.gif" height="100" width="100">';
                        document.getElementById("p1"+loc).innerHTML = '<img src="win.gif" height="100" width="100">';

                    }
                })
            })
        })
    })
}

function attackByP2(cell){
    let loc = cell.split('p2')[1];
    myContract = new web3.eth.Contract(contractABI, contractAddress);
    web3.eth.getAccounts((err, accounts) => {
        myContract.methods.play(loc).send({from: accounts[1]})
        .then(res => {
            myContract.methods.reveal(Math.floor((shipLocationP1[loc] / 10)).toString(), Math.floor((shipLocationP1[loc] % 10)).toString()).send({from: accounts[0], gas: 300000})
            .then(r => {
                myContract.methods.canPlay().call({from: accounts[0]}).then(res => {
                    if(res == true){
                        document.getElementById("p1O"+loc).innerHTML = '<img src="lol.gif" height="100" width="100">';
                        document.getElementById("p2"+loc).innerHTML = '<img src="lol.gif" height="100" width="100">';

                    }else{
                        document.getElementById("p1O"+loc).innerHTML = '<img src="win.gif" height="100" width="100">';
                        document.getElementById("p2"+loc).innerHTML = '<img src="win.gif" height="100" width="100">';

                    }
                })
            })
        })
    })
}