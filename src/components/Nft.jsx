import React from "react";
import { useEffect, useState } from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import ABI from "../constants/contractAbi.json";
import { parseGwei } from "viem";
import Link from "next/link";

function NFT({ nft }) {
  console.debug(nft.ipfs);
  const [id, setId] = useState();
  const [price, setPrice] = useState();

  const { data } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI,
    functionName: "getNftData",
    args: [nft.ipfs],
  });
  const { address } = useAccount();
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI,
    functionName: "mint",
    args: [address, id, 1],
    value: parseGwei(price ? price.toString() : "0"),
  });
  const { write, status } = useContractWrite(config);

  useEffect(() => {
    if (data) {
      setId(data.id);
      setPrice(data.price);
    }
  }, [data]);

  useEffect(() => {
    console.debug(id, price);
  }, [id, price, data]);

  const handleOnClick = () => {
    console.debug(id, price);
    write();
  };

  return (
    <span
      key={nft.data.name}
      className="bg-white shadow-md rounded-md w-5/6 md:w-auto flex flex-col justify-center items-center"
    >
      <img src={nft.data.image} className="w-full full rounded-t-md" />
      <h3 className="text-xl md:text-4xl font-bold m-5 text-center">
        {nft.data.name}
      </h3>
      <p className="text-md md:text-base text-center">{nft.data.description}</p>
      <div className="flex gap-2">
        <button
          disabled={!write}
          onClick={handleOnClick}
          className="py-2 px-4 rounded-md bg-blue-400 shadow-sm my-5 w-4/6 text-white font-bold"
        >
          Adquirir
        </button>
        <Link href="/GenerateQr">
          <a>Get your QR Code</a>
        </Link>
      </div>
    </span>
  );
}
export { NFT };
