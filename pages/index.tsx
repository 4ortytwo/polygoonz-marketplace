import React, { useState } from "react";
import { Button, Container, Flex, Stack, Text } from "@chakra-ui/react";
import Polygoonz from "../artifacts/contracts/Polygoonz.sol/Polygoonz.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress } from "../config";

export default function Home() {
  const [tokenURI, setTokenURI] = useState("");
  const mint = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress as string,
      Polygoonz.abi,
      signer
    );

    // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.purchase(1, {
      value: ethers.utils.parseEther(`0.1`),
    });
    await transaction.wait();
  };
  const setBaseURI = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress as string,
      Polygoonz.abi,
      signer
    );

    // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.setRevealedBaseURI(
      "ipfs://QmPrKZzh3CNKGJLCWUjus5W4iMeseF61H8dQeT6RY8KdDr/"
    );
    await transaction.wait();
  };

  const getTokenURI = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    // const provider = new ethers.providers.JsonRpcProvider(
    //   process.env.NEXT_PUBLIC_API_URL
    // );
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress as string,
      Polygoonz.abi,
      signer
    );

    // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");

    const tokenURI = await contract.tokenURI(102);

    setTokenURI(tokenURI);
    // const response =
    // console.log("RESPONSE: ", response);
  };

  return (
    <Flex justify="center">
      <Container maxW="container.xl">
        <Stack>
          <Button colorScheme="purple" onClick={mint}>
            Mint
          </Button>
          {/* <Button colorScheme="pink" onClick={setBaseURI}>
            Set base URI
          </Button>
          <Button colorScheme="pink" onClick={getTokenURI}>
            Get Token URI
          </Button>
          {tokenURI && <Text>{tokenURI}</Text>} */}
        </Stack>
      </Container>
    </Flex>
  );
}
