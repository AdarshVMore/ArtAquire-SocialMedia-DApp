import React, { useState, useRef, useEffect } from "react";
import "./postdesignForm.css";
import { NFTStorage, Blob } from "nft.storage";

import { CgClose } from "react-icons/cg";

function PostDesignForm({ setButtonOn, contract, account }) {
  console.log(contract, "here");
  const NFT_STORAGE_TOKEN =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDgxNjQ2ODg5MWM3MjA0MzY3QjUyMTJkNDBCN2MxNDk0ODFhMzBGNDkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4NjQzMjI2NDM2MywibmFtZSI6IlVYSHViIn0.oAdBKtikXsdRI-k-xyVPjoY2wDWzyjz65rfWTeGO-Ns";
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  // vars to Navigate
  const [navLinkNo, setNavLinkNo] = useState(0);
  const [isTypeSelected, setIsTypeSelected] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [titleOnTop, setTitleOnTop] = useState("");
  const [canGoToPg2, setCanGoToPg2] = useState(false);
  const [canGoToPg3, setCanGoToPg3] = useState(false);

  // vars to get DATA
  const titleRef = useRef("");
  const discriptionRef = useRef("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);
  const [audio, setAudio] = useState(null);
  const [fileDataArray, setFileDataArray] = useState([]);
  const fileToSellNameRef = useRef("");
  const fileToSellPriceRef = useRef("");

  //   vard to get CID
  const [thumbnailCID, setThumbnailCID] = useState("");
  const [allImagesCIDs, setAllImagesCIDs] = useState([]);
  const [videoCID, setVideoCID] = useState("");
  const [audioCID, setAudioCID] = useState("");
  const [fileToSellCID, setfileToSellCID] = useState("");

  const settingTitleOnTop = () => {
    setTitleOnTop(titleRef.current.value);
  };

  // Handle drag and drop of files
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Handle selected files
  const handleFiles = async (files) => {
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imagesArray]);

    const imageCIDs = [];
    for (const file of files) {
      if (file.type.includes("image")) {
        const someData = new Blob([file]);
        const cid = await client.storeBlob(someData);
        imageCIDs.push(cid);
        setCanGoToPg3(true);
      }
    }
    console.log(imageCIDs);
    setAllImagesCIDs((prevCIDs) => [...prevCIDs, ...imageCIDs]);
  };

  // Handle file input change
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  // Remove image from the preview
  const handleImageRemove = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);

    const prevCIDs = allImagesCIDs;
    const newArray = prevCIDs.filter((_, i) => i !== index);
    setAllImagesCIDs(newArray);

    // Remove the corresponding CID from the allImagesCIDs array
    // setAllImagesCIDs((index) => {
    //   const updatedCIDs = [...prevCIDs];
    //   updatedCIDs.splice(index, 1);
    //   return updatedCIDs;

    // });
    console.log("removed", allImagesCIDs[index]);
  };

  // Handle Thumbnail selection from the input field
  let thumbnail;
  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("image")) {
      setSelectedFile(URL.createObjectURL(file));
      const someData = new Blob([file]);
      thumbnail = await client.storeBlob(someData);
      console.log(thumbnail);
      if (thumbnail) {
        setThumbnailCID(thumbnail);
        setCanGoToPg2(true);
      }
    }
  };

  let letVideo;
  const handleVideos = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("video")) {
      setVideo(URL.createObjectURL(file));
      const someData = new Blob([file]);
      letVideo = await client.storeBlob(someData);
      console.log(letVideo);
      if (letVideo) {
        setVideoCID(letVideo);
        setCanGoToPg3(true);
      }
    }
  };

  let letAudio;
  const handleAudio = async (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("audio")) {
      setAudio(URL.createObjectURL(file)); // Corrected: Set audio state, not video
      const someData = new Blob([file]);
      letAudio = await client.storeBlob(someData);
      console.log(letAudio);
      if (letAudio) {
        setAudioCID(letAudio);
        setCanGoToPg3(true);
      }
    }
  };

  let fileToBuy;
  const [file_name, setFile_name] = useState("");
  const [gotFileToSellCID, setGotFileToSellCID] = useState(true);
  const getCIDOfFileToSell = async (e) => {
    setGotFileToSellCID(false);
    console.log("wait....");
    const file = e.target.files[0];
    if (file) {
      const someData = new Blob([file]);
      fileToBuy = await client.storeBlob(someData);
      console.log(fileToBuy);
      if (fileToBuy) {
        setfileToSellCID(fileToBuy);
        const file_Name = file.name;
        setFile_name(file_Name);
        console.log(file_name);
      }
      setGotFileToSellCID(true);
    }
  };

  const removeFileData = (index) => {
    // Create a copy of the fileDataArray
    const updatedFileDataArray = [...fileDataArray];
    // Remove the specific element at the given index
    updatedFileDataArray.splice(index, 1);
    // Update the state with the updated array
    setFileDataArray(updatedFileDataArray);
    console.log(updatedFileDataArray);
  };

  // Handle file drop event
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes("image")) {
      setSelectedFile(URL.createObjectURL(file));
    }
    if (file && file.type.includes("video")) {
      setVideo(URL.createObjectURL(file));
    }
    if (file && file.type.includes("audio")) {
      setAudio(URL.createObjectURL(file));
    }
  };

  // Handle drag over event
  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // Remove selected file
  const removeFile = () => {
    setSelectedFile(null);
  };

  function addFileData(_cid, actualFileName, _eneredfileName, _filePrice) {
    setFileDataArray([
      ...fileDataArray,
      _cid,
      actualFileName,
      _eneredfileName,
      _filePrice,
    ]);
  }

  const addFileToSell = () => {
    const cid = fileToSellCID; // Replace with actual logic to get the CID
    const actualFileName = file_name;
    const EnteredfileName = fileToSellNameRef.current.value; // Replace with the input value for the file name
    const filePrice = fileToSellPriceRef.current.value; // Replace with the input value for the file price

    addFileData(cid, actualFileName, EnteredfileName, filePrice.toString());
  };

  const postDesign = async () => {
    let fileToShow;
    if (selectedType === "image") {
      fileToShow = allImagesCIDs;
    } else if (selectedType === "video") {
      fileToShow = videoCID;
    } else if (selectedType === "audio") {
      fileToShow = audioCID;
    }
    console.log(
      selectedType,
      thumbnailCID,
      titleRef.current.value,
      discriptionRef.current.value,
      fileToShow,
      fileDataArray
    );
    let files2 = [];
    if (contract) {
      console.log(contract);
      await contract.postDesign(
        selectedType,
        thumbnailCID,
        titleRef.current.value,
        discriptionRef.current.value,
        fileToShow,
        fileDataArray
      );
      console.log("posted");
    }
  };

  return (
    <div className="postDesign-outer">
      <div className="postDesign">
        {/* Top part */}
        <div className="top-most-part">
          <div className=""></div>
          <p className="title">{titleOnTop}</p>
          <CgClose
            onClick={() => {
              setButtonOn(0);
            }}
          />
        </div>
        <hr />
        {/* Navigation part */}
        <div className="top-least-part">
          <div className="top-nav-links">
            {/* Details */}
            <div
              className="each-nav-link"
              onClick={() => {
                setNavLinkNo(0);
              }}
            >
              <p className={navLinkNo === 0 ? "selected-nav-name" : ""}>
                Details
              </p>
              <div
                className={navLinkNo === 0 ? "selected-nav-circle" : "circle"}
              ></div>
            </div>
            {/* Add Images */}
            <div
              className="each-nav-link"
              onClick={() => {
                setNavLinkNo(1);
              }}
            >
              <p className={navLinkNo === 1 ? "selected-nav-name" : ""}>
                Add Files
              </p>
              <div
                className={navLinkNo === 1 ? "selected-nav-circle" : "circle"}
              ></div>
            </div>
            {/* Sell Files */}
            <div
              className="each-nav-link"
              onClick={() => {
                setNavLinkNo(2);
              }}
            >
              <p className={navLinkNo === 2 ? "selected-nav-name" : ""}>
                Sell Files
              </p>
              <div
                className={navLinkNo === 2 ? "selected-nav-circle" : "circle"}
              ></div>
            </div>
            {/* View Post */}
            <div
              className="each-nav-link"
              onClick={() => {
                setNavLinkNo(3);
              }}
            >
              <p className={navLinkNo === 3 ? "selected-nav-name" : ""}>
                View Post
              </p>
              <div
                className={navLinkNo === 3 ? "selected-nav-circle" : "circle"}
              ></div>
            </div>
          </div>
          <div className="line-passing-nav"></div>
        </div>
        {/* Main form components */}
        <div className="postForm-main-component">
          {isTypeSelected ? (
            <>
              {/* Details section */}
              <div className={navLinkNo === 0 ? "details" : "hide"}>
                <div className="details-left">
                  <h4>Details</h4>
                  {/* Title input */}
                  <div className="input">
                    <p>Title</p>
                    <input
                      type="text"
                      onChange={settingTitleOnTop}
                      ref={titleRef}
                    />
                  </div>
                  {/* Description input */}
                  <div className="input">
                    <p>Description</p>
                    <textarea ref={discriptionRef}></textarea>
                  </div>
                  <p className="thumbnail-heading">Thumbnail</p>
                  {/* File upload box */}
                  <div
                    className="file-upload-box"
                    onDrop={handleFileDrop}
                    onDragOver={handleDragOver}
                  >
                    {/* Display upload instructions or selected file */}
                    {!selectedFile ? (
                      <div>
                        <div className="file-upload-text">
                          <span>
                            Drag and drop an image here, <br /> or
                          </span>
                          <label
                            htmlFor="file-input"
                            className="file-input-label"
                          >
                            <p>Browse</p>
                          </label>
                        </div>
                        <input
                          type="file"
                          id="file-input"
                          className="file-input"
                          accept="image/*"
                          onChange={handleFileSelect}
                        />
                      </div>
                    ) : (
                      <div className="selected-file">
                        <img
                          src={selectedFile}
                          alt="Uploaded"
                          className="uploaded-image"
                          onClick={removeFile}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className={!canGoToPg2 ? "next-btn disable" : "next-btn"}>
                  <button
                    disabled={!canGoToPg2}
                    onClick={() => {
                      setNavLinkNo(1);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              {/* Add Images section */}
              <div className={navLinkNo === 1 ? "add-images" : "hide"}>
                {selectedType === "image" && (
                  <div className="add-images-left">
                    <div className="image-upload-container">
                      <div
                        className="image-upload-box"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                      >
                        {/* Display upload instructions and file input */}
                        <span>
                          Drag and drop an image here, <br /> or
                        </span>
                        <label
                          htmlFor="add-images"
                          className="file-input-label"
                        >
                          <p>Browse</p>
                        </label>
                        <input
                          type="file"
                          id="add-images"
                          className="add-images-input"
                          accept="image/*"
                          onChange={handleFileInputChange}
                        />
                      </div>
                      {/* Image preview */}
                      <div className="image-preview">
                        {images.map((image, index) => (
                          <div className="image-item" key={index}>
                            <img src={image} alt={`Image ${index}`} />
                            <div
                              className="remove-image"
                              onClick={() => handleImageRemove(index)}
                            >
                              Remove Image
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                {selectedType === "video" && (
                  <>
                    <div
                      className="video-upload-box"
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                    >
                      {!video ? (
                        <div>
                          <div className="file-upload-text">
                            <span>
                              Drag and drop a video here, <br /> or
                            </span>
                            <label
                              htmlFor="file-input-video"
                              className="file-input-label"
                            >
                              <p>Browse</p>
                            </label>
                          </div>
                          <input
                            type="file"
                            id="file-input-video"
                            className="file-input"
                            accept="video/*"
                            onChange={handleVideos}
                          />
                        </div>
                      ) : (
                        <div className="selected-file">
                          <video src={video} controls></video>
                        </div>
                      )}
                    </div>
                  </>
                )}
                {selectedType === "audio" && (
                  <>
                    <div
                      className="audio-upload-box"
                      onDrop={handleFileDrop}
                      onDragOver={handleDragOver}
                    >
                      {!audio ? (
                        <div>
                          <div className="file-upload-text">
                            <span>
                              Drag and drop an audio here, <br /> or
                            </span>
                            <label
                              htmlFor="file-input-audio"
                              className="file-input-label"
                            >
                              <p>Browse</p>
                            </label>
                          </div>
                          <input
                            type="file"
                            id="file-input-audio"
                            className="file-input"
                            accept="audio/*"
                            onChange={handleAudio}
                          />
                        </div>
                      ) : (
                        <div className="selected-file">
                          <audio src={audio} controls></audio>
                        </div>
                      )}
                    </div>
                  </>
                )}
                <div className="next-btn">
                  <button
                    disabled={!canGoToPg3}
                    onClick={() => {
                      setNavLinkNo(2);
                      console.log(
                        "CIDs of all selected images:",
                        allImagesCIDs
                      );
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              {/* Sell Files section */}
              <div className={navLinkNo === 2 ? "sell-files" : "hide"}>
                <div className="sell-files-left">
                  <div className="form">
                    <input type="file" onChange={getCIDOfFileToSell} />
                    <input
                      type="text"
                      placeholder="File Name"
                      className="fileName"
                      ref={fileToSellNameRef}
                    />
                    <div className="file-price">
                      <input type="number" ref={fileToSellPriceRef} />
                      <span>Aqr</span>
                    </div>
                    <button
                      onClick={addFileToSell}
                      disabled={!gotFileToSellCID}
                    >
                      {gotFileToSellCID ? "Add" : "Loadind..."}
                    </button>
                  </div>
                  <div className="files-list"></div>
                </div>

                <h4>Updated Files</h4>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Sr no.</th>
                      <th>File Name</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileDataArray.map((fileData, index) => {
                      // Check if the index is divisible by 3 (0-based index)
                      if (index % 4 === 0) {
                        // Get the fileName and filePrice from the current index and the next index
                        const fileName = fileDataArray[index + 2];
                        const filePrice = fileDataArray[index + 3];
                        console.log(fileDataArray);

                        return (
                          <tr key={index}>
                            <td>{Math.floor(index / 4 + 1)}</td>{" "}
                            {/* Show 1-based index */}
                            <td>{fileName}</td>
                            <td>{filePrice} Aqr</td>
                            <td>
                              <button onClick={() => removeFileData(index)}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      } else {
                        // Return null for the elements that don't represent a full file entry
                        return null;
                      }
                    })}
                  </tbody>
                </table>
                <div className="next-btn">
                  <button
                    onClick={() => {
                      setNavLinkNo(3);
                    }}
                  >
                    Next
                  </button>
                </div>
              </div>
              {/* View Post section */}
              <div className={navLinkNo === 3 ? "view-post" : "hide"}>
                <div className="thumbnail">
                  <img
                    src={`https://${thumbnailCID}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                    alt="IPFS Thumbnail"
                  />
                </div>
                <p>{titleRef.current.value}</p>
                <p>{discriptionRef.current.value}</p>
                {selectedType === "image" ? (
                  <>
                    {allImagesCIDs.map((item, index) => (
                      <>
                        <div className="image-item" key={index}>
                          <img
                            src={`https://${item}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                            alt={`Image ${index}`}
                          />
                          <div
                            className="remove-image"
                            onClick={() => handleImageRemove(index)}
                          >
                            Remove Image
                          </div>
                        </div>
                      </>
                    ))}
                  </>
                ) : (
                  ""
                )}
                {selectedType === "video" ? (
                  <>
                    <video controls>
                      <source
                        src={`https://${videoCID}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                        type="video/mp4"
                      />
                    </video>
                  </>
                ) : (
                  ""
                )}
                {selectedType === "audio" ? <>aud</> : ""}
                <h4>Files To Sell</h4>
                <table className="custom-table">
                  <thead>
                    <tr>
                      <th>Sr no.</th>
                      <th>File Name</th>
                      <th>Price</th>
                      <th>Remove</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fileDataArray.map((fileData, index) => {
                      // Check if the index is divisible by 3 (0-based index)
                      if (index % 4 === 0) {
                        // Get the fileName and filePrice from the current index and the next index
                        const fileName = fileDataArray[index + 2];
                        const filePrice = fileDataArray[index + 3];

                        return (
                          <tr key={index}>
                            <td>{Math.floor(index / 4) + 1}</td>{" "}
                            {/* Show 1-based index */}
                            <td>{fileName}</td>
                            <td>{filePrice} Aqr</td>
                            <td>
                              <button onClick={() => removeFileData(index)}>
                                Remove
                              </button>
                            </td>
                          </tr>
                        );
                      } else {
                        // Return null for the elements that don't represent a full file entry
                        return null;
                      }
                    })}
                  </tbody>
                </table>
                <button
                  onClick={() => {
                    postDesign();
                  }}
                >
                  Post
                </button>
              </div>
            </>
          ) : (
            <div className="selectFileType">
              <div
                className="eachType"
                onClick={() => {
                  setIsTypeSelected(true);
                  setSelectedType("image");
                }}
              >
                <p>Designs</p>
              </div>
              <div
                className="eachType"
                onClick={() => {
                  setIsTypeSelected(true);
                  setSelectedType("video");
                }}
              >
                <p>Video</p>
              </div>
              <div
                className="eachType"
                onClick={() => {
                  setIsTypeSelected(true);
                  setSelectedType("audio");
                }}
              >
                <p>Audio</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default PostDesignForm;
