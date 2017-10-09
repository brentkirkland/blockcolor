pragma solidity ^0.4.4;

contract BlockColorV2 {

  // BlockColor uses events to store a chain of data stored on IPFS
  // You must be a user of the system to add data
  // Color help guide data into different stages

  // user data
  address owner;
  mapping (address => bool) user;

  // color data
  uint16 maxColor;
  mapping (uint16 => bytes32[]) colors;

  // thread data
  mapping (bytes32 => bytes32[]) threads;

  // route exmaple
  // 0 = blue       0 = [1, 2, 3, 6]    new
  // 1 = yellow     1 = [1, 2, 4]       techs
  // 2 = cyan       2 = [2, 1, 3]       repairs
  // 3 = orange     3 = [3, 2, 6, 1]    support
  // 4 = pink       4 = [4, 5]          confirmations
  // 5 = purple     5 = [5, 1, 3]       operations
  // 6 = green      6 = [6, 7]          green
  // 7 = black      7 = [1, 2, 3, 4, 5, 6, 7, 8]  boss
  // 8 = red        8 = []              closed

  // route data
  mapping (uint16 => uint16[]) routes;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // TODO: only user needs to be compatible with routes
  modifier onlyUser() {
    // for the time being anyone can use it
    /*require(user[msg.sender]);*/
    _;
  }

  function BlockColorV2() {
    owner = msg.sender;
    user[owner] = true;
    maxColor = 9;
  }

	event NewData(address indexed creator, bytes32 indexed previousHash, bytes32 currentHash, uint16 indexed color);

  // TODO: manage routes
	function writeEvent(bytes32 previousHash, uint16 prevColor, bytes32 currentHash, uint16 currentColor) onlyUser {
    // check colors are valid
    require(prevColor >= 0 && prevColor < maxColor && prevColor >= 0 && prevColor < maxColor);

    // manage color arrays
    // will likely enjoy shifting later
    if (currentColor > 0) {
      removeOldColor(previousHash, prevColor);
    }
    addToColor(currentHash, currentColor);

    // manage threads
    // if current color === 0, create thread
    // thread: oldHash -> [oldoldHash, oldHash],
    // newHash -> [oldoldHash, oldHash, newHash]
    // TODO: test case of thread moving on,
    // but someone remains looking at old thread
    addToThread(previousHash, currentHash);

    NewData(msg.sender, previousHash, currentHash, currentColor);
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

  function addToThread(bytes32 previousHash, bytes32 currentHash) onlyUser {
    if (threads[previousHash].length != 0) {
        threads[currentHash] = threads[previousHash];
        threads[currentHash].push(currentHash);
        bytes32 forward = 0xdead;
        threads[previousHash] = [forward, currentHash];
    } else {
        threads[currentHash] = [currentHash];
    }
  }

  function getThread(bytes32 currentHash) onlyUser returns(bytes32[]) {
    return threads[currentHash];
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

}
