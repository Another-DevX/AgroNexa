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
    delete dataApi.name;
    delete dataApi.description;
    delete dataIPFS.quatity;
    delete dataIPFS.price;
    const img =
      dataIPFS.name === "papa"
        ? "https://plazavea.vteximg.com.br/arquivos/ids/518600-512-512/20171835.jpgAPA"
        : dataIPFS.name === "tomate"
        ? "https://www.mercapava.com.co/wp-content/uploads/mpava/mpava-17058.jpg"
        : dataIPFS.name === "platano"
        ? "https://www.quimicaysociedad.org/wp-content/uploads/2015/06/platano.jpg"
        : "https://www.comervipc.com/wp-content/uploads/2020/04/Aguacate_Hass_comervipc.jpg";
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      JSON.stringify({
        description: dataIPFS.description,
        external_url: "https://google.com",
        image: img,
        name: dataIPFS.name,
        attributes: [],
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
      const id = toast.loading("Please wait...", { toastId: "customId" });
      if (status === "success") {
        toast.update(id, {
          render: "Created",
          type: "success",
          isLoading: false,
          autoClose: 1000,
          onClose: () => router.push("/"),
        });
      }
    }
  }, [ipfs, quantity, price, status, write]);

  if (!isConnected) {
    router.push("/");
  }

  return (
    <div className="p-10 rounded-lg shadow-lg bg-slate-200">
      <h1 className="font-bold text-4xl my-5">¡Crea tu producto!</h1>

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5 p-2 ">
        <select
          name="name"
          id="name"
          className="h-8 rounded-tr-lg indent-2 bg-white"
          placeholder="Tipo"
        >
          <option value="papa">Papa</option>
          <option value="tomate">Tomate</option>
          <option value="platano">Platano</option>
          <option value="aguacate">Aguacate</option>
        </select>

        <input
          className="h-8 rounded-tr-lg indent-2"
          placeholder="Descripcion"
          type="text"
          id="description"
          name="description"
        />
        <div className="flex flex-row gap-5">
          <input
            className="h-8 rounded-tr-lg indent-2"
            placeholder="Precio"
            type="number"
            id="price"
            name="price"
          />
          <input
            className="h-8 rounded-tr-lg indent-2"
            type="number"
            placeholder="Cuantas unidades"
            id="quantity"
            name="quantity"
          />
        </div>

        <button
          type="submit"
          className="px-10 py-2 text-neutral-200 bg-green-600 hover:bg-green-500 transition-all font-bold rounded-xs "
        >
          Subir!
        </button>
      </form>
    </div>
  );
}
