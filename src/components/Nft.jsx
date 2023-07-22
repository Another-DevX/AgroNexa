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
// import {fadeIn} from
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import QRCode from "qrcode.react";

function NFT({ nft, key }) {
  const router = useRouter();
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
  const [showQR, setShowQR] = useState(false);

  const toggleQR = () => {
    setShowQR(!showQR);
  };
  useEffect(() => {
    if (data) {
      setId(data.id);
      setPrice(data.price);
    }
  }, [data]);

  useEffect(() => {
    // console.debug({ price });
  }, [id, price, data]);

  const handleOnClick = () => {
    // console.debug(id, price);
    write();
  };

  // console.debug(nft)

  return (
    <motion.span
      initial={{ opacity: 0, size: "90%" }}
      // variants={fadeIn("rigth", "spring", 0.5 * key, 0.75)}
      whileInView={{ opacity: 1, size: "100%" }}
      key={nft.data.name}
      className="bg-white relative shadow-md rounded-md w-full md:w-auto flex flex-col justify-center items-center"
    >
      <img
        src={nft.data.image}
        onClick={toggleQR}
        className="w-full h-full rounded-t-md"
        // style={{ visibility: showQR ? "hidden" : "visible" }}
      />
      {/* {data.id && showQR && ( */}
        {/* <div className=" absolute flex justify-center items-center w-full h-2/6"> */}
          {/* <QRCode onClick={toggleQR} value={data.id} /> */}
        {/* </div> */}
      {/* )} */}

      <h3 className="text-xl md:text-4xl font-bold m-5 text-center">
        {nft.data.name}
      </h3>
      <p className="text-md md:text-base text-center">{nft.data.description}</p>
      {price && (
        <span className="absolute top-0 left-0 py-4 px-6 ">
          $ {price.toString().split("n")[0]}{" "}
          <span className="text-green-700"> Nexa</span>
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
  );
}
export { NFT };
