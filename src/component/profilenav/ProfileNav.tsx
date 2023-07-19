import React, { useState } from "react";
import "./profilenav.css";
import { BiArrowBack } from "react-icons/bi";

function ProfileNav({ setButtonOn }) {
  const [postForm, setPostForm] = useState(false);
  return (
    <div className="profile-nav">
      <div className="right-profile-nav">
        <a href="/home">
          <BiArrowBack color="white" size={24} />
        </a>
      </div>

      <div className="left-profile-nav">
        {/* <a href="/postdesign"> */}
        <button
          className="post-design-btn"
          onClick={() => {
            setButtonOn(4);
          }}
        >
          Post Design
        </button>
        {/* </a> */}
        {/* <button
          className="start-streaming-btn"
          onClick={() => {
            setButtonOn(5);
          }}
        >
          Start Streaming
        </button> */}
      </div>
    </div>
  );
}

export default ProfileNav;
