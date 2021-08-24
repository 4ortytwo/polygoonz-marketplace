import React from "react";
import { Button, Container, Flex } from "@chakra-ui/react";
import Head from "next/head";
import Image from "next/image";
import Polygoonz from "../artifacts/contracts/Polygoonz.sol/Polygoonz.json";
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { contractAddress } from "../config";

export default function Home() {
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
    const transaction = await contract.purchase(2, {
      value: ethers.utils.parseEther(`${0.1 * 2}`),
    });
    await transaction.wait();
  };

  return (
    <Flex justify="center">
      <Container maxW="container.xl">
        <Button colorScheme="purple" onClick={mint}>
          Mint
        </Button>
      </Container>
    </Flex>
  );
}
