import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import "./ProfileCommunityPost.css";
import { BsSuitHeart } from "react-icons/bs";
import { BsChatLeft } from "react-icons/bs";
import db from "../../polybase";

function ProfileCommunityPost({ contract, account }) {
  const postSubmitted = async (e) => {
    e.preventDefault();
    const message = e.target.post.value;
    let id = Math.floor(Math.random() * 1000);
    console.log(message);

    db.collection("CommunityPost").create([id.toString(), account, message]);
    // publicKey:string, name:string, about:string, twitter:string, linkedin:string, portfolio:string, metamask:string
    console.log("sucessfull");
  };
  const [allPosts, setAllPosts] = useState();
  const [allUsers, setAllUsers] = useState();

  let name;

  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].publicKey === account) {
      name = allUsers[i].name;
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      const propertyInfo = await db.collection("User").get();
      console.log(propertyInfo.data);
      const newArray = [];
      for (let i = 0; i < propertyInfo.data.length; i++) {
        newArray.push(propertyInfo.data[i].data);
      }
      setAllUsers(newArray);
      console.log(allUsers);
    };
    const getPosts = async () => {
      const propertyInfo = await db.collection("CommunityPost").get();
      console.log(propertyInfo.data);
      const newArray = [];
      for (let i = 0; i < propertyInfo.data.length; i++) {
        newArray.push(propertyInfo.data[i].data);
      }
      console.log(newArray);
      setAllPosts(newArray);
      console.log(allPosts);
    };
    getUsers();
    getPosts();
  }, [account]);
  return (
    <div className="profile-post">
      <div className="input-section">
        <div className="top-community-post">
          <div className="profile-img"></div>
          <p className="name">{name}</p>
        </div>
        <div className="input-text">
          <form onSubmit={postSubmitted}>
            <textarea
              className="post-text"
              name="post"
              wrap="soft"
              placeholder="Enter your post..."
            ></textarea>
            <button type="submit" className="btn">
              Post
            </button>
          </form>
          {/* <input type="text" className="post-text" placeholder="Enter your text here.."/> */}
        </div>
      </div>
      <div className="posts">
        {allPosts
          ? allPosts.map((item, index) => (
              <>
                {item.creator === account ? (
                  <div className="each-post">
                    <div className="top-community-post">
                      <div className="profile-img"></div>
                      <p className="name">{name}</p>
                    </div>
                    <div className="post-text">
                      <p>{item.message}</p>
                    </div>
                    <div className="bottom-community-post">
                      <BsSuitHeart /> <BsChatLeft />{" "}
                    </div>
                    <hr />
                  </div>
                ) : (
                  ""
                )}
              </>
            ))
          : ""}
      </div>
    </div>
  );
}

export default ProfileCommunityPost;
