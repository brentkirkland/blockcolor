var BlockColor = artifacts.require("./BlockColor.sol");

contract('BlockColor', function(accounts) {

  it("should have correct route", function () {
    BlockColor.deployed().then(function(instance) {
      return instance.addToRoute(0, 0);
    });
    BlockColor.deployed().then(function(instance) {
      return instance.addToRoute(0, 1);
    });
    BlockColor.deployed().then(function(instance) {
      return instance.getRoute.call(0);
    }).then(function(greens) {
      assert.equal(greens.length, 2, "length is not 2")
    });

  });

  it("should delete last route correctly", function () {
    BlockColor.deployed().then(function(instance) {
      return instance.addToRoute(0, 0);
    });
    BlockColor.deployed().then(function(instance) {
      return instance.addToRoute(0, 1);
    });

    BlockColor.deployed().then(function(instance) {
      return instance.deleteRouteStep(0, 1);
    });

    BlockColor.deployed().then(function(instance) {
      return instance.getRoute.call(0);
    }).then(function(greens) {
      assert.equal(greens[0], 0, "route delete did not work")
    });

  });

  it("should delete first route correctly", function () {
    BlockColor.deployed().then(function(instance) {
      return instance.addToRoute(0, 0);
    });
    BlockColor.deployed().then(function(instance) {
      return instance.addToRoute(0, 1);
    });

    BlockColor.deployed().then(function(instance) {
      return instance.deleteRouteStep(0, 0);
    });

    BlockColor.deployed().then(function(instance) {
      return instance.getRoute.call(0);
    }).then(function(greens) {
      assert.equal(greens[0], 1, "route delete did not work")
    });

  });


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

  BlockColor.deployed().then(function(instance) {
    return instance.writeEvent("111", 0, "222", 1);
  });

  BlockColor.deployed().then(function(instance) {
    return instance.writeEvent("222", 1, "333", 2, {from: accounts[1]});
  });

  it("should have correct colors length", function() {

    BlockColor.deployed().then(function(instance) {
      return instance.getColorHashArray.call(1);
    }).then(function(greens) {
      assert.equal(greens.length, 1, "length is not 3")
    });

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
