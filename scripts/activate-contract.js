require("dotenv").config();
const API_URL = process.env.NEXT_PUBLIC_API_URL;
const PUBLIC_KEY = process.env.NEXT_PUBLIC_PUBLIC_KEY;

const fs = require("fs");
const privateKey =
  fs.readFileSync(".secret").toString().trim() || "01234567890123456789";

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Polygoonz.sol/Polygoonz.json");
const contractAddress = "0x83B4c12c36E2a29990AB1c9D662B862F61C9B783";
const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function activateContract() {
  // const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction
  const tx = {
    from: PUBLIC_KEY,
    to: contractAddress,
    // nonce: nonce,
    gas: 500000,
    data: nftContract.methods.setIsActive(true).encodeABI(),
  };

  const signPromise = web3.eth.accounts.signTransaction(tx, privateKey);

  signPromise
    .then((signedTx) => {
      web3.eth.sendSignedTransaction(
        signedTx.rawTransaction,
        function (err, hash) {
          if (!err) {
            console.log(
              "The hash of your transaction is: ",
              hash,
              "\nCheck Alchemy's Mempool to view the status of your transaction!"
            );
          } else {
            console.log(
              "Something went wrong when submitting your transaction:",
              err
            );
          }
        }
      );
    })
    .catch((err) => {
      console.log(" Promise failed:", err);
    });
}

activateContract();
