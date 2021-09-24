// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const { task } = require("hardhat/config");
// import hre from "hardhat";
// import { task } from "hardhat/config";

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');
  // We get the contract to deploy
  // Start deployment, returning a promise that resolves to a contract object
  // =======================================
  // deployed to 0x83B4c12c36E2a29990AB1c9D662B862F61C9B783
  // Polygoonz NFT
  // const Polygoonz = await ethers.getContractFactory("Polygoonz");
  // const polygoonz = await Polygoonz.deploy();
  // await polygoonz.deployed();
  // console.log("Polygoonz deployed to:", polygoonz.address);
  // =======================================
  // GOONZ Token
  // deployed to 0x1f44AF55E91f19F4B59f84B6fda580a905455c78
  // const Goonz = await ethers.getContractFactory("GOONZ");
  // const goonz = await Goonz.deploy();
  // await goonz.deployed();
  // console.log("GOONZ Token deployed to:", goonz.address);
  // =======================================
  // PolygoonzFarm
  // deployed to 0x118469B57444659b360ffF137839073b778EC639
  // const PolygoonzFarm = await ethers.getContractFactory("PolygoonzFarm");
  // const polygoonzFarm = await PolygoonzFarm.deploy();
  // await polygoonzFarm.deployed();
  // console.log("Polygoonz Farm deployed to:", polygoonzFarm.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
