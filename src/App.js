import "./App.css";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UIHub from "./UIHub.json";
import { ethers } from "ethers";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig, useAccount } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

import Home from "./pages/home/Home.tsx";
import Profile from "./pages/profile/Profile.tsx";
import LandingPage from "./pages/landing/LandingPage.tsx";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId: "30980df3d204e25c5ae7cfe90918d5ef",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [contract, setContract] = useState("");
  const [provider, setProvider] = useState("");
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);
    const loadProvider = async () => {
      if (provider) {
        window.ethereum.on("chainChanged", () => {
          window.location.reload();
        });

        window.ethereum.on("accountsChanged", () => {
          window.location.reload();
        });
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        let contractAddress = "0x36286c0E7a58Bad47725084959Ab554F4545860C";

        const contract = new ethers.Contract(
          contractAddress,
          UIHub.abi,
          signer
        );

        setContract(contract);
        setProvider(provider);
      } else {
        console.error("Metamask is not installed");
      }
      console.log(contract);
    };
    loadProvider().catch((e) => console.log(e, "is error"));

    provider && loadProvider();
  }, []);

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        theme={darkTheme({
          accentColor: "#0077ff",
          accentColorForeground: "white",
          borderRadius: "large",
        })}
      >
        <div className="App">
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <LandingPage
                  // contract={contract}
                  // account={account}
                  // provider={provider}
                  />
                }
              />
              <Route
                path="/home"
                element={
                  <Home
                    contract={contract}
                    account={address}
                    provider={provider}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <Profile
                    contract={contract}
                    account={address}
                    provider={provider}
                  />
                }
              />
            </Routes>
          </BrowserRouter>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
