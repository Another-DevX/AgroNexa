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
<<<<<<< HEAD
// import {fadeIn} from
import { motion } from "framer-motion";
=======
import Link from "next/link";
>>>>>>> 8544e71234fe21abff9059dcfbd69e15b392101f

function NFT({ nft, key }) {
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
    console.debug({ price });
  }, [id, price, data]);

  const handleOnClick = () => {
    console.debug(id, price);
    write();
  };

  return (
    <motion.span
    initial={{opacity:0, size:"90%"}}
      // variants={fadeIn("rigth", "spring", 0.5 * key, 0.75)}
      whileInView={{ opacity: 1, size: "100%" }}
      key={nft.data.name}
      className="bg-white relative shadow-md rounded-md w-5/6 md:w-auto flex flex-col justify-center items-center"
    >
      <img src={nft.data.image} className="w-full full rounded-t-md" />
      <h3 className="text-xl md:text-4xl font-bold m-5 text-center">
        {nft.data.name}
      </h3>
      <p className="text-md md:text-base text-center">{nft.data.description}</p>
<<<<<<< HEAD
      {price && (
        <span className="absolute top-0 left-0 py-4 px-6 ">
          $ {price.toString().split("n")[0]} <span className="text-green-700"> Nexa</span>
        </span>
      )}
      <button
        disabled={!write}
        onClick={handleOnClick}
        className="py-2 px-4 rounded-md bg-green-600 hover:bg-green-500 duration-100 transition-all  shadow-sm my-5 w-4/6 text-white font-bold"
      >
        Adquirir
      </button>
    </motion.span>
=======
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
>>>>>>> 8544e71234fe21abff9059dcfbd69e15b392101f
  );
}
export { NFT };
