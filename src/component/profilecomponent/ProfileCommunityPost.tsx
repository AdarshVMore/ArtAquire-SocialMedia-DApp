import React from "react";
import { Link } from "react-router-dom";
import "./ProfileCommunityPost.css";
import { BsSuitHeart } from "react-icons/bs";
import {BsChatLeft } from "react-icons/bs";
function ProfileCommunityPost() {
  return <div>
    <button className="post-btn"><span className="btn-txt">Post</span></button>
    <div className="input-section">
    <div className="profile-disp">
          <Link to="/profile">
          <button className="profile-btn"></button>
        </Link>
        <p>Adarsh More Designs</p>
      </div>
      <div className="input-text">
      <textarea className="post-text"name="text" wrap="soft" placeholder="Enter your post..."></textarea>
        {/* <input type="text" className="post-text" placeholder="Enter your text here.."/> */}
      </div>
    </div>
    <div className="post-section">
    <div className="profile-disp">
          <Link to="/profile">
          <button className="profile-btn"></button>
        </Link>
        <p>Adarsh More Designs</p>
      </div>
      <div className="post">
      <p>Free Unicorn svg files Free SVG Files to download from Cut That Design. We provide a large selection of Free SVG Files for Silhouette, Cricut and other cutting machines. Available for Free in SVG, DXF, EPS and PNG Formats. Get your Free SVG Files today! Free SVG Files to download from Cut That Design</p>
      </div>
      <div className="interact">
      <BsSuitHeart size={24} color="white" />
      <BsChatLeft size={24} color="white" />
      </div>
      <div className="bottom-line"></div>
      
    </div>
    
   
    
  </div>;
}

export default ProfileCommunityPost;
