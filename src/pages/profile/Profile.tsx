import React, { useState, useRef } from "react";
import "./profile.css";
import { NFTStorage, Blob } from "nft.storage";

function Profile({ contract, account }) {
  // This code has to be put in PostForm Component

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
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweGY3ODMyQTkyZjgzMzYwRDYyNmQwNkU2MjAzOEM4NDkyNWEyYUIwRDciLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY4MDQxNTYxNDg1MywibmFtZSI6Imhvc3BpdGFsLWRhcHAifQ.jwamWRhXby27Er2UsaoxSqikdZRSQSlB39CCR9c4S7Y";
  const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

  let thumbnail;

  const getThumbnail = async (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const someData = new Blob([selectedFile]);
    thumbnail = await client.storeBlob(someData);
    console.log(thumbnail);
    setThumbnail(thumbnail.toString());
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
      "thumbnail",
      nameRef.current.value,
      descriptionRef.current.value,
      viewValueRef.current.value,
      viewUrlRef.current.value,
      editUrlRef.current.value
    );

    console.log("done");
  };
  return (
    <div>
      <button
        onClick={() => {
          setformPopup(true);
        }}
      >
        Post Design
      </button>
      {formPopup ? (
        // This code has to be put in PostForm Component and render that component here
        <>
          <input type="file" onChange={getThumbnail} />
          <input type="text" placeholder="name" ref={nameRef} />
          <input type="text" placeholder="description" ref={descriptionRef} />
          <input type="text" placeholder="viewUrl" ref={viewUrlRef} />
          <input type="number" placeholder="view Value" ref={viewValueRef} />
          <input type="text" placeholder="edit Url" ref={editUrlRef} />
          <input type="number" placeholder="edit value" ref={editValueRef} />
          <button
            onClick={() => {
              postDesign();
            }}
          >
            Post
          </button>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default Profile;
