"use client";
import React, { useState } from "react";
import axios from "axios";
import { useAccount } from "wagmi";
import { useRouter } from 'next/navigation'

export default function Form() {
  const { address, isConnected } = useAccount();
  const router = useRouter()
  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const dataApi = Object.fromEntries(formData.entries());
    const dataIPFS = Object.fromEntries(formData.entries());
    delete dataApi.name;
    delete dataApi.description;
    delete dataIPFS.price;
    delete dataIPFS.quantity;
    delete dataIPFS.type;
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      JSON.stringify({
        ...dataIPFS,
        image:
          dataApi.type === 0
            ? "https://lavaquita.co/cdn/shop/products/76b6170a-f1e1-4a92-8622-cee94a659b91_700x700.png?v=1622197616"
            : "https://fruittoday.com/wp-content/uploads/2022/02/conservar-aguacate-correctamente.jpg",
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          "Content-Type": "application/json",
        },
      }
    );
    const IPFS = response.data;
    axios.post("anotherApi", {
      ...dataApi,
      address,
      ipfs: IPFS,
    });
  };

  if(!isConnected){
    router.push("/")
  }

  return (
    <div className="p-10 rounded-lg shadow-md bg-slate-400">
      <h1 className="font-bold text-4xl my-5">¡Crea tu producto!</h1>

      <form onSubmit={handleOnSubmit} className="flex flex-col gap-5 p-2">
        <select placeholder="Tipo" className="h-8" name="type" id="type">
          <option value="1">Banano</option>
          <option value="2">Aguate</option>
        </select>
        <input
          className="h-8 indent-2"
          placeholder="Nombre"
          type="text"
          id="name"
          name="name"
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
