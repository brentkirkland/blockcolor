/*pragma solidity ^0.4.4;

contract BlockColor {

  // BlockColor uses events to store a chain of data stored on IPFS
  // You must be a user of the system to add data
  // Color help guide data into different stages

  address owner;
  mapping (address => bool) user;
  uint16 maxColor;
  mapping (uint16 => bytes32[]) colors;

  // 0 = [ 0 , 1 ] topic
  // 1 = [ 1 , 2 ] genre
  // 2 = [ 2 , 3 ] artist
  // 3 = [ 3 , 4 ] song
  // 4 = [ 4, 5 ] link
  // 5 = [] closed but won't exists for example

  mapping (uint16 => uint16[]) routes;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  modifier onlyUser() {
    // for the time being anyone can use it
    /*require(user[msg.sender]);*/
    _;
  }

  function BlockColor() {
    owner = msg.sender;
    user[owner] = true;
    maxColor = 5;
  }

	event NewData(address indexed creator, bytes32 indexed prevHash, bytes32 currentHash, uint16 indexed color);

	function writeEvent(bytes32 prevHash, uint16 prevColor, bytes32 currentHash, uint16 currentColor) onlyUser {
    require(prevColor >= 0 && prevColor < maxColor && prevColor >= 0 && prevColor < maxColor);
    if (currentColor > 0) {
      removeOldColor(prevHash, prevColor);
    }
    addToColor(currentHash, currentColor);
    NewData(msg.sender, prevHash, currentHash, currentColor);
	}

  function isUser(address _user) returns (bool) {
    return user[_user];
  }

  function isAdmin() returns (bool) {
    return msg.sender == owner;
  }

  function addUser(address newUser) onlyOwner {
    user[newUser] = true;
  }

  function removeUser(address oldUser) onlyOwner {
    delete user[oldUser];
  }

  function changeMaxColor(uint16 colorNum) onlyOwner {
    maxColor = colorNum;
  }

  function addToColor(bytes32 hash, uint16 color) internal {
    require(color >= 0 && color < maxColor);
    colors[color].push(hash);
  }

  function getColorHashArray(uint16 color) onlyUser returns (bytes32[]) {
    require(color >= 0 && color < maxColor);
    return colors[color];
  }

  function removeOldColor(bytes32 hash, uint16 color) internal {
    uint16 i = IndexOfHash(colors[color], hash);
    colors[color][i] = colors[color][colors[color].length-1];
    delete colors[color][colors[color].length-1];
    colors[color].length--;
  }

  function addToRoute(uint16 color, uint16 route) onlyOwner {
    require(color >= 0 && color < maxColor && route >= 0 && route < maxColor);
    routes[color].push(route);
  }

  function getRoute(uint16 color) onlyUser returns (uint16[]) {
    require(color >= 0 && color < maxColor);
    return routes[color];
  }

  function deleteRouteStep(uint16 color, uint16 step) onlyOwner {
    uint16 i = IndexOf(routes[color], step);
    routes[color][i] = routes[color][routes[color].length-1];
    delete routes[color][routes[color].length-1];
    routes[color].length--;
  }

  function IndexOf(uint16[] values, uint16 value) returns(uint16) {
    uint16 i = 0;
    while (values[i] != value) {
      i++;
    }
    return i;
  }

  function IndexOfHash(bytes32[] values, bytes32 value) returns(uint16) {
    uint16 i = 0;
    while (values[i] != value) {
      i++;
    }
    return i;
  }

}*/
