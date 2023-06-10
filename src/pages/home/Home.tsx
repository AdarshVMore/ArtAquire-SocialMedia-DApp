import React, { useState } from "react";
import "./home.css";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiCompass } from "react-icons/bi";

import HomeNav from "../../component/homeNav/HomeNav.tsx";
import Recommended from "../../component/recommended/Recommended.tsx";
import Trending from "../../component/trending/Trending.tsx";
import CommunityPost from "../../component/communitypost/CommunityPost.tsx";

function Home({ contract, account, provider }) {
  const [buttonOn, setButtonOn] = useState(0);

  return (
    <div className="home">
      <div className="sidebar-home left">
        {/* <Sidebar /> */}
        <div className="sidebar">
          <div className="logo">
            <h1>uXHub</h1>
          </div>
          <div className="links">
            <div
              className={`recomend each-link ${buttonOn === 0 ? "active" : ""}`}
              onClick={() => {
                setButtonOn(0);
              }}
            >
              <AiOutlineHome size={24} color="white" />
              <p>Recommended</p>
            </div>
            <div
              className={`recomend each-link ${buttonOn === 1 ? "active" : ""}`}
              onClick={() => {
                setButtonOn(1);
              }}
            >
              <BiCompass size={24} color="white" />
              <p>Trending</p>
            </div>
            <div
              className={`recomend each-link ${buttonOn === 2 ? "active" : ""}`}
              onClick={() => {
                setButtonOn(2);
              }}
            >
              <AiOutlineMail size={24} color="white" />
              <p>Post</p>
            </div>
          </div>
        </div>
      </div>
      <div className="maincontainer-home right">
        <div className="divide-line"></div>
        <div className="container right">
          <div className="nav">
            <HomeNav contract={contract} account={account} />
          </div>
          <div className="mainContainer">
            {buttonOn === 0 ? (
              <Recommended
                contract={contract}
                account={account}
                provider={provider}
              />
            ) : (
              ""
            )}
            {buttonOn === 1 ? (
              <Trending contract={contract} account={account} />
            ) : (
              ""
            )}
            {buttonOn === 2 ? (
              <CommunityPost contract={contract} account={account} />
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
