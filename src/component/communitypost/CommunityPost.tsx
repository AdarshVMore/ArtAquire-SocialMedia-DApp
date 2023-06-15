import React from "react";
import "./CommunityPost.css"
import { Link } from "react-router-dom";
import { BsSuitHeart } from "react-icons/bs";
import {BsChatLeft } from "react-icons/bs";
function CommunityPost({ contract, account }) {
  return <div>
    <div className="posts">
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
    </div>
    
    </div>;
}

export default CommunityPost;
