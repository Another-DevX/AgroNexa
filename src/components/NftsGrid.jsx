"use client";

import React from "react";
import { useAccount, useContractRead } from "wagmi";
import ABI from "../constants/contractAbi.json";
import { useEffect, useState } from "react";
import axios from "axios";
import { NFT } from "./Nft";
const NftsGrid = () => {
  const {isConnected} = useAccount()
  const [nfts, setNfts] = useState();
  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI,
    functionName: "getCurrentId",
  });

  useEffect(() => {
    if (data) {
      let dataSet = [];
      async function fetchAllData() {
        data.map((uri) => dataSet.push("https://ipfs.io/ipfs/" + uri));

        const responses = await Promise.all(
          dataSet.map((endpoint) => axios.get(endpoint))
        );
        let NftsData = [];
        responses.map((response, index) => NftsData.push({ ...response , ipfs: data[index] }))
        setNfts(NftsData);
      }
      fetchAllData();
    }
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full md:grid md:grid-cols-2">
      {(isConnected && nfts) && nfts.map((nft) => {
        return (
         <NFT key={nft.name}  nft={nft}/>
        );
      })} 
    </div>
  );
};

export default NftsGrid;
