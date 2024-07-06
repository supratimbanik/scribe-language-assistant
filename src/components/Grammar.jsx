import React, { useState } from "react";
import Navbar from "./util/Navbar";
import Footer from "./util/Footer";
import { trainingPrompt } from "./util/GeminiPrompt";
import { MoonLoader } from "react-spinners";
import "./styles/Grammar.css";

const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
function Grammar() {
  const [text, setText] = useState("");
  const [answer, setAnswer] = useState("");
  const [isSent, setIsSent] = useState(false);

  const handleAnswer = async (event) => {
    event.preventDefault();
    const gemini =
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=` +
      API_KEY;

    let message = [
      ...trainingPrompt,
      {
        parts: [
          {
            text: text,
          },
        ],
        role: "user",
      },
    ];
    setIsSent(true);
    try {
      let response = await fetch(gemini, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: message,
        }),
      });

      let answerJson = await response.json();
      setAnswer(answerJson.candidates[0].content.parts[0].text);
      setIsSent(false);
    } catch (err) {
      console.log("Server Error");
      setIsSent(false);
    }
  };

  return (
    <div className="Grammar">
      <Navbar />
      <div className="main">
        <div className="main-container">
          <div className="section-one">AI Grammar Tool</div>
          <div className="section-two">
            <textarea
              className="input"
              placeholder="Your text here..."
              value={text}
              onChange={(e) => {
                setText(e.target.value);
              }}
            />
            <div className="grammar-answer">
              <div
                className="loader"
                style={{
                  display: isSent ? "flex" : "none",
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                <MoonLoader color="#A1C398" size={50} />
              </div>
              <textarea
                className="answer"
                style={{ display: !isSent ? "block" : "none" }}
                value={answer || "Your answer here...."}
                readOnly
              />
            </div>
          </div>
          <div className="section-three">
            <button
              className="btn"
              onClick={(event) => {
                handleAnswer(event);
              }}
            >
              Fix
            </button>
          </div>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Grammar;
