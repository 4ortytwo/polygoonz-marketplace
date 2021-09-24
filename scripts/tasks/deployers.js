task("deploy:PolygoonzFarm")
  .addParam("nft", "0x83B4c12c36E2a29990AB1c9D662B862F61C9B783")
  .addParam("erc20", "0x1f44AF55E91f19F4B59f84B6fda580a905455c78")
  .addParam("dao", "0x0b5AB64bfe22507a8B3d7DA6737caC16198b3960")
  .addParam("reward", "520833333333333")
  .setAction(async function (taskArguments, { ethers }) {
    console.log("Task arguments: ", taskArguments);
    const PolygoonzFarmFactory = await ethers.getContractFactory(
      "PolygoonzFarm"
    );
    const polygoonzFarm = await PolygoonzFarmFactory.deploy(
      taskArguments.nft,
      taskArguments.erc20,
      taskArguments.dao,
      taskArguments.reward
    );
    await polygoonzFarm.deployed();
    console.log("PolygoonzFarm deployed to: ", polygoonzFarm.address);
  });

// yarn hardhat deploy:PolygoonzFarm /
// --nft 0x83B4c12c36E2a29990AB1c9D662B862F61C9B783 /
// --erc20 0x1f44AF55E91f19F4B59f84B6fda580a905455c78 /
// --dao 0x0b5AB64bfe22507a8B3d7DA6737caC16198b3960 /
// --reward 520833333333333 --network mumbai /
