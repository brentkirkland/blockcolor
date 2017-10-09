var BlockColorV2 = artifacts.require("./BlockColorV2.sol");

contract('BlockColorV2', function(accounts) {
    BlockColorV2.deployed().then(function(instance) {
      return instance.writeEvent("0", 0, "111", 0);
    });

    BlockColorV2.deployed().then(function(instance) {
      return instance.writeEvent("111", 0, "222", 1);
    });

    BlockColorV2.deployed().then(function(instance) {
      return instance.writeEvent("222", 1, "333", 2);
    });

    BlockColorV2.deployed().then(function(instance) {
      return instance.writeEvent("333", 2, "444", 3);
    });

    it("Should have correct thread length", function() {

      BlockColorV2.deployed().then(function(instance) {
        return instance.getThread.call(444);
      }).then(function(greens) {
        assert.equal(greens.length, 4, "length is not 4")
      });

    });

    it("Should implement a forwarding method", function() {

      BlockColorV2.deployed().then(function(instance) {
        return instance.getThread.call(222);
      }).then(function(greens) {
        assert.equal(greens[0], 0xdead, "No forward")
      });

    });
})
