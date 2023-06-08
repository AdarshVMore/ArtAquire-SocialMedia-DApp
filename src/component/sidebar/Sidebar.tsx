import React from "react";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiCompass } from "react-icons/bi";
import "./sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <h1>uXHub</h1>
      </div>
      <div className="links">
        <div className="recomend each-link">
          <AiOutlineHome size={24} color="white" />
          <p>Recommended</p>
        </div>
        <div className="recomend each-link">
          <BiCompass size={24} color="white" />
          <p>Trending</p>
        </div>
        <div className="recomend each-link">
          <AiOutlineMail size={24} color="white" />
          <p>Post</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
