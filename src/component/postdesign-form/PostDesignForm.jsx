import React, { useState } from "react";
import "./postdesignForm.css";
import { CgClose } from "react-icons/cg";

function PostDesignForm() {
  const [navLinkNo, setNavLinkNo] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [images, setImages] = useState([]);

  // Handle drag and drop of files
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // Handle selected files
  const handleFiles = (files) => {
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setImages([...images, ...imagesArray]);
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
  };

  // Handle file selection from the input field
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.includes("image")) {
      setSelectedFile(URL.createObjectURL(file));
    }
  };

  // Handle file drop event
  const handleFileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.includes("image")) {
      setSelectedFile(URL.createObjectURL(file));
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

  return (
    <div className="postDesign-outer">
      <div className="postDesign">
        {/* Top part */}
        <div className="top-most-part">
          <div className=""></div>
          <p className="title">This is the title</p>
          <CgClose onClick={() => {}} />
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
                Add Images
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
          {/* Details section */}
          <div className={navLinkNo === 0 ? "details" : "hide"}>
            <div className="details-left">
              <h4>Details</h4>
              {/* Title input */}
              <div className="input">
                <p>Title</p>
                <input type="text" />
              </div>
              {/* Description input */}
              <div className="input">
                <p>Description</p>
                <textarea></textarea>
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
                      <label htmlFor="file-input" className="file-input-label">
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
            <div className="next-btn">
              <button
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
                  <label htmlFor="add-images" className="file-input-label">
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
            <div className="next-btn">
              <button
                onClick={() => {
                  setNavLinkNo(2);
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
                <input type="file" />
                <input
                  type="text"
                  placeholder="File Name"
                  className="fileName"
                />
                <div className="file-price">
                  <input type="number" />
                  <span>Aqr</span>
                </div>
                <button>Add</button>
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
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data 1</td>
                  <td>Data 2</td>
                  <td>Data 3</td>
                </tr>
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
          <div className={navLinkNo === 3 ? "view-post" : "hide"}>post</div>
        </div>
      </div>
    </div>
  );
}
export default PostDesignForm;
