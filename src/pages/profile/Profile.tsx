import React, { useState, useRef, useEffect } from "react";
import "./profile.css";
import { NFTStorage, Blob } from "nft.storage";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiCompass } from "react-icons/bi";
import { FaRegImage } from "react-icons/fa";
import ProfileNav from "../../component/profilenav/ProfileNav.tsx";
import ProfileHome from "../../component/profilehome/ProfileHome.tsx";
import Analytics from "../../component/analytics/Analytics.tsx";
import ProfileCommunityPost from "../../component/profilecomponent/ProfileCommunityPost.tsx";
import MyNfts from "../../component/mynfts/MyNfts.tsx";

function Profile({ contract, account, provider }) {
  const [buttonOn, setButtonOn] = useState(0);

  const [formPopup, setformPopup] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [Thumbnail, setThumbnail] = useState(null);
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const viewUrlRef = useRef("");
  const viewValueRef = useRef("");
  const editUrlRef = useRef("");
  const editValueRef = useRef("");

  const NFT_STORAGE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxNjQ2ODg5MWM3MjA0MzY3QjUyMTJkNDBCN2MxNDk0ODFhMzBGNDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjQzMjI2NDM2MywibmFtZSI6IlVYSHViIn0.oAdBKtikXsdRI-k-xyVPjoY2wDWzyjz65rfWTeGO-Ns";
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  let thumbnail;

  const getThumbnail = async (e) => {
    const file = e.target.files[0];
    console.log(e.target.files);
    setSelectedFile(file);
    const someData = new Blob([selectedFile]);
    thumbnail = await client.storeBlob(someData);
    console.log(thumbnail);
    setThumbnail(thumbnail);
  };

  const postDesign = async () => {
    console.log(
      Thumbnail,
      nameRef.current.value,
      descriptionRef.current.value,
      viewValueRef.current.value,
      viewUrlRef.current.value,
      editUrlRef.current.value
    );

    await contract.postDesign(
      Thumbnail,
      nameRef.current.value,
      descriptionRef.current.value,
      viewValueRef.current.value,
      viewUrlRef.current.value,
      editUrlRef.current.value
    );

    console.log("done");
  };

  // useEffect(() => {
  //   const x = async () => {
  //     console.log(
  //       await provider.getCode("0xF5598eA7B32160423cF42F0de86Ec5B373237940")
  //     );
  //   };
  //   x();
  // }, []);

  return (
    <div className="profile">
      <div className="sidebar-home left">
        {/* <Sidebar /> */}
        <div className="sidebar">
          <div className="logo">
            <h1>uXHub</h1>
          </div>
          <div className="links">
            <div
              className={`recomend each-link ${buttonOn === 0 ? "active" : ""}`}
              onClick={() => {
                setButtonOn(0);
              }}
            >
              <AiOutlineHome size={24} color="white" />
              <p>Profile</p>
            </div>
            <div
              className={`recomend each-link ${buttonOn === 1 ? "active" : ""}`}
              onClick={() => {
                setButtonOn(1);
              }}
            >
              <BiCompass size={24} color="white" />
              <p>Analytics</p>
            </div>
            <div
              className={`recomend each-link ${buttonOn === 2 ? "active" : ""}`}
              onClick={() => {
                setButtonOn(2);
              }}
            >
              <AiOutlineMail size={24} color="white" />
              <p>Community</p>
            </div>
            <div
              className={`recomend each-link ${buttonOn === 3 ? "active" : ""}`}
              onClick={() => {
                setButtonOn(3);
              }}
            >
              <FaRegImage size={24} color="white" />
              <p> My NFTs</p>
            </div>
          </div>
        </div>
      </div>
      <div className="maincontainer-home right">
        <div className="divide-line"></div>
        <div className="container right">
          <div className="nav">
            <ProfileNav setButtonOn={setButtonOn} />
          </div>
          <div className="mainContainer">
            {buttonOn === 0 ? (
              <ProfileHome contract={contract} account={account} />
            ) : (
              ""
            )}
            {buttonOn === 1 ? (
              <Analytics contract={contract} account={account} />
            ) : (
              ""
            )}
            {buttonOn === 2 ? (
              <ProfileCommunityPost contract={contract} account={account} />
            ) : (
              ""
            )}
            {buttonOn === 3 ? (
              <MyNfts contract={contract} account={account} />
            ) : (
              ""
            )}
            {buttonOn === 4 ? (
              <div className="postDesign-form">
                <>
                  <input
                    type="file"
                    className="thumbnail"
                    onChange={getThumbnail}
                  />
                  <input
                    type="text"
                    placeholder="name"
                    ref={nameRef}
                    className="name"
                  />
                  <textarea
                    placeholder="description"
                    className="description"
                    col="15"
                    ref={descriptionRef}
                  />
                  <div className="view-access">
                    <input
                      type="text"
                      className="url"
                      placeholder="viewUrl"
                      ref={viewUrlRef}
                    />
                    <input
                      type="number"
                      placeholder="view Value"
                      ref={viewValueRef}
                      className="value"
                    />
                  </div>
                  <div className="edit-access">
                    <input
                      type="text"
                      placeholder="edit Url"
                      ref={editUrlRef}
                      className="url"
                    />
                    <input
                      className="value"
                      type="number"
                      placeholder="edit value"
                      ref={editValueRef}
                    />
                  </div>
                  <button
                    onClick={() => {
                      postDesign();
                    }}
                  >
                    Post
                  </button>
                </>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
