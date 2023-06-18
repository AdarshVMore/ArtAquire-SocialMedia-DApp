import React from "react";
import { HuddleIframe } from "@huddle01/iframe";
import { iframeApi } from "@huddle01/iframe";

function Streaming() {
  return (
    <div style={{ width: "75vw", height: "85vh" }}>
      <HuddleIframe
        roomUrl="https://iframe.huddle01.com/"
        style={{
          width: "100%",
          height: "100%",
          border: "none",
          overflow: "none",
        }}
      />
    </div>
  );
}

export default Streaming;
