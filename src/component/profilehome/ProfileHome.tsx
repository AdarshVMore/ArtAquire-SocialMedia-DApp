import React, { useState, useRef, useEffect } from "react";
import "./profilehome.css";
import db from "../../polybase";
import { ethers } from "ethers";

function ProfileHome({ contract, account }) {
  const [showForm, setShowForm] = useState(false);
  const [profileDone, setProfileDone] = useState(false);
  const [myProfile, setMyProfile] = useState(null);
  const [isFollowed, setIsFollowed] = useState(false);
  const nameRef = useRef();
  const aboutRef = useRef();
  const twitterRef = useRef();
  const linkedInRef = useRef();
  const portfolioLink = useRef();
  let id = Math.floor(Math.random() * 1000);

  const formSubmitted = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const about = e.target.about.value;
    const twitter = e.target.twitter.value;
    const linkedin = e.target.linkedin.value;
    const portfolio = e.target.portfolio.value;

    db.collection("User").create([
      id.toString(),
      account,
      name,
      about,
      twitter,
      linkedin,
      portfolio,
      0,
      [],
    ]);
    // publicKey:string, name:string, about:string, twitter:string, linkedin:string, portfolio:string, metamask:string
    console.log("sucessfull");
  };

  const addFollower = async () => {
    await db
      .collection("User")
      .record(myProfile.id)
      .call("addFollowers", [account]);
    console.log("followed");
  };
  useEffect(() => {
    const getProperty = async () => {
      const propertyInfo = await db.collection("User").get();
      console.log(propertyInfo.data);

      for (let i = 0; i < propertyInfo.data.length; i++) {
        console.log(propertyInfo.data[i].data);

        if (propertyInfo.data[i].data.publicKey === account) {
          console.log(propertyInfo.data[i].data);
          const x = propertyInfo.data[i].data;
          setMyProfile(x);
          console.log(myProfile);
          setProfileDone(true);
          const followers = x.followerName;
          console.log(followers);
          if (followers) {
            for (let i = 0; i < followers.length; i++) {
              if (followers[i] === account) {
                setIsFollowed(true);
                console.log(followers[i], "z");
                console.log(x.numberOfFollower);
              }
            }
          }
        }
      }
      if (myProfile) {
        const followers = myProfile.followerName;
        console.log(followers);
        if (followers) {
          for (let i = 0; i < followers.length; i++) {
            if (followers[i] === account) {
              setIsFollowed(true);
              console.log(followers[i], "z");
              console.log(myProfile.numberOfFollower);
            }
          }
        }
      }
    };
    getProperty();
  }, [account, contract]);

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

        designs = await contract.getAllDesigns();
        console.log(designs);
        if (designs) {
          for (let i = 0; i < designs.length; i++) {
            if (designs[i].creator === account) {
              const designss = [];
              designss.push(designs[i]);
              setAllDesigns(designss);

              console.log(allDesigns);
            }
          }
        }
      };

      getImageFromIPFS();
    }
    console.log(allDesigns);
  }, [contract, designs]);

  return (
    <div className="profile-home">
      {profileDone ? (
        <>
          <div className="profile-info">
            <div className="image"></div>
            <div className="text">
              <div className="profile-top">
                <p className="artist-name">{myProfile.name}</p>
                <button onClick={addFollower} disabled={isFollowed}>
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
            {allDesigns
              ? allDesigns.map((item, index) => (
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
        </>
      ) : (
        <div className="">
          {showForm && !profileDone ? (
            <div className="profile-form">
              <div className="heading">Set Profile</div>

              <form onSubmit={formSubmitted}>
                <input
                  type="text"
                  ref={nameRef}
                  required
                  placeholder="Name"
                  name="name"
                />
                <textarea
                  type="text"
                  ref={aboutRef}
                  placeholder="About"
                  rows={5}
                  name="about"
                />
                <input
                  type="text"
                  ref={twitterRef}
                  placeholder="Twitter"
                  name="twitter"
                />
                <input
                  type="text"
                  ref={linkedInRef}
                  placeholder="LinkedIN"
                  name="linkedin"
                />
                <input
                  type="text"
                  ref={portfolioLink}
                  placeholder="Portfolio"
                  name="portfolio"
                />
                <button type="submit">Save</button>
              </form>
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
      )}
    </div>
  );
}

export default ProfileHome;
