import React from "react";
import { Link } from "react-router-dom";
import { FaLongArrowAltRight } from "react-icons/fa";
import "./landingps.css";
import landing from "./landing.png";
import logo from "./logo.svg";
function LandingPage() {
  return (
    <div className="landing-page">
      <nav>
        <div className="landing-logo">
          <img src={logo} alt="logo"></img>
        </div>
        <div>
          <ul className="nav-list">
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Features</a>
            </li>
            <li>
              <a href="#">Working</a>
            </li>
            <li>
              <a href="#">About</a>
            </li>
            <li>
              <button className="nav-launch">Launch</button>
            </li>
          </ul>
        </div>
      </nav>
      <section className="landing-main">
        <div className="content">
          <h1>ArtQuire</h1>
          <h3>
            Discover{" "}
            <span>
              <FaLongArrowAltRight color="#00fff0" />
            </span>{" "}
            Collect{" "}
            <span>
              <FaLongArrowAltRight color="#57ff1c" />
            </span>{" "}
            Modify
          </h3>
          <p>
            Join the Web3 Art Revolution Today! Be part of a thriving community,
            showcase your artwork, sell securely, and connect with like-minded
            artists.
          </p>
          <button className="launch">
            <a href="/">Launch Dapp</a>
          </button>
        </div>
        <div className="landing-img">
          <img src={landing} alt="graphic-image" />
        </div>
      </section>
    </div>
  );
}

export default LandingPage;
