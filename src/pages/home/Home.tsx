import React from "react";
import "./home.css";

import Sidebar from "../../component/sidebar/Sidebar.tsx";
import HomeNav from "../../component/homeNav/HomeNav.tsx";
import Recommended from "../../component/recommended/Recommended.tsx";

function Home({ contract, account }) {
  return (
    <div className="home">
      <div className="sidebar-home left">
        <Sidebar />
      </div>
      <div className="maincontainer-home right">
        <div className="divide-line"></div>
        <div className="container right">
          <div className="nav">
            <HomeNav />
          </div>
          <div className="mainContainer">
            <Recommended contract={contract} account={account} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
