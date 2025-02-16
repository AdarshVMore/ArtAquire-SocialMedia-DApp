import React, { useContext, useState, useEffect } from "react";
import IPFS from "ipfs-http-client";
import { ethers } from "ethers";
import db from "../../polybase";

import { FcLikePlaceholder } from "react-icons/fc";
import { BiComment } from "react-icons/bi";
import { FaEthereum } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";

import img1 from "../../assets/images/original-bee1f9219f261d4e6b069a9b56072369.webp";
import img2 from "../../assets/images/original-e59325da3301a39a2c5272c3473d6808.webp";
import img3 from "../../assets/images/original-bee1f9219f261d4e6b069a9b56072369.webp";

import "./recommended.css";

function Recommended({ contract, account, provider }) {
  const [postPopup, setPostPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);
  const [isActive, setActive] = useState(0);
  const [isFollowed, setIsFollowed] = useState(false);
  const [profileDesign, setProfileDesigns] = useState();
  const [images, setImages] = useState([]);
  let profileDesigns = [];

  const [allDesigns, setAllDesigns] = useState([]);
  const [allFiles, setAllFiles] = useState([]);

  const [userInfo, setUserInfo] = useState();

  let propertyInfo;
  const [myProfile, setMyProfile] = useState();
  const soldFiles = [];
  let designs;
  let addedfiles = [];

  const getAddedFiles = async (cid) => {
    addedfiles = await contract.getAddedFiles(cid);
    console.log(addedfiles);
    setAllFiles(addedfiles);
  };

  const buyFile = async (cid, index) => {
    try {
      const gasPriceInWei = "20000000000"; // Replace this with your desired gas price (20 Gwei in Wei)
      const value = await allFiles[index].fileValue.toNumber();
      const overrides = {
        value: ethers.utils.parseEther(value.toString()),
        gasPrice: gasPriceInWei, // Specify the gas price in the transaction overrides
      };

      console.log(cid, index, { value: value, gasPrice: gasPriceInWei });
      await contract.buyDesign(cid, index, overrides);
      console.log("File Bought");
    } catch (error) {
      console.error("Error in buyFile:", error);
    }
  };

  useEffect(() => {
    const getImageFromIPFS = async () => {
      try {
        console.log(1);
        if (contract) {
          console.log(2);

          console.log(contract);
          console.log(provider);

          console.log("designs are ", await contract.getAllDesigns());

          const designs = await contract.getAllDesigns(); // Ensure this returns a promise
          console.log(designs);
          console.log("hii");

          if (designs) {
            const newArray = [];

            for (let i = 0; i < designs.length; i++) {
              if (isActive === 1 && designs[i].PostType === "image") {
                newArray.push(designs[i]);
              } else if (isActive === 2 && designs[i].PostType === "video") {
                newArray.push(designs[i]);
              } else if (isActive === 3 && designs[i].PostType === "audio") {
                newArray.push(designs[i]);
              }
            }

            console.log(newArray);
            setAllDesigns(newArray);

            if (isActive === 0) {
              setAllDesigns(designs);
            }

            console.log(allDesigns);
          }
        }
      } catch (error) {
        console.error("Error fetching designs:", error);
      }
    };

    const getProperty = async () => {
      try {
        const propertyInfo = await db.collection("User").get(); // Ensure this returns a promise
        const pushThisArray = [];

        console.log(propertyInfo.data);
        for (let i = 0; i < propertyInfo.data.length; i++) {
          pushThisArray.push(propertyInfo.data[i].data);
          console.log(propertyInfo.data[i].data);
        }

        console.log(pushThisArray);
        setUserInfo(pushThisArray);
      } catch (error) {
        console.error("Error fetching property info:", error);
      }
    };

    if (contract) {
      getImageFromIPFS();
    }

    getProperty();
  }, [contract, isActive]);

  console.log(allDesigns);
  console.log(userInfo);
  console.log(allDesigns);
  const viewProfile = async (param) => {
    for (let i = 0; i < userInfo.length; i++) {
      if (userInfo[i].address === param) {
        setMyProfile(userInfo[i]);
        console.log(myProfile);
        console.log(userInfo[i]);
        for (let i = 0; i < allDesigns.length; i++) {
          console.log(allDesigns[i].creator, param);
          if (allDesigns[i].creator == param) {
            profileDesigns.push(allDesigns[i]);
          }
        }
      }
      console.log(profileDesigns);
      setProfileDesigns(profileDesigns);
      setShowProfile(true);
    }
    if (myProfile) {
      console.log(myProfile);
      console.log("wassup");
      const names = myProfile.followerName;
      for (let i = 0; i < names.length; i++) {
        if (names[i] === account) {
          setIsFollowed(true);
        }
      }
    }
  };

  const addFollower = async () => {
    await db
      .collection("User")
      .record(myProfile.id)
      .call("addFollowers", [account]);
    console.log("followed");
  };

  useEffect(() => {}, [account, contract]);

  const [showProfile, setShowProfile] = useState(false);

  // ==========================   CAROUSEL LOGIC
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToPreviousSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div className="main-page">
      {!showProfile ? (
        <>
          <div className="filter-post">
            <div
              onClick={() => {
                setActive(0);
              }}
            >
              <button className={isActive === 0 ? "active" : ""}>All</button>
            </div>
            <div
              className=""
              onClick={() => {
                setActive(1);
              }}
            >
              <button className={isActive === 1 ? "active" : ""}>
                UI / UX
              </button>
            </div>
            <div
              onClick={() => {
                setActive(2);
              }}
            >
              <button className={isActive === 2 ? "active" : ""}>Video</button>
            </div>
            <div
              onClick={() => {
                setActive(3);
              }}
            >
              <button className={isActive === 3 ? "active" : ""}>Music</button>
            </div>
          </div>
          <div className="recommended-designs">
            {allDesigns
              ? allDesigns.map((item, index) => (
                  // <React.Fragment key={index}>
                  <div
                    className={`each-design ${postPopup ? `opacity-less` : ``}`}
                  >
                    <div
                      className="top"
                      onClick={async () => {
                        await viewProfile(item.creator);
                        // setShowProfile(true);
                      }}
                    >
                      <div className="profile-img"></div>
                      <div className="profile-name">
                        {userInfo
                          ? userInfo.map((itemx, index) =>
                              itemx.address === item.creator ? itemx.name : ""
                            )
                          : ""}
                      </div>
                    </div>
                    <div className="desingn-name">{item.name}</div>
                    <div
                      className="design-img"
                      onClick={async () => {
                        await getAddedFiles(item.thumbnail);
                        setImages(item.filesToShow);

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
                          onClick={async () => {
                            await getAddedFiles(item.thumbnail);

                            setPopupIndex(index);
                            setPostPopup(true);
                            {
                              console.log(postPopup, designs);
                              console.log(addedfiles);
                            }
                          }}
                        />
                      ) : null}

                      {item.PostType === "audio" ? (
                        <audio controls>
                          <source
                            src={`https://${item.thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                            type="audio/mpeg"
                            onClick={async () => {
                              await getAddedFiles(item.thumbnail);

                              setPopupIndex(index);
                              setPostPopup(true);
                              {
                                console.log(postPopup, designs);
                                console.log(addedfiles);
                              }
                            }}
                          />
                        </audio>
                      ) : null}

                      {item.PostType === "video" ? (
                        <video
                          controls
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
                        <div className="carousel">
                          <div className="image-container">
                            {images.map((image, index) => (
                              <img
                                key={index}
                                src={`https://${image}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                                alt={`Image ${index}`}
                                className={
                                  index === currentImageIndex ? "active" : ""
                                }
                              />
                            ))}
                          </div>
                        </div>
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
                            {/* Use the correct elements from the fileToBuy array */}
                            <p>
                              {allDesigns[popupIndex].fileToBuy[index * 4 + 2]}
                            </p>{" "}
                            {/* FileName */}
                            <div className="priceAndBtn">
                              {/* FilePrice */}
                              <p>
                                {
                                  allDesigns[popupIndex].fileToBuy[
                                    index * 4 + 3
                                  ]
                                }{" "}
                                Matic
                              </p>{" "}
                              <button
                                onClick={() => {
                                  buyFile(
                                    allDesigns[popupIndex].thumbnail,
                                    index
                                  );
                                }}
                              >
                                <FaEthereum size={20} /> Own
                              </button>
                            </div>
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
                    <div className="desingn-name">
                      {allDesigns[popupIndex].name}
                    </div>
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
        </>
      ) : (
        ""
      )}
      {showProfile ? (
        <div className="recommendedPg-profile">
          <div className="back-arrow">
            <BiArrowBack
              size={26}
              onClick={() => {
                setShowProfile(false);
              }}
            />
          </div>
          <div className="profile-info">
            <div className="image"></div>
            <div className="text">
              <div className="profile-top">
                <p className="artist-name">{myProfile.name}</p>
                <button disabled={isFollowed} onClick={addFollower}>
                  {isFollowed ? "Followed" : "Follow"}
                </button>
              </div>
              <p className="artist-about">{myProfile.about}</p>

              <div className="follower-count">
                <p className="count">{myProfile.numberOfFollower}</p>
                <p>Followers</p>
              </div>
            </div>
          </div>
          <div className="all-posts">
            {profileDesign
              ? profileDesign.map((item, index) => (
                  <>
                    <div className="each-post">
                      {item.PostType === "image" ? (
                        <img
                          src={`https://${item.thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                          alt="IPFS Image"
                          onClick={async () => {
                            await getAddedFiles(item.thumbnail);

                            setPopupIndex(index);
                            setPostPopup(true);
                            {
                              console.log(postPopup, designs);
                              console.log(addedfiles);
                            }
                          }}
                        />
                      ) : null}

                      {item.PostType === "audio" ? (
                        <audio controls>
                          <source
                            src={`https://${item.thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                            type="audio/mpeg"
                            onClick={async () => {
                              await getAddedFiles(item.thumbnail);

                              setPopupIndex(index);
                              setPostPopup(true);
                              {
                                console.log(postPopup, designs);
                                console.log(addedfiles);
                              }
                            }}
                          />
                        </audio>
                      ) : null}

                      {item.PostType === "video" ? (
                        <video
                          controls
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
                          <source
                            src={`https://${item.thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                            type="video/mp4"
                          />
                        </video>
                      ) : null}
                    </div>
                  </>
                ))
              : ""}
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}

export default Recommended;
