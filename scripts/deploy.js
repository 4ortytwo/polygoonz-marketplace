// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy

  // Start deployment, returning a promise that resolves to a contract object

  // deployed to 0x83B4c12c36E2a29990AB1c9D662B862F61C9B783

  const Polygoonz = await ethers.getContractFactory("Polygoonz");

  const polygoonz = await Polygoonz.deploy();

  await polygoonz.deployed();

  console.log("Polygoonz deployed to:", polygoonz.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
