import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Select, MenuItem, InputLabel } from "@material-ui/core";
import uid from "uid";
import "./filters.css";

class Filters extends PureComponent {
  getFilters() {
    if (!this.props.filters || !this.props.filters.length) return;

    return this.props.filters.map(filter => (
      <InputLabel key={uid()}>
        {filter.label}
        <Select
          className="filters__select"
          onChange={e => this.props.onChange(filter.id, e.target.value)}
          value={this.getValue(filter.id)}
          key={uid()}
        >
          {this.getItems(filter.items, filter.id)}
        </Select>
      </InputLabel>
    ));
  }

  getItems(items) {
    return items.map(item => (
      <MenuItem value={item} key={uid()}>
        {item}
      </MenuItem>
    ));
  }

  getValue(id) {
    const { activeFilters } = this.props;

    if (activeFilters && activeFilters.length) {
      const filter = activeFilters.find(filter => filter.id === id);
      if (filter) {
        return filter.value;
      }
    }
    return "все";
  }

  render() {
    return (
      <div className="filters">
        <h2 className="filters__title">Фильтр</h2>
        <form>{this.getFilters()}</form>
      </div>
    );
  }
}

Filters.propTypes = {
  filters: PropTypes.arrayOf(PropTypes.object),
  activeFilters: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func.isRequired
};

export default Filters;
