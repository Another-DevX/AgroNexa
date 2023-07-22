"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAccount, useContractWrite } from "wagmi";
import { useRouter } from "next/navigation";
import { usePrepareContractWrite } from "wagmi";
import ABI from "../constants/contractAbi.json";
import { useEffect } from "react";
import { toast } from "react-toastify";
export default function Form() {
  const { isConnected } = useAccount();
  const [ipfs, setIpfs] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();
  const router = useRouter();
  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT,
    abi: ABI,
    functionName: "addProduct",
    args: [quantity, price, ipfs],
  });
  const { write, status } = useContractWrite(config);
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataApi = Object.fromEntries(formData.entries());
    const dataIPFS = Object.fromEntries(formData.entries());
    const img = "https://lavaquita.co/cdn/shop/products/76b6170a-f1e1-4a92-8622-cee94a659b91_700x700.png?v=1622197616" ? dataApi == "banano" : "data:image/jpeg;base64,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"
    delete dataApi.name;
    delete dataApi.description;
    delete dataIPFS.quatity;
    delete dataIPFS.price;
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      JSON.stringify({
        description: dataApi.description,
        external_url: "https://google.com",
        image: img,
        name: dataApi.name,
        attributes: []
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          "Content-Type": "application/json",
        },
      }
    );
    setIpfs(response.data.IpfsHash);
    setPrice(dataApi.price);
    setQuantity(dataApi.quantity);
  };

  useEffect(() => {
    if (ipfs && quantity && price && write && status === "idle") {
      write();
    } else if (status !== "idle") {
      const id = toast.loading("Please wait...", {toastId: 'customId'});
      if (status === "success") {
        toast.update(id, {
          render: "Created",
          type: "success",
          isLoading: false,
          autoClose: 5000,
          onClose: router.push('/')
        });
      }
    }
  }, [ipfs, quantity, price, status, write]);

  if (!isConnected) {
    router.push("/");
  }

  return (
    <div className="p-10 rounded-lg shadow-md bg-slate-400">
      <h1 className="font-bold text-4xl my-5">¡Crea tu producto!</h1>

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5 p-2">
        <input
          className="h-8 indent-2"
          placeholder="Nombre"
          type="text"
          id="select"
          name="select"
        />
        <input
          className="h-8 indent-2"
          placeholder="Descripcion"
          type="text"
          id="description"
          name="description"
        />
        <div className="flex flex-row gap-5">
          <input
            className="h-8 indent-2"
            placeholder="Precio"
            type="number"
            id="price"
            name="price"
          />
          <input
            className="h-8 indent-2"
            type="number"
            placeholder="Cuantas unidades"
            id="quantity"
            name="quantity"
          />
        </div>

        <button
          type="submit"
          className="px-10 py-2 text-neutral-200 bg-blue-700 font-bold rounded-xs "
        >
          Submit
        </button>
      </form>
    </div>
  );
}