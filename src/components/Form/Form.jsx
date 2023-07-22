'use client'
import React, { useState } from "react";
import axios from "axios";
import FormSection from "../FormSection";

export default function Form() {

  const handleOnSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.debug(data)

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
    <form onSubmit={handleOnSubmit} className="flex flex-col items-center bg-slate-800 gap-8 py-8 px-4 rounded-lg w-80">
      <div className="flex flex-col gap-2">
        <FormSection type="Name"/>
        <FormSection type="Description"/>
        <FormSection type="Image"/>
      </div>

      <button className="px-4 py-2 bg-slate-500 font-bold rounded-lg ">Submit</button>
    </form>
  );
};
