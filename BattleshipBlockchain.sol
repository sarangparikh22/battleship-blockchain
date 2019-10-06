pragma solidity ^0.5.0;

contract BattleshipBlockchain{
    
    address public p1;
    address public p2;
    
    bytes32[] public p1HashLoc;
    bytes32[] public p2HashLoc;
    
    uint public pos;
    address public setter;
    uint public shipsDestroyedp1 = 0;
    uint public shipsDestroyedp2 = 0;
    
    bool c;
    mapping(address => mapping(uint => bool)) isDestroyed;
    
    bool gameOver = false;
    
    constructor(address _p1, address _p2, bytes32[] memory _p1HashLoc, bytes32[] memory _p2HashLoc) public{
        p1 = _p1;
        p2 = _p2;
        p1HashLoc = _p1HashLoc;
        p2HashLoc = _p2HashLoc;
        isTurn[_p1] = true;
    }

    mapping(address => bool) isTurn;
    
    function play(uint _positionToAttack)public{
        address defender;
        if(msg.sender == p1){
            defender = p2;
        }else{
            defender = p1;
        }
        require(gameOver == false);
        require(msg.sender == p1 || msg.sender == p2, "yo");
        require(isDestroyed[defender][_positionToAttack] == false);
        require(isTurn[msg.sender] == true);
        pos = _positionToAttack;
        isTurn[msg.sender] = false;
        setter = msg.sender;
    }
    
    function reveal(string memory _secret, string memory _ship) public {
        require(gameOver == false);
        require(msg.sender != setter);
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
    
    //check hacsh correctness
    function checkHash(string memory _secret,string memory _ship) public pure returns(bytes32){
        return keccak256(bytes(strConcat(_secret,_ship)));
    }

    //Util functions
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
}