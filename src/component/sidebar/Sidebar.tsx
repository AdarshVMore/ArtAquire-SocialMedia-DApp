import React, { useState } from "react";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiCompass } from "react-icons/bi";
import "./sidebar.css";

function Sidebar() {
  const [buttonOn, setButtonOn] = useState(0);

  return (
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
  );
}

export default Sidebar;
