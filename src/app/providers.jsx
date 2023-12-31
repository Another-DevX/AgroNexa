'use client'

import * as React from 'react'
import {
  RainbowKitProvider,
  getDefaultWallets,
  connectorsForWallets
} from '@rainbow-me/rainbowkit'
import {
  coreWallet,
  metaMaskWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { Chain } from '@wagmi/core'
 
const avalanche = {
  id: 666,
  name: "AgroNexa",
  network: "agronexa",
  iconUrl: "https://example.com/icon.svg",
  iconBackground: "#fff",
  nativeCurrency: {
    decimals: 18,
    name: "Nexa",
    symbol: "NEXA",
  },
  rpcUrls: {
    public: {
      http: [
        "http://137.184.128.122:9650/ext/bc/UMqd7NHzj14t26yJq1WEq7jHmsKrKwECYe6z1esCseupW2Yb1/rpc",
      ],
    },
    default: {
      http: [
        "http://137.184.128.122:9650/ext/bc/UMqd7NHzj14t26yJq1WEq7jHmsKrKwECYe6z1esCseupW2Yb1/rpc",
      ],
    },
  },
  blockExplorers: {
    default: { name: "SnowTrace", url: "https://snowtrace.io" },
    etherscan: { name: "SnowTrace", url: "https://snowtrace.io" },
  },
  testnet: false,
};
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [avalanche],
  [publicProvider()]
);

const projectId = "YOUR_PROJECT_ID";

const { wallets } = getDefaultWallets({
  appName: "RainbowKit demo",
  projectId,
  chains,
});

const demoAppInfo = {
  appName: "Rainbowkit Demo",
};

const connectors = connectorsForWallets([
  // ...wallets,
  {
    groupName: "Avalanche",
    wallets: [
      coreWallet({ projectId, chains }),
      metaMaskWallet({ projectId, chains }),
    ],
  },
]);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

export function Providers({ children }) {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains} appInfo={demoAppInfo}>
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
