// scripts/deploy.js
// const { ethers } = require("ethers");

async function main() {
    const PokerRoom = await ethers.getContractFactory("PokerRoom");
    const pokerRoom = await PokerRoom.deploy(/* constructor arguments if any */);
  
    // const deployedPokerRoom = await pokerRoom.deployed();
    console.log(pokerRoom?.target);
    console.log("PokerRoom deployed");
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  