import "./App.css";
import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UIHub from "./UIHub.json";
import { ethers } from "ethers";

import Home from "./pages/home/Home.tsx";
import Profile from "./pages/profile/Profile.tsx";

function App() {
  const [account, setAccount] = useState("");
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
        setAccount(address);
        let contractAddress = "0x9666363d8181074028a55E9aeB072d3e22CBAd08";
        // let contractAddress = "0xF3c41f6426e85D198f51563a3145e731165dbf86";

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
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home contract={contract} account={account} provider={provider} />
            }
          />
          <Route
            path="/profile"
            element={
              <Profile
                contract={contract}
                account={account}
                provider={provider}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
