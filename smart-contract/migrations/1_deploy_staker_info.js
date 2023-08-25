const StakerInfoContract = artifacts.require("./contracts/StakerInfo.sol");

module.exports = function(deployer) {
  return deployer.deploy(StakerInfoContract, "0xFC00FACE00000000000000000000000000000000");
};