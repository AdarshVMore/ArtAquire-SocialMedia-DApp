import React, { useEffect, useState } from "react";
import "./mynfts.css";
import { AiOutlineClose } from "react-icons/ai";

function MyNfts({ contract, account }) {
  let nfts;
  const [myNfts, setMyNfts] = useState([]);
  const [postPopup, setPostPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(null);

  useEffect(() => {
    const getNfts = async () => {
      nfts = await contract.getMyNfts(account);
      console.log(nfts);
      setMyNfts(nfts);
    };
    getNfts();
  }, [account]);
  return (
    <div className="mynfts">
      {myNfts.map((item, index) => (
        <div
          className="each-nft"
          key={index}
          onClick={() => {
            setPopupIndex(index);
            setPostPopup(true);
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
      ))}
      {postPopup ? (
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
                <img
                  src={`https://${myNfts[popupIndex].thumbnail}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                  alt=""
                />
              </div>
              <div className="buy">
                <div className="heading">Buy</div>
                {myNfts.map((item, index) => (
                  <div className="buy-links">
                    <div className="view">
                      <p>{item.fileName}</p>
                      <button>
                        <a
                          href={`https://${myNfts[popupIndex].file}.ipfs.nftstorage.link/#x-ipfs-companion-no-redirect`}
                          target="_blank"
                        >
                          File
                        </a>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default MyNfts;
