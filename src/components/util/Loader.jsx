import React from "react";
import { HashLoader, GridLoader, MoonLoader } from "react-spinners";

const Loader = () => (
  <div
    className="loader"
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#FEFDED",
      gap: "70px",
    }}
  >
    <GridLoader color="#A1C398" size={20} />
    <HashLoader color="#A1C398" size={70} />
    <MoonLoader color="#A1C398" size={50} />
  </div>
);

export default Loader;
