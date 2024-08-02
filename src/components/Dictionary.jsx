import React, { useState } from "react";
import Navbar from "./util/Navbar";
import Footer from "./util/Footer";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import "./styles/Dictionary.css";

function Dictionary() {
  const [noResult, setNoResult] = useState(false);
  const [answer, setAnswer] = useState(false);
  const [input, setInput] = useState("");
  const [word, setWord] = useState("");
  const [pos, setPos] = useState("");
  const [phonetic, setPhonetic] = useState("");
  const [meaning, setMeaning] = useState([]);
  const [example, setExample] = useState([]);
  const [soundText, setSoundText] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (input.length === 0 || !input) {
      setAnswer(false);
      return;
    }
    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${input}`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        setNoResult(false);
        setWord(input);
        let partOfSpeech = "";
        let definitions = [];
        let examples = [];
        if (data[0].meanings && data[0].meanings.length > 0) {
          for (let i = 0; i < Math.min(2, data[0].meanings.length); i++) {
            const meaning = data[0].meanings[i];
            if (meaning.partOfSpeech) {
              partOfSpeech += meaning.partOfSpeech + " ";
            }
            if (meaning.definitions && meaning.definitions.length > 0) {
              const definition = meaning.definitions[0];
              definitions.push(
                definition.definition +
                  (meaning.partOfSpeech
                    ? " (" + meaning.partOfSpeech + ")"
                    : "")
              );
              examples.push(
                definition.example
                  ? definition.example +
                      (meaning.partOfSpeech
                        ? " (" + meaning.partOfSpeech + ")"
                        : "")
                  : ""
              );
            }
          }
        }
        setPos(partOfSpeech.trim());
        setMeaning(definitions);
        setExample(examples);
        setPhonetic(data[0].phonetic || "");
        setSoundText(input);
        setAnswer(true);
      } else {
        setAnswer(false);
        setNoResult(true);
      }
    } catch (err) {
      console.log("Server Error: ", err);
      setAnswer(false);
      setNoResult(false);
    }
  };

  const playSound = () => {
    if (!soundText) return;

    const utterance = new SpeechSynthesisUtterance(soundText);
    utterance.lang = "en-US";
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="Dictionary">
      <Navbar />
      <div className="main">
        <div className="main-container-dict">
          <p className="heading-dict">Dictionary Tool</p>
          <div className="dictionary-container">
            <div className="search-container">
              <input
                type="text"
                className="search-input"
                placeholder="Your word here..."
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                }}
              />
              <button className="btn" onClick={handleSearch}>
                Search
              </button>
            </div>
            <h1
              style={{ color: "#508d4e", display: noResult ? "block" : "none" }}
            >
              No result found!
            </h1>
            <div
              className="search-result"
              style={{ visibility: answer ? "visible" : "hidden" }}
            >
              <div className="word">
                <h1>
                  {word}
                  <button
                    className="sound-btn"
                    onClick={(e) => {
                      e.preventDefault();
                      playSound();
                    }}
                    style={{
                      cursor: "pointer",
                      visibility: answer ? "visible" : "hidden",
                    }}
                  >
                    <VolumeUpIcon className="icon" />
                  </button>
                </h1>
              </div>
              <div className="word-details">
                <p>{pos}</p>
                <p style={{ fontStyle: "italic" }}>{phonetic}</p>
              </div>
              <div className="word-meaning">
                {meaning.map((def, index) => (
                  <React.Fragment key={index}>
                    {def}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
              </div>
              <p
                className="word-example"
                style={{ marginTop: "10px", fontStyle: "italic" }}
              >
                {example.map((item, index) => (
                  <React.Fragment key={index}>
                    {item}
                    <br />
                    <br />
                  </React.Fragment>
                ))}
              </p>
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

export default Dictionary;
