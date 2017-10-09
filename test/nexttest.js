var BlockColorV2 = artifacts.require("./BlockColorV2.sol");

contract('BlockColorV2', function(accounts) {
  // add a user

  it("should have user", function() {
    BlockColorV2.deployed().then(function(instance) {
      return instance.addUser.sendTransaction(accounts[1]);
    }).then(function () {
      return BlockColorV2.deployed().then(function(instance) {
        return instance.isUser.call(accounts[0]);
      }).then(function(user) {
        assert.equal(user.valueOf(), true, "account [0] is not a user")
      })
    })
  });

  it("should have route 0 length 2", function() {
    BlockColorV2.deployed().then(function(instance) {
      return instance.addToRoute(0, 0);
    });

    BlockColorV2.deployed().then(function(instance) {
      return instance.addToRoute(0, 1);
    });
    BlockColorV2.deployed().then(function(instance) {
      return instance.getRoute.call(0);
    }).then(function(greens) {
      assert.equal(greens.length, 2, "length is not 2")
    });
  });
  //
  // it("should have route 1 length 2", function() {
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(1, 1);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(1, 2);
  //   });
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.getRoute.call(1);
  //   }).then(function(greens) {
  //     assert.equal(greens.length, 2, "length is not 2")
  //   });
  // });
  //
  // it("should have route 2 length 2", function() {
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(2, 2);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(2, 3);
  //   });
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.getRoute.call(1);
  //   }).then(function(greens) {
  //     assert.equal(greens.length, 2, "length is not 2")
  //   });
  // });
  //
  // it("should have route 3 length 2", function() {
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(3, 3);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(3, 4);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.getRoute.call(3);
  //   }).then(function(greens) {
  //     // console.log(greens)
  //     assert.equal(greens.length, 2, "length is not 2")
  //   });
  // });
  //
  // it("should have route 4 length 1", function() {
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(4, 3);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.addToRoute(4, 4);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.deleteRouteStep(4, 3);
  //   })
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.getRoute.call(4);
  //   }).then(function(greens) {
  //     assert.equal(greens.length, 1, "value is not 4")
  //   });
  // });
  //
  // it("create a ticket", function() {
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.writeEvent("0", 0, "111", 0);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.getColorHashArray.call(0);
  //   }).then(function(greens) {
  //     console.log(greens)
  //     assert.equal(greens.length, 1, "length is not 1")
  //   });
  // });
  //
  // it("new reply", function() {
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.writeEvent("111", 0, "222", 1);
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.getColorHashArray.call(0);
  //   }).then(function(greens) {
  //     console.log(greens)
  //     // assert.equal(greens.length, 1, "length is not 1")
  //   });
  //
  //   BlockColorV2.deployed().then(function(instance) {
  //     return instance.getColorHashArray.call(1);
  //   }).then(function(greens) {
  //     console.log(greens)
  //     assert.equal(greens.length, 1, "length is not 1")
  //   });
  // });

  // add some colors

});
