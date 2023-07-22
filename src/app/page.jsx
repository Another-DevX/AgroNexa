"use client";
import Nav from "@/components/Nav";
import NftsGrid from "@/components/NftsGrid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Form from "@/components/Form";
import { useAccount } from "wagmi";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section className="min-h-screen " id="slide">

      </section>
      {isConnected ? (
        <NftsGrid />
      ) : (
          <h1 className="absolute top-2/4  bottom-2/4 font-bold text-4xl ">
            Conecta tu wallet
          </h1>
      )}
    </main>
  );
}
