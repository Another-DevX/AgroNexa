"use client";
import Nav from "@/components/Nav";
import NftsGrid from "@/components/NftsGrid";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Form from "@/components/Form";
import { useAccount } from "wagmi";
import imagen from "../../public/Image1.svg";
import { motion } from "framer-motion";

export default function Home() {
  const { isConnected } = useAccount();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <section
        className="min-h-screen w-full flex flex-row gap-10 justify-start items-center"
        id="slide"
      >
        <span className="flex flex-col gap-9 items-start justify-start h-full">
          <motion.h1
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: "0%", opacity: 1 }}
            viewport={{ once: "true" }}
            className="text-6xl font-bold"
          >
            Del campo a tu puerta
          </motion.h1>
          <motion.p
            initial={{ x: "100%", opacity: 0 }}
            whileInView={{ x: "0%", opacity: 1 }}
            viewport={{ once: "true" }}
            className="text-xl"
          >
            ¡Comprar productos{" "}
            <span className="text-green-900 font-bold">organicos </span> nunca
            fue tan facil, estas a un solo click de distancia!
          </motion.p>
        </span>
        <Image className="hidden lg:inline" src={imagen}/>
      </section>
        <NftsGrid />
    </main>
  );
}
