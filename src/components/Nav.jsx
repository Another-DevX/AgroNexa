import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

const Nav = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 shadow-lg h-16">
      <ul className="w-full h-full flex flex-row justify-around items-center">
        <li>Title</li>
        <li>
          <ConnectButton />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
