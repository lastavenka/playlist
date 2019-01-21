import React from "react";
import "./spinner.css";

const Spinner = props => {
  return <span className="spinner">{props.text}</span>;
};

export default Spinner;
