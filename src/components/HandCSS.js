import React from "react";
import "./HandCSS.scss";

const HandCSS = ({ side = "right", activeFinger = "" }) => (
  <div className={`hand ${side === "left" ? "left-hand" : "right-hand"}`}>
    <div className="palm">
      <div className={`thumb${activeFinger === "thumb" ? " active" : ""}`}></div>
      <div className={`finger f1${activeFinger === "f1" ? " active" : ""}`}></div>
      <div className={`finger f2${activeFinger === "f2" ? " active" : ""}`}></div>
      <div className={`finger f3${activeFinger === "f3" ? " active" : ""}`}></div>
      <div className={`finger f4${activeFinger === "f4" ? " active" : ""}`}></div>
    </div>
  </div>
);

export default HandCSS; 