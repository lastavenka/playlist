import React from 'react';
import './sort-controls.css';

const SortControls = props => {
  const defineClass = () => {
    let className = "sort-controls";

    if (props.active) {
      className += props.reverse ? " sort-controls_direction_up" : " sort-controls_direction_down";
    }

    return className;
  }

  return (
    <button className={defineClass()} onClick={() => props.handleClick(props.sortBy)} />
  );
}

export default SortControls;
