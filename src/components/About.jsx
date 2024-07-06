import React, { useEffect } from "react";
import Navbar from "./util/Navbar";
import Footer from "./util/Footer";
import { gsap } from "gsap/gsap-core";
import "./styles/About.css";

function Translator() {
  useEffect(() => {
    const timeLine = gsap.timeline();

    timeLine.fromTo(
      ".main-container-about",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );
    return () => {
      if (timeLine) {
        timeLine.kill();
      }
    };
  }, []);
  return (
    <div className="Translator">
      <Navbar />
      <div className="main">
        <div className="main-container-about">
          <p className="heading-about">About</p>
          <div className="about-container">
            <p>
              Welcome to Scribe!
              <br /> <br />
              At Scribe, we harness the power of AI to enhance your writing and
              communication experience.
              <br />
              <br />
              Our suite of tools includes:
              <br />
              <br />
              <b>AI Grammar:</b> Instantly improve your writing with AI-powered
              grammar suggestions.
              <br />
              <br /> <b>Dictionary:</b> Access a comprehensive dictionary to
              find meanings, synonyms, and more. <br />
              <br />
              <b>Speech to Text:</b> Effortlessly convert spoken words into text
              for easier documentation. <br />
              <br />
              <b>Translator:</b> Break down language barriers with our intuitive
              translation tool. Whether you're a student, professional, or
              language enthusiast, Scribe is here to elevate your productivity
              and creativity. Join us in shaping the future of communication.
            </p>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Translator;
