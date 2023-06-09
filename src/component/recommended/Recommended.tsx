import React, { useState, useEffect } from "react";
import axios from "axios";

import { FcLikePlaceholder } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import img1 from "../../assets/images/original-bee1f9219f261d4e6b069a9b56072369.webp";
import img2 from "../../assets/images/original-e59325da3301a39a2c5272c3473d6808.webp";
import img3 from "../../assets/images/original-bee1f9219f261d4e6b069a9b56072369.webp";

import "./recommended.css";

function Recommended({ contract, account }) {
  const [postPopup, setPostPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [allDesigns, setAllDesigns] = useState([]);
  console.log(contract);
  console.log(account);

  const demoData = [
    {
      creator: "adarsh",
      designName: "new page",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus adipisci porro quis alias voluptatem ullam.",
      designInage: img1,
      viewValue: "2",
      editValue: "3",
    },
    {
      creator: "adarsh1",
      designName: "new 2page",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus adipisci porro quis alias voluptatem ullam.",
      designInage: img2,
      viewValue: "2",
      editValue: "3",
    },
    {
      creator: "adarsh2",
      designName: "new 3page",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus adipisci porro quis alias voluptatem ullam.",
      designInage: img3,
      viewValue: "2",
      editValue: "3",
    },
  ];

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
      {demoData.map((item, index) => (
        <React.Fragment key={index}>
          <div
            className={`each-design ${postPopup ? `opacity-less` : ``}`}
            onClick={() => {
              setPostPopup(true);
              setPopupIndex(index);
            }}
          >
            <div className="top">
              <div className="profile-img"></div>
              <div className="profile-name">{item.creator}</div>
            </div>
            <div className="desingn-name">{item.designName}</div>
            <div className="design-img">
              {imageSrc && <img src={item.designInage} alt="IPFS Image" />}
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
        </React.Fragment>
      ))}

      {postPopup ? (
        <>
          <div className="popup-design">
            <div
              className="close"
              onClick={() => {
                setPostPopup(false);
              }}
            >
              <AiOutlineClose size={24} color="white" />
            </div>
            <div className="left">
              <div className="img">
                <img src={demoData[popupIndex].designInage} alt="" />
              </div>
              <div className="buy">
                <div className="heading">Buy</div>
                <div className="buy-links">
                  <div className="view">
                    <p>View Access</p>
                    <p>{demoData[popupIndex].viewValue}</p>
                    <button>
                      <FaEthereum size={20} /> Own
                    </button>
                  </div>
                  <div className="edit">
                    <p>Edit Access</p>
                    <p>{demoData[popupIndex].editValue}</p>
                    <button>
                      <FaEthereum size={20} /> Own
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="right">
              <div className="top">
                <div className="profile-img"></div>
                <div className="profile-name">
                  {demoData[popupIndex].creator}
                </div>
              </div>
              <div className="desingn-name">
                {demoData[popupIndex].designName}
              </div>
              <div className="middle">
                <p>{demoData[popupIndex].description}</p>
              </div>
              <div className="botttom">500 likes</div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Recommended;
