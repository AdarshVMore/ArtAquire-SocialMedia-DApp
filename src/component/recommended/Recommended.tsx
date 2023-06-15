import React, { useContext, useState, useEffect } from "react";
import IPFS from "ipfs-http-client";
import { ethers } from "ethers";

import { FcLikePlaceholder } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

import img1 from "../../assets/images/original-bee1f9219f261d4e6b069a9b56072369.webp";
import img2 from "../../assets/images/original-e59325da3301a39a2c5272c3473d6808.webp";
import img3 from "../../assets/images/original-bee1f9219f261d4e6b069a9b56072369.webp";

import "./recommended.css";

function Recommended({ contract, account, provider }) {
  const [postPopup, setPostPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  const [allDesigns, setAllDesigns] = useState([]);
  const [allFiles, setAllFiles] = useState([]);
  const soldFiles = [];
  let designs;
  let addedfiles = [];
  console.log(soldFiles);

  const getAddedFiles = async (cid) => {
    addedfiles = await contract.getAddedFiles(cid);
    console.log(addedfiles);
    setAllFiles(addedfiles);
  };

  const buyFile = async (cid, index) => {
    const value = await allFiles[index].fileValue.toNumber();
    const overrides = {
      value: ethers.utils.parseEther(value.toString()),
    };
    console.log(cid, index, { value: value });
    await contract.buyDesign(cid, index, overrides);
    console.log("file Bought");
    console.log(cid, index);
    const sold = { cid: cid, index: index };
    soldFiles.push(sold);
  };

  useEffect(() => {
    if (contract) {
      const getImageFromIPFS = async () => {
        console.log(contract);
        console.log(provider);

        designs = await contract.getAllDesigns();
        console.log(designs);
        if (designs) {
          setAllDesigns(designs);

          console.log(allDesigns);
        }
      };

      getImageFromIPFS();
    }
    console.log(allDesigns);
  }, [contract, designs]);

  return (
    <div className="recommended-designs">
      {allDesigns
        ? allDesigns.map((item, index) => (
            // <React.Fragment key={index}>
            <div className={`each-design ${postPopup ? `opacity-less` : ``}`}>
              <div className="top">
                <div className="profile-img"></div>
                <div className="profile-name">{item.creator}</div>
              </div>
              <div className="desingn-name">{item.name}</div>
              <div
                className="design-img"
                onClick={async () => {
                  await getAddedFiles(item.thumbnail);

                  setPopupIndex(index);
                  setPostPopup(true);
                  {
                    console.log(postPopup, designs);
                    console.log(addedfiles);
                  }
                }}
              >
                {item.PostType === "image" ? (
                  <img
                    src={`https://${item.thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                    alt="IPFS Image"
                  />
                ) : null}

                {item.PostType === "audio" ? (
                  <audio controls>
                    <source
                      src={`https://${item.thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                      type="audio/mpeg"
                    />
                  </audio>
                ) : null}

                {item.PostType === "video" ? (
                  <video controls>
                    <source
                      src={`https://${item.thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                      type="video/mp4"
                    />
                  </video>
                ) : null}
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
            // </React.Fragment>
          ))
        : ""}
      {postPopup && allDesigns ? (
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
                {allDesigns[popupIndex].PostType === "image" ? (
                  <img
                    src={`https://${allDesigns[popupIndex].thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                    alt=""
                  />
                ) : null}
                {allDesigns[popupIndex].PostType === "audio" ? (
                  <audio controls>
                    <source
                      src={`https://${allDesigns[popupIndex].thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                      type="audio/mpeg"
                    />
                  </audio>
                ) : null}
                {allDesigns[popupIndex].PostType === "video" ? (
                  <video controls>
                    <source
                      src={`https://${allDesigns[popupIndex].thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                      type="video/mp4"
                    />
                  </video>
                ) : null}
              </div>
              <div className="buy">
                <div className="heading">Buy</div>
                {allFiles.map((item, index) => (
                  <div className="buy-links">
                    <div className="view">
                      <p>{item.fileName}</p>
                      <p>{item.fileValue.toNumber()} ETH</p>
                      <button
                        onClick={() => {
                          buyFile(allDesigns[popupIndex].thumbnail, index);
                        }}
                      >
                        <FaEthereum size={20} /> Own
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="right">
              <div className="top">
                <div className="profile-img"></div>
                <div className="profile-name">
                  {/* {allDesigns[popupIndex].creator} */}
                </div>
              </div>
              <div className="desingn-name">{allDesigns[popupIndex].name}</div>
              <div className="middle">
                <p>{allDesigns[popupIndex].description}</p>
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
