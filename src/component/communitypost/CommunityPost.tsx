import React, { useState, useEffect } from "react";
import "./CommunityPost.css";
import { Link } from "react-router-dom";
import { BsSuitHeart } from "react-icons/bs";
import { BsChatLeft } from "react-icons/bs";
import db from "../../polybase";
import { all } from "axios";

function CommunityPost({ contract, account }) {
  const [allPosts, setAllPosts] = useState();
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const getPosts = async () => {
      const propertyInfo = await db.collection("CommunityPost").get();
      console.log(propertyInfo.data[0].data);
      const newArray = [];
      for (let i = 0; i < propertyInfo.data.length; i++) {
        newArray.push(propertyInfo.data[i].data);
      }
      setAllPosts(newArray);
      console.log(allPosts);
    };

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
    getPosts();
    getUsers();
  }, [account]);

  return (
    <div className="community-post">
      <div className="posts">
        {allPosts
          ? allPosts.map((item, index) => (
              <div className="each-post">
                <div className="top-community-post">
                  <div className="profile-img"></div>
                  <p className="name">
                    {allUsers
                      ? allUsers.map((itemx, index) => (
                          <>
                            {itemx.publicKey === item.creator ? itemx.name : ""}
                          </>
                        ))
                      : ""}
                  </p>
                </div>
                <div className="post-text">
                  <p>{item.message}</p>
                </div>
                <div className="bottom-community-post">
                  <BsSuitHeart /> <BsChatLeft />{" "}
                </div>
                <hr />
              </div>
            ))
          : ""}
      </div>
    </div>
  );
}

export default CommunityPost;
