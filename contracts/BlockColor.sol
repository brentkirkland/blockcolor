pragma solidity ^0.4.4;

contract BlockColor {

  // BlockColor uses events to store a chain of data stored on IPFS
  // You must be a user of the system to add data
  // Color help guide data into different stages

  address owner;
  mapping (address => bool) user;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier onlyUser() {
    require(user[msg.sender]);
    _;
  }

  function BlockColor() {
    owner = msg.sender;
    user[owner] = true;
  }

	event NewData(address indexed creator, bytes32 indexed previousHash, bytes32 currentHash, uint16 indexed color);

	function writeEvent(bytes32 previousHash, uint16 color, bytes32 currentHash) onlyUser {
    NewData(msg.sender, previousHash, currentHash, color);
	}

  function isUser(address _user) returns (bool) {
    return user[_user];
  }

  function addUser(address newUser) onlyOwner {
    user[newUser] = true;
  }

  function removeUser(address oldUser) onlyOwner {
    delete user[oldUser];
  }

}
