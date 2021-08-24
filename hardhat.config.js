require("@nomiclabs/hardhat-waffle");
const fs = require("fs");
const privateKey =
  fs.readFileSync(".secret").toString().trim() || "01234567890123456789";

/**

* @type import('hardhat/config').HardhatUserConfig

*/

require("dotenv").config();

require("@nomiclabs/hardhat-ethers");

const { NEXT_PUBLIC_API_URL, PRIVATE_KEY } = process.env;

module.exports = {
  defaultNetwork: "mumbai",
  networks: {
    hardhat: {
      chainId: 1337,
    },
    mumbai: {
      url: NEXT_PUBLIC_API_URL,
      // url: "https://rpc-mumbai.matic.today",
      accounts: [privateKey],
    },
  },
  solidity: {
    version: "0.8.6",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
