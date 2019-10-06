const web3 = require('web3');

// console.log(web3.utils.keccak256("1230"));

let shipHashLocation = [];
let shipLocation = [];
function setShipPositionAndGetHash(s1,s2,s3){
    for(i=0;i<16;i++){
        if(s1 == i || s2 == i || s3 == i){
            let randNum = Math.floor(Math.random()*1000);
            shipLocation.push(randNum+"1");
            shipHashLocation.push(web3.utils.keccak256(randNum+"1"));
        }else{
            let randNum = Math.floor(Math.random()*1000);
            shipLocation.push(randNum+"0");
            shipHashLocation.push(web3.utils.keccak256(randNum+"0"));
        }
    }
}

setShipPositionAndGetHash(1,5,8)

console.log(JSON.stringify(shipHashLocation));
console.log('------------------------------');
console.log(shipLocation);
