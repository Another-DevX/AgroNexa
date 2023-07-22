'use client'
import React from "react";
import axios from "axios";

export default function Form() {
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://api.pinata.cloud/pinning/pinJSONToIPFS",
      JSON.stringify({
        name: "testname",
        description: "testdescription",
      }),
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.debug(response.data);
  };
  return (
    <div className="flex justify-center">
      <div className="w-60 h-1/2 p-6 flex flex-col items-start bg-[#0D1926] rounded-lg gap-1">
        <div>
          <h2 className="text-[#10E698] text-3xl xl:text-4xl font-bold">Create Your</h2>
          <h2 className="text-[#10E698] text-3xl xl:text-4xl font-bold">Product</h2>
        </div>
        <p className="text-[#CFD1D4] text-xs xl:mt-2">mint your nft</p>

        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 flex flex-col">
            <span className="text-[#10E698]">Nombre</span>
            <input
              className="w-full text-gray-500 focus:outline-none px-1 rounded-sm"
              placeholder="Nombre"
            ></input>
          </div>

          <div className="flex-1 flex flex-col">
            <span className="text-[#10E698]">Apellido</span>
            <input
              className="w-full text-gray-500 focus:outline-none px-1 rounded-sm"
              placeholder="Apellido"
            ></input>
          </div>
        </div>

        <div className="flex flex-col w-full">
          <span className="text-[#10E698]">Email</span>
          <input
            className="w-full font-light text-gray-500 focus:outline-none px-1 rounded-sm"
            placeholder="Email"
          ></input>
        </div>

        <button onClick={handleOnSubmit} className="w-full py-1 xl:py-2 mt-4 rounded-md font-medium bg-[#10e698] hover:bg-[#10e69870] hover:text-neutral-100 transition-all ease-in-out duration-300">
          Send
        </button>
      </div>
    </div>
  );
};
