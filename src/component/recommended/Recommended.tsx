import React, { useState, useEffect } from "react";
import axios from "axios";

import { FcLikePlaceholder } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";

import "./recommended.css";

function Recommended({ contract, account }) {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [allDesigns, setAllDesigns] = useState([]);
  console.log(contract);
  console.log(account);

  useEffect(() => {
    const getImageFromIPFS = async () => {
      // await contract.getAllDesigns();
      //   console.log(designs);
      const cid = "bafkreiduenhjrl7hjgh3lwxr6nvmfv4kzqzzizhzkbydxdabtcjptavzbm";
      try {
        const response = await axios.get(`https://ipfs.io/ipfs/${cid}`);
        if (response.status === 200) {
          setImageSrc(response.config.url || null);
        } else {
          console.error("Failed to fetch image from IPFS:", response.status);
        }
      } catch (error) {
        console.error("Error fetching image from IPFS:", error);
      }
    };

    getImageFromIPFS();
  }, []);

  return (
    <div className="recommended-designs">
      <div className="each-design">
        <div className="top">
          <div className="profile-img"></div>
          <div className="profile-name">Adarsh More</div>
        </div>
        <div className="desingn-name">New design Landing Page</div>
        <div className="design-img">
          {imageSrc && <img src={imageSrc} alt="IPFS Image" />}
        </div>
        <div className="bottom">
          <div className="left">
            <FcLikePlaceholder color="white" size={28} />
            <BiComment size={24} />
          </div>
          <div className="right">
            <button>
              <FaEthereum size={20} /> Own
            </button>
          </div>
        </div>
        <hr />
      </div>
      <div className="popup-design"></div>
    </div>
  );
}

export default Recommended;
