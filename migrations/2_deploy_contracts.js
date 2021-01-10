var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var PayUser = artifacts.require("./PayUser.sol");

module.exports = function (deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(PayUser);
};