import React from "react";
import "./landingps.css";
import landing from "./landing-img.svg"
import logo from "./logo.svg"
function LandingPage() {
  return <div>
    <nav>
      <div className="landing-logo"><img src={logo} alt="logo"></img></div>
      <div>
        <ul className="nav-list">
          <li><a href="#">Home</a></li>
          <li><a href="#">Features</a></li>
          <li><a href="#">Working</a></li>
          <li><a href="#">About</a></li>
          <li><button className="nav-launch">Launch</button></li>
        </ul>
      </div>
    </nav>
    <section className="landing-main">
      <div className="content">
        <h1>ArtAquire</h1>
        <h3>Unlock Your Artistic Journey in the Web3 Metaverse</h3>
        <p>Join the Web3 Art Revolution Today! Be part of a thriving community, showcase your artwork, sell securely, and connect with like-minded artists.</p>
        <button className="launch">Launch Dapp</button>
      </div>
      <div className="landing-img">
        <img src={landing} alt="graphic-image"/>
      </div>

    </section>
  </div>;
}

export default LandingPage;
