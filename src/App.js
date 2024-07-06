import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import LenisScroll from "./components/util/LenisScroll";
import Home from "./components/Home";
import About from "./components/About";
import Grammar from "./components/Grammar";
import Dictionary from "./components/Dictionary";
import Speech from "./components/Speech";
import Translator from "./components/Translator";
import Loader from "./components/util/Loader"; // Import the updated Loader component

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LenisScroll>
      <div className="App">
        {isLoading ? (
          <Loader />
        ) : (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/grammar" element={<Grammar />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/speech_to_text" element={<Speech />} />
            <Route path="/translator" element={<Translator />} />
          </Routes>
        )}
      </div>
    </LenisScroll>
  );
}

export default App;
