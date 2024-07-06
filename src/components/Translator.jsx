import React, { useState, useEffect } from "react";
import countries from "./util/data-languages.js";
import Navbar from "./util/Navbar";
import Footer from "./util/Footer";
import "./styles/Translator.css";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Translator() {
  const [toTextPlaceholder, setToTextPlaceholder] = useState("Translation...");
  const [fromText, setFromText] = useState("");
  const [toText, setToText] = useState("");
  const [fromLang, setFromLang] = useState("en-GB");
  const [toLang, setToLang] = useState("hi-IN");

  useEffect(() => {
    const fromSelect = document.querySelector(".from-select");
    const toSelect = document.querySelector(".to-select");

    const populateSelectOptions = (selectElement, selectedLang) => {
      selectElement.innerHTML = "";
      for (let country_code in countries) {
        let selected = country_code === selectedLang ? "selected" : "";
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`;
        selectElement.insertAdjacentHTML("beforeend", option);
      }
    };

    populateSelectOptions(fromSelect, fromLang);
    populateSelectOptions(toSelect, toLang);
  }, [fromLang, toLang]);

  const handleInterchange = () => {
    setFromText(toText);
    setToText(fromText);
    setFromLang(toLang);
    setToLang(fromLang);
  };

  const handleTranslate = async () => {
    let from = fromText.trim();
    let translateFrom = fromLang;
    let translateTo = toLang;
    if (!from) {
      setToTextPlaceholder("Translation...");
      return;
    }
    setToTextPlaceholder("Translating...");
    let apiUrl = `https://api.mymemory.translated.net/get?q=${from}&langpair=${translateFrom}|${translateTo}`;
    try {
      await fetch(apiUrl)
        .then((res) => res.json())
        .then((data) => {
          setToText(
            data.responseData.translatedText
              ? data.responseData.translatedText
              : from
          );
          setToTextPlaceholder("Translation...");
        });
    } catch (err) {
      console.log("Server error : ", err);
      setToTextPlaceholder("Translation...");
    }
  };

  const handleControls = (e) => {
    if (e.currentTarget.classList.contains("copyFromText") && fromText) {
      navigator.clipboard.writeText(fromText);
    }
    if (e.currentTarget.classList.contains("copyToText") && toText) {
      navigator.clipboard.writeText(toText);
    }
    if (!fromText || !toText) return;

    let sound;
    const voices = speechSynthesis.getVoices();

    if (e.currentTarget.classList.contains("soundFromText") && fromText) {
      sound = new SpeechSynthesisUtterance(fromText);
      sound.lang = fromLang;
      let fromVoice = voices.find((voice) => voice.lang === fromLang);
      if (!fromVoice) {
        console.error(`Voice for language ${fromLang} not found.`);
      }
      sound.voice = fromVoice;
    }
    if (e.currentTarget.classList.contains("soundToText") && toText) {
      sound = new SpeechSynthesisUtterance(toText);
      sound.lang = toLang;
      let toVoice = voices.find((voice) => voice.lang === toLang);
      if (!toVoice) {
        console.error(`Voice for language ${toLang} not found.`);
      }
      sound.voice = toVoice;
    }
    if (sound && sound.voice) {
      speechSynthesis.speak(sound);
    }
  };

  return (
    <div className="Translator">
      <Navbar />
      <div className="main">
        <div className="main-container-translator">
          <p className="heading-translator">Translator Tool</p>
          <div className="translator-container">
            <div className="translator">
              <div className="translate-box">
                <div className="translate-input">
                  <textarea
                    className="from"
                    spellCheck="false"
                    placeholder="Your text here..."
                    value={fromText}
                    onChange={(e) => setFromText(e.target.value)}
                    onKeyUp={() => {
                      if (!fromText || fromText === "") {
                        setToText("");
                      }
                    }}
                  />
                  <div className="controls">
                    <VolumeUpIcon
                      className="soundFromText icon"
                      onClick={handleControls}
                    />
                    <ContentCopyIcon
                      className="copyFromText icon "
                      onClick={handleControls}
                    />
                    <select
                      className="language-select from-select"
                      value={fromLang}
                      onChange={(e) => setFromLang(e.target.value)}
                    />
                  </div>
                </div>
                <div className="interchange" onClick={handleInterchange}>
                  <SwapHorizIcon className="icon" />
                </div>
                <div className="translate-input">
                  <textarea
                    className="to"
                    spellCheck="false"
                    placeholder={toTextPlaceholder}
                    value={toText}
                    onChange={(e) => setToText(e.target.value)}
                  />
                  <div className="controls">
                    <VolumeUpIcon
                      className="soundToText icon"
                      onClick={handleControls}
                    />
                    <ContentCopyIcon
                      className="copyToText icon"
                      onClick={handleControls}
                    />
                    <select
                      className="language-select to-select"
                      value={toLang}
                      onChange={(e) => setToLang(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="main-button">
                <button
                  className="btn"
                  style={{ width: "120px" }}
                  onClick={handleTranslate}
                >
                  Translate
                </button>
              </div>
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

export default Translator;
