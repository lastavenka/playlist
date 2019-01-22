import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import "./sort-controls.css";

class SortControls extends PureComponent {
  defineClass() {
    let className = "sort-controls";

    if (this.props.active) {
      className += this.props.reverse
        ? " sort-controls_direction_up"
        : " sort-controls_direction_down";
    }
    return className;
  }

  render() {
    return (
      <button
        className={this.defineClass()}
        onClick={() => this.props.handleClick(this.props.sortBy)}
      />
    );
  }
}

SortControls.propTypes = {
  reverse: PropTypes.bool,
  active: PropTypes.bool,
  handleClick: PropTypes.func.isRequired
};

export default SortControls;
