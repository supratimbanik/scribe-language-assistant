import React, { useEffect } from "react";
import "./styles/Home.css";
import Navbar from "./util/Navbar";
import Footer from "./util/Footer";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Home() {
  useEffect(() => {
    const timeLine = gsap.timeline();

    timeLine.fromTo(
      ".main-one",
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 1.5, ease: "power2.out" }
    );

    let tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".main-two",
        start: "top 60%",
        end: "50% 50%",
        scrub: 1,
      },
    });
    tl.fromTo(".main-two-fixed.fixed-two", { width: "0%" }, { width: "100%" });

    let currentSlide = 0;
    const slides = document.querySelectorAll(".p-slide");
    const totalSlides = slides.length;

    const showSlide = (index) => {
      slides.forEach((slide, i) => {
        slide.style.opacity = i === index ? "1" : "0";
      });
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % totalSlides;
      showSlide(currentSlide);
    };

    const slideInterval = setInterval(nextSlide, 3000);

    return () => {
      clearInterval(slideInterval);
      if (tl) {
        tl.kill();
      }
      if (timeLine) {
        timeLine.kill();
      }
    };
  }, []);

  return (
    <div className="Home">
      <Navbar />
      <div className="home-container">
        <div className="main-one">
          <div className="main-one-item">
            <p className="roboto-medium">Write Better, Learn Faster.</p>
          </div>
          <div className="main-one-item main-one-image-div">
            <img
              src="./assets/home.png"
              alt="Home"
              className="main-one-image"
            />
          </div>
        </div>
        <div className="main-two ">
          <div className="main-two-item roboto-large ">
            <span className="fixed">
              <p className="main-two-fixed fixed-one">
                The ultimate <br />
                language tool!
              </p>
              <p className="main-two-fixed fixed-two">
                The ultimate <br />
                language tool!
              </p>
            </span>
          </div>
          <div className="main-two-item roboto-large slider-container">
            <div className="slider">
              <p className="p-slide">
                Enhance your writing with our advanced grammar corrector. It
                checks for errors and offers real-time suggestions, helping you
                write clearly and effectively. Perfect for emails, reports, and
                creative pieces, our tool ensures your content is polished and
                professional.
              </p>

              <p className="p-slide">
                Discover precise meanings with our comprehensive dictionary. It
                provides detailed definitions and usage examples helping you
                understand words in context. Expand your vocabulary.
              </p>

              <p className="p-slide">
                Convert spoken words to text seamlessly with our cutting-edge
                speech-to-text technology. Ideal for note-taking, recording
                thoughts, or transcribing interviews, our tool captures every
                word accurately, saving you time and effort.
              </p>

              <p className="p-slide">
                Instantly translate text between multiple languages with ease.
                Our tool provides accurate, context-aware translations in
                seconds, ideal for international communication, travel, or
                language learning. Break down language barriers effortlessly.
              </p>
            </div>
          </div>
        </div>
        <div className="main-three">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Home;
