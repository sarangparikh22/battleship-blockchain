pragma solidity ^0.5.0;

contract BattleshipBlockchain{
    
    address payable public p1;
    address payable public p2;
    address public setter;
    
    bytes32[] public p1HashLoc;
    bytes32[] public p2HashLoc;
    
    uint public pos;
    uint public shipsDestroyedp1 = 0;
    uint public shipsDestroyedp2 = 0;
    uint stakeCounter;
    
    bool c;
    bool gameOver = false;
    
    mapping(address => mapping(uint => bool)) isDestroyed;
    mapping(address => uint) playerBalance;
    mapping(address => bool) isTurn;    
    
    constructor(address payable _p1, address payable _p2, bytes32[] memory _p1HashLoc, bytes32[] memory _p2HashLoc)
    public{
        p1 = _p1;
        p2 = _p2;
        p1HashLoc = _p1HashLoc;
        p2HashLoc = _p2HashLoc;
        isTurn[_p1] = true;
    }
    
    modifier isGameOver{
        require(gameOver == false);
        _;
    }
    
    modifier onlyPlayers{
        require(msg.sender == p1 || msg.sender == p2, "Someone Except P1 & P2");
        _;
    }

    modifier isTurnTrue{
        require(isTurn[msg.sender] == true);
        _;
    }
    
    modifier isSetter{
        require(msg.sender != setter);
        _;
    }

    modifier paymentDone{
        require(stakeCounter == 2);
        _;
    }
    
    function stake()public payable onlyPlayers isGameOver{
        require(msg.value >= 1 ether);
        require(playerBalance[msg.sender] == 0);
        require(stakeCounter < 2);
        playerBalance[msg.sender] = msg.value;
        stakeCounter += 1;
    }
    
    
    function play(uint _positionToAttack)public isGameOver onlyPlayers isTurnTrue paymentDone{
        address defender;
        
        if(msg.sender == p1){
            defender = p2;
        }else{
            defender = p1;
        }
        
        require(isDestroyed[defender][_positionToAttack] == false);
        
        pos = _positionToAttack;
        isTurn[msg.sender] = false;
        setter = msg.sender;
    }
    
    function reveal(string memory _secret, string memory _ship) public isGameOver isSetter paymentDone{
        if(msg.sender == p1){
            require(checkHash(_secret, _ship) == p1HashLoc[pos], "a1");
            if(keccak256(bytes(_ship)) == keccak256(bytes("1"))){
                shipsDestroyedp1 += 1;
                isTurn[p1] = false;
                isTurn[p2] = true;
                isDestroyed[p1][pos] = true;
                c = true;
                if(shipsDestroyedp1 > 2){
                    gameOver = true;
                }
                return;
            }
            c = false;
            setter = address(0);
            isTurn[p1] = true;
        }else{
            require(checkHash(_secret, _ship) == p2HashLoc[pos], "a1");
            if(keccak256(bytes(_ship)) == keccak256(bytes("1"))){
                shipsDestroyedp2 += 1;
                isTurn[p2] = false;
                isTurn[p1] = true;
                isDestroyed[p2][pos] = true;
                c = true;
                if(shipsDestroyedp2 > 2){
                    gameOver = true;
                }
                return;
            }
            c = false;
            setter = address(0);
            isTurn[p2] = true;
        }
    }
    
    function checkHash(string memory _secret,string memory _ship) public pure returns(bytes32){
        return keccak256(bytes(strConcat(_secret,_ship)));
    }

    function strConcat(string memory _a, string memory _b) internal pure returns (string memory){
        bytes memory _ba = bytes(_a);
        bytes memory _bb = bytes(_b);
        string memory abcde = new string(_ba.length + _bb.length);
        bytes memory babcde = bytes(abcde);
        uint k = 0;
        for (uint i = 0; i < _ba.length; i++) babcde[k++] = _ba[i];
        for (uint i = 0; i < _bb.length; i++) babcde[k++] = _bb[i];
        return string(babcde);
    }
    
    function canPlay() public view returns(bool){
        return isTurn[msg.sender];
    }
    
    function defray() public onlyPlayers paymentDone{
        require(gameOver == true);
        
        if(shipsDestroyedp1 > 2){
            p2.transfer(address(this).balance);
        }else{
            p1.transfer(address(this).balance);
        }
        
    }
    function contractBalance() public view returns(uint){
        return address(this).balance;
    }
}