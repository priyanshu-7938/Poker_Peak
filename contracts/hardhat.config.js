task("TEST","tests the contract with set and fetch").setAction(async ( pram, hre ) => {
  
});


/** @type import('hardhat/config').HardhatUserConfig */
require("@nomicfoundation/hardhat-toolbox");
module.exports = {
  solidity: "0.8.19",
  networks: {
    hardhat: {},
    ganache: {
      url: "http://127.0.0.1:7545", // Make sure this matches your Ganache settings
      accounts: [
        "0x746f794b7348f604ee8fd0d9eaaf8baf9e39eaaf3b8e21fd3339b93d624d75c2"
      ],
    },
  },
  solidity: "0.8.0",
};
