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
        let contractAddress = "0xF5598eA7B32160423cF42F0de86Ec5B373237940";

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
    };
    provider && loadProvider();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<Home contract={contract} account={account} />}
          />
          <Route
            path="/profile"
            element={<Profile contract={contract} account={account} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
