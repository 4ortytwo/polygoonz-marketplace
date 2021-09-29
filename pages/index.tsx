import React, {
  useState,
  useLayoutEffect,
  useEffect,
  useReducer,
  useCallback,
} from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  CloseButton,
  Container,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import Polygoonz from "../artifacts/contracts/Polygoonz.sol/Polygoonz.json";
import PolygoonzFarm from "../artifacts/contracts/PolygoonzFarm.sol/PolygoonzFarm.json";
import Web3Modal from "web3modal";
import { ethers, providers } from "ethers";
import { contractAddress } from "../config";
import { Web3Provider } from "@ethersproject/providers";
import web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { injected } from "@src/lib/connectors";
import { useEthers } from "@usedapp/core";

export default function Home() {
  const [tokenURI, setTokenURI] = useState("");

  const {
    activate,
    active,
    deactivate,
    activateBrowserWallet,
    library: provider,
    chainId,
  } = useEthers();

  // const handleChainChange = useCallback(() => window.location.reload(), []);

  useEffect(() => {
    provider?.on("chainChanged", async (chainId: number) => {
      window.location.reload();
    });

    provider?.on("networkChanged", async (networkId: number) => {
      window.location.reload();
    });
  }, []);

  const mint = async () => {
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider?.getSigner();
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
      "ipfs://Qmb13dCcGD5ewVPYqitTGKH8BS4C3k6WjBbE5vsVPycWhC/"
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

  // staking

  const stake = async () => {
    try {
      const signer = provider?.getSigner();
      const contract = new ethers.Contract(
        "0x118469B57444659b360ffF137839073b778EC639",
        PolygoonzFarm.abi,
        signer
      );

      // const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
      const transaction = await contract.stakeNFT([128]);
      await transaction.wait();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <Flex justify="center">
      <Container maxW="container.xl">
        <Stack>
          <Button onClick={active ? deactivate : activateBrowserWallet}>
            {active ? "Disconnect" : "Connect"}
          </Button>

          {chainId !== 80001 && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle mr={2}>Wrong network!</AlertTitle>
              <AlertDescription>
                Please connect to Polygon Mumbai Network
              </AlertDescription>
            </Alert>
          )}
          <Button
            colorScheme="purple"
            onClick={() => console.log("STATE: ", provider)}
          >
            LOG
          </Button>
          {active && (
            <Button
              disabled={chainId !== 80001}
              colorScheme="purple"
              onClick={mint}
            >
              Mint
            </Button>
          )}
          <Divider />
          <Button colorScheme="pink" onClick={setBaseURI}>
            Set base URI
          </Button>
          <Button colorScheme="pink" onClick={getTokenURI}>
            Get Token URI
          </Button>
          {tokenURI && <Text>{tokenURI}</Text>}
          <Divider />
          <Button colorScheme="whatsapp" onClick={stake}>
            Stake
          </Button>
        </Stack>
      </Container>
    </Flex>
  );
}
