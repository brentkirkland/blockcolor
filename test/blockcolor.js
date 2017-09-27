var BlockColor = artifacts.require("./BlockColor.sol");

contract('BlockColor', function(accounts) {
  console.log("Adding user 1")
  BlockColor.deployed().then(function(instance) {
    return instance.addUser.sendTransaction(accounts[1]);
  });
  console.log("moving on")
  it("should have user contract creator", function() {
    return BlockColor.deployed().then(function(instance) {
      return instance.isUser.call(accounts[0]);
    }).then(function(user) {
      assert.equal(user.valueOf(), true, "account [0] is not a user")
    })
  });
  console.log("moving on 2")
  it("should have user account 1", function() {
    return BlockColor.deployed().then(function(instance) {
      return instance.isUser.call(accounts[1]);
    }).then(function(user) {
      assert.equal(user.valueOf(), true, "account [1] is not a user")
    })
  });
  it("should not have user account 1", function() {
    BlockColor.deployed().then(function(instance) {
      return instance.removeUser(accounts[1]);
    }).then(function(something) {
      return BlockColor.deployed().then(function(instance) {
        return instance.isUser.call(accounts[1]);
      }).then(function(user) {
        console.log(user)
        assert.equal(user.valueOf(), false, "account [1] is a user")
      })
    });
  });

  //double remove user?

  // BlockColor.deployed().then(function(instance) {
  //   return instance.removeUser(accounts[1]);
  // })

  BlockColor.deployed().then(function(instance) {
    return instance.writeEvent("111", 1, "222");
  });

  BlockColor.deployed().then(function(instance) {
    return instance.writeEvent("222", 2, "333", {from: accounts[1]});
  });

  it("color should be 2", function() {
    BlockColor.deployed().then(function(instance) {
      var filteredEvents = instance.NewData({
        color: 2
      }, {
        fromBlock: 0,
        toBlock: 'latest'
      });
      filteredEvents.get(function(err, logs) {
        assert.equal(logs[0].args.color.c[0], 2, "color is not 2")
      });
    });
  });

  it("color should be 1", function() {
    BlockColor.deployed().then(function(instance) {
      var filteredEvents = instance.NewData({}, {
        fromBlock: 0,
        toBlock: 'latest'
      });
      filteredEvents.get(function(err, logs) {
        // console.log(logs)
        assert.equal(logs[0].args.color.c[0], 1, "color is not 1")
      });
    });
  });
});
