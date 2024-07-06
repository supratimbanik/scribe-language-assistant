import React, { useEffect, useRef } from "react";
import "../styles/Navbar.css";

function Navbar() {
  const toggleRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    const toggleMenu = () => {
      if (navRef.current && toggleRef.current) {
        navRef.current.classList.toggle("show-menu");
        toggleRef.current.classList.toggle("show-icon");
      }
    };

    const toggleElement = toggleRef.current;
    if (toggleElement) {
      toggleElement.addEventListener("click", toggleMenu);
    }

    return () => {
      if (toggleElement) {
        toggleElement.removeEventListener("click", toggleMenu);
      }
    };
  }, []);

  const toggleDropdown = (event) => {
    const parentItem = event.target.closest(".dropdown-item");
    if (parentItem) {
      const dropdownMenu = parentItem.querySelector(".dropdown-menu");
      const dropdownArrow = parentItem.querySelector(".dropdown-arrow");

      if (dropdownMenu && dropdownArrow) {
        dropdownMenu.classList.toggle("dropdown-menu-toggle");
        dropdownArrow.classList.toggle("dropdown-arrow-toggle");
      }
    }
  };

  return (
    <div className="Navbar">
      <header className="header">
        <nav className="nav container">
          <div className="nav-data">
            <a href="/" className="anton-sc-logo nav-logo">
              SCRIBE
            </a>
            <div className="nav-toggle" ref={toggleRef}>
              <span className="material-symbols-outlined nav-burger">menu</span>
              <span className="material-symbols-outlined nav-close">close</span>
            </div>
          </div>
          <div className="nav-menu" ref={navRef}>
            <ul className="nav-list">
              <li>
                <a href="/" className="nav-link poppins-medium">
                  <span className="nav-link-span">Home</span>
                </a>
              </li>
              <li>
                <a href="/about" className="nav-link poppins-medium">
                  <span className="nav-link-span">About</span>
                </a>
              </li>
              <li
                className="dropdown-item poppins-medium"
                onClick={toggleDropdown}
              >
                <div className="nav-link tool-link">
                  <span className="nav-link-span">Tools </span>
                  <span className="material-symbols-outlined dropdown-arrow">
                    keyboard_arrow_down
                  </span>
                </div>
                <ul className="dropdown-menu">
                  <li>
                    <a href="/grammar" className="dropdown-link">
                      AI Grammar Tool
                    </a>
                  </li>
                  <li>
                    <a href="/dictionary" className="dropdown-link">
                      Dictionary
                    </a>
                  </li>
                  <li>
                    <a href="/speech_to_text" className="dropdown-link">
                      Speech to Text
                    </a>
                  </li>
                  <li>
                    <a href="/translator" className="dropdown-link">
                      Translator
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </div>
  );
}

export default Navbar;
