import React, { useState, useEffect } from "react";
import Navbar from "./util/Navbar";
import Footer from "./util/Footer";
import "./styles/Speech.css";
import SpeechRecognition from "react-speech-recognition/lib/SpeechRecognition";
import { useSpeechRecognition } from "react-speech-recognition";
import useClipboard from "react-use-clipboard";

function Speech() {
  const [copyText, setCopyText] = useState("");
  const [isCopied, setCopied] = useClipboard(copyText);
  const [copyButtonText, setCopyButtonText] = useState("Copy");

  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  useEffect(() => {
    setCopyText(transcript); // Update copyText whenever transcript changes
  }, [transcript]);

  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true });

  if (!browserSupportsSpeechRecognition) {
    return null;
  }

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  const copyToClipboard = () => {
    setCopied();
    if (isCopied) {
      setCopyButtonText("Copied!");
      setTimeout(() => {
        setCopyButtonText("Copy");
      }, 300);
    } else {
      console.log("Failed copying!");
    }
  };

  return (
    <div className="Speech">
      <Navbar />
      <div className="main">
        <div className="main-container-speech">
          <p className="heading-speech">Speech To Text Tool</p>
          <div className="speech-container">
            <textarea
              className="speech-result"
              placeholder="Your text here..."
              value={transcript}
              readOnly
            />
            <div className="speech-buttons">
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  startListening();
                }}
              >
                Start
              </button>
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  stopListening();
                }}
              >
                Stop
              </button>
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  resetTranscript();
                }}
              >
                Clear
              </button>
              <button
                className="btn"
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard();
                }}
              >
                {copyButtonText}
              </button>
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Speech;
