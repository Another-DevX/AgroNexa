"use client";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import React from "react";
import { useAccount } from "wagmi";
import Logo from "../../public/AGRONEXA.svg";
import Image from "next/image";
const Nav = () => {
  const { isConnected } = useAccount();

  return (
    <nav className="fixed top-0 z-50 left-0 right-0 shadow-lg h-20 backdrop-blur-md">
      <ul className="w-full h-full flex flex-row justify-around items-center">
<<<<<<< HEAD
        <li className="absolute left-20" >
          <Link href="/">
            <Image width={48} heigth={48} src={Logo} />
          </Link>
=======
        <li>
          <Link className="font-bold text-xl" href="/">AgroNexa</Link>
>>>>>>> 8544e71234fe21abff9059dcfbd69e15b392101f
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
