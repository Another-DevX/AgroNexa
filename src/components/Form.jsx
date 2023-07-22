'use client'
import React, { useState } from "react";
import axios from "axios";

export default function Form() {

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)

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
    <form onSubmit={handleOnSubmit} className="flex flex-col items-center bg-slate-800">
      <input type="text" placeholder="Name" />
      <input type="text" placeholder="Description" />
      <input type="text" placeholder="Image" />
      <button>Submit</button>
    </form>
  );
};
