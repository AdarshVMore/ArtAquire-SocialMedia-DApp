import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import "./homenav.css";
import { Link } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";

function HomeNav({ contract, account }) {
  const [isConnected, setIsConnected] = useState(false);

  // if (contract) {
  //   setIsConnected(true);
  // }

  const formattedAccount =
    account.length > 8
      ? `${account.slice(0, 6)}...${account.slice(-4)}`
      : account;

  return (
    <div className="home-nav">
      <div className="left search-bar">
        <input type="text" placeholder="Search for Design" />
      </div>
      <div className="right">
        {/* <button className="learn-btn">Learn</button> */}
        <BsBell size={24} color="white" />
        {/* {isConnected ? (
          <button className="connect-wallet-btn">Connect Wallet</button>
        ) : ( */}
        <p>
          <ConnectButton />
        </p>
        {/* )} */}
        <Link to="/profile">
          <button className="profile-btn"></button>
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;
