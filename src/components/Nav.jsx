"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";

const Nav = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="absolute top-0 left-0 right-0 shadow-lg h-16">
      <ul className="w-full h-full flex flex-row justify-around items-center">
        <li>
          <Link href="/">Title</Link>
        </li>
        {isConnected && (
          <li>
            <Link href="/AddProduct">Añadir producto</Link>
          </li>
        )}
        <li>
          <ConnectButton />
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
