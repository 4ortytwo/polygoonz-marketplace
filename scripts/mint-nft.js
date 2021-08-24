require("dotenv").config();

const { NEXT_PUBLIC_API_URL: API_URL, NEXT_PUBLIC_PUBLIC_KEY: PUBLIC_KEY } =
  process.env;

const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

const web3 = createAlchemyWeb3(API_URL);

const contract = require("../artifacts/contracts/Polygoonz.sol/Polygoonz.json");

const contractAddress = "0x8780bffc3aac7ebc40194bcd70d20b7d4e6a92b6";

const nftContract = new web3.eth.Contract(contract.abi, contractAddress);

async function mintNFT(tokenURI) {
  const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest"); //get latest nonce

  //the transaction

  const tx = {
    from: PUBLIC_KEY,

    to: contractAddress,

    nonce: nonce,

    gas: 500000,

    data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
  };
}
