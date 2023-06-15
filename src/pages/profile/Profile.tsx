import React, { useState, useRef, useEffect } from "react";
import "./profile.css";
import { NFTStorage, Blob } from "nft.storage";
import { AiOutlineHome, AiOutlineMail } from "react-icons/ai";
import { BiCompass } from "react-icons/bi";
import { FaRegImage } from "react-icons/fa";
import { IoIosAdd, IoMdRemove } from "react-icons/io";
import ProfileNav from "../../component/profilenav/ProfileNav.tsx";
import ProfileHome from "../../component/profilehome/ProfileHome.tsx";
import Analytics from "../../component/analytics/Analytics.tsx";
import ProfileCommunityPost from "../../component/profilecomponent/ProfileCommunityPost.tsx";
import MyNfts from "../../component/mynfts/MyNfts.tsx";

function Profile({ contract, account, provider }) {
  const [buttonOn, setButtonOn] = useState(0);
  let noOfFiles = 1;

  const [formPopup, setformPopup] = useState(true);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [Thumbnail, setThumbnail] = useState(null);
  const [FiletoBuy, setFileToBuy] = useState(null);
  const nameRef = useRef("");
  const descriptionRef = useRef("");
  const fileNameRef = useRef("");
  const fileValueRef = useRef("");
  const urlRef = useRef("");

  const NFT_STORAGE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxNjQ2ODg5MWM3MjA0MzY3QjUyMTJkNDBCN2MxNDk0ODFhMzBGNDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjQzMjI2NDM2MywibmFtZSI6IlVYSHViIn0.oAdBKtikXsdRI-k-xyVPjoY2wDWzyjz65rfWTeGO-Ns";
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  let thumbnail;

  const getThumbnail = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const someData = new Blob([selectedFile]);
    thumbnail = await client.storeBlob(someData);
    console.log(thumbnail);
    setThumbnail(thumbnail);
  };

  let fileToBuy;

  const handleFileSelection = async (e) => {
    const file = e.target.files[0];
    setSelectedFile2(file);
    const someData = new Blob([selectedFile2]);
    fileToBuy = await client.storeBlob(someData);
    console.log(fileToBuy);
    setFileToBuy(fileToBuy);
  };

  const [selectedValue, setSelectedValue] = useState("image");

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const addFile = async () => {
    console.log(
      Thumbnail,
      fileNameRef.current.value,
      fileValueRef.current.value,
      FiletoBuy
    );
    await contract.addFiles(
      Thumbnail,
      fileNameRef.current.value,
      fileValueRef.current.value,
      FiletoBuy
    );
  };

  const postDesign = async () => {
    console.log(
      selectedValue,
      Thumbnail,
      nameRef.current.value,
      descriptionRef.current.value
    );

    await contract.postDesign(
      selectedValue,
      Thumbnail,
      nameRef.current.value,
      descriptionRef.current.value
    );

    console.log("done");
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked); // Toggle the checkbox state
  };

  return (
    <div className="profile">
      <div className="sidebar-home left">
        {/* <Sidebar /> */}
        <div className="sidebar">
          <div className="logo">
            <h1>ArtAquire</h1>
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
                  <div className="top">
                    <input
                      type="file"
                      className="thumbnail"
                      onChange={getThumbnail}
                    />
                    <select value={selectedValue} onChange={handleSelectChange}>
                      <option value="image">Image</option>
                      <option value="audio">Audio</option>
                      <option value="video">Video</option>
                    </select>
                  </div>
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
                  <div className="add-files-top">
                    <p>Add Files</p>
                  </div>
                  <div className="all-file-inputs">
                    <div className="each-file">
                      <div className="edit-access">
                        <input
                          type="text"
                          placeholder="File Name"
                          ref={fileNameRef}
                          className="url"
                        />
                        <div className="value-input">
                          <input type="number" ref={fileValueRef} />
                          <p> ETH</p>
                        </div>
                      </div>
                      <div className="file-type">
                        <input
                          type="file"
                          placeholder="File Name"
                          className="url"
                          onChange={handleFileSelection}
                        />
                        OR
                        <input
                          type="text"
                          placeholder="File Url"
                          ref={urlRef}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    className={`add-file-btn ${isChecked ? "" : "checked"}`}
                    disabled={isChecked}
                    onClick={() => {
                      addFile();
                    }}
                  >
                    Add File
                  </button>

                  <div className="checkbox">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    />
                    <p>All Files Uploaded I am ready to post the Art</p>
                  </div>

                  <button
                    onClick={() => {
                      postDesign();
                    }}
                    className={`post-design-btn ${isChecked ? "checked" : ""}`}
                    disabled={!isChecked}
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
