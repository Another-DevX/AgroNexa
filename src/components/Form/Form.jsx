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
    console.log(response.data);
  };
  return (
    <form onSubmit={handleOnSubmit} className="flex flex-col items-center bg-slate-800 gap-8 py-8 px-4 rounded-sm shadow-lg shadow-black">
      <div className="flex flex-col gap-2">
      <h2 className="text-neutral-200 font-bold text-lg">Please fill the form</h2>

        <FormSection type="Name"/>
        <FormSection type="Description"/>
        <FormSection type="Image"/>
      </div>

      <button type="submit" className="px-10 py-2 text-neutral-200 bg-blue-700 font-bold rounded-xs ">Submit</button>
    </form>
  );
};
