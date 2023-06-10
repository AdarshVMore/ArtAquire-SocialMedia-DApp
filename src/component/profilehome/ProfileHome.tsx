import React, { useState, useRef, useEffect } from "react";
import "./profilehome.css";

function ProfileHome() {
  const [showForm, setShowForm] = useState(false);
  const [profileDone, setProfileDone] = useState(false);
  const nameRef = useRef();
  const aboutRef = useRef();
  const twitterRef = useRef();
  const linkedInRef = useRef();
  const portfolioLink = useRef();

  return (
    <div className="profile-home">
      <div className="">
        {showForm && !profileDone ? (
          <div className="profile-form">
            <div className="heading">Set Profile</div>

            <input type="text" ref={nameRef} required placeholder="Name" />
            <textarea type="text" ref={aboutRef} placeholder="About" rows={5} />
            <input type="text" ref={twitterRef} placeholder="Twitter" />
            <input type="text" ref={linkedInRef} placeholder="LinkedIN" />
            <input type="text" ref={portfolioLink} placeholder="Portfolio" />
            <button>Save</button>
          </div>
        ) : (
          <button
            className="set-profile-btn"
            onClick={() => {
              setShowForm(true);
            }}
          >
            Set Profile
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileHome;
