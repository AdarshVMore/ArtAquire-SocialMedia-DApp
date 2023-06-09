import React from "react";
import { BsBell } from "react-icons/bs";
import "./homenav.css";
import { Link } from "react-router-dom";

function HomeNav() {
  return (
    <div className="home-nav">
      <div className="left search-bar">
        <input type="text" placeholder="Search for Design" />
      </div>
      <div className="right">
        <button className="learn-btn">Learn</button>
        <BsBell size={24} color="white" />
        <button className="connect-wallet-btn">Connect Wallet</button>
        <Link to="/profile">
          <button className="profile-btn"></button>
        </Link>
      </div>
    </div>
  );
}

export default HomeNav;
