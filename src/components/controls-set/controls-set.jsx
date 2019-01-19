import React from 'react';
import uid from "uid";
import './controls-set.css';

const ControlsSet = props => {
  let itemClass = "controls-set__item";
  let activeItemClass = itemClass + " controls-set__item_state_active"

  return (
    <ul className="controls-set">
      {props.items.map(item => (
        <li className={props.active === item ? activeItemClass : itemClass} key={uid()}>
          <button onClick={() => props.handleClick(item)}>{item}</button>
        </li>)
      )}
    </ul>
  );
}

export default ControlsSet;
