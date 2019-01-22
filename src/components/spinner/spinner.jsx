import React from "react";
import PropTypes from "prop-types";
import "./spinner.css";

const Spinner = props => {
  return <span className="spinner">{props.text}</span>;
};

Spinner.propTypes = {
  text: PropTypes.string.isRequired
};

export default Spinner;
