import { ethers } from "ethers";
import React, { FC, useEffect, useState } from "react";
import Polygoonz from "../artifacts/contracts/Polygoonz.sol/Polygoonz.json";
import { contractAddress } from "../config";

const MyPolygoonz: FC = (props) => {
  const [nfts, setNfts] = useState([]);
  const [loadingState, setLoadingState] = useState("not-loaded");
  useEffect(() => {
    loadNFTs();
  }, []);
  async function loadNFTs() {
    /* create a generic provider and query for unsold market items */
    const provider = new ethers.providers.JsonRpcProvider(
      process.env.NEXT_PUBLIC_ROPSTEN_NODE_URL
    );
    await provider.ready;
    const tokenContract = new ethers.Contract(
      contractAddress as string,
      Polygoonz.abi,
      provider
    );

    const data = await marketContract.fetchMarketItems();
    /*
     *  map over items returned from smart contract and format
     *  them as well as fetch their token metadata
     */
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoadingState("loaded");
  }
  return <div></div>;
};
