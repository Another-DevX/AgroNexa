import React from "react";
import axios from "axios";

export default function Form() {
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = axios.post(
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
    <div>
      Form
      <button onClick={handleOnSubmit}>CLICKME!!</button>
    </div>
  );
}
