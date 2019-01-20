import React, { Component } from 'react';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import uid from "uid";
import './filters.css';

class Filters extends Component {
  getFilters() {
    return this.props.filters.map(filter =>
      <InputLabel key={uid()}>{filter.label}
        <Select
          className="filters__select"
          onChange={e => this.props.onChange(filter.id, e.target.value)}
          value={this.getValue(filter.id)}
          key={uid()}>
          {this.getItems(filter.items, filter.id)}
        </Select>
      </InputLabel>
    )
  }

  getItems(items, id) {
    return items.map(item => <MenuItem value={item} key={uid()}>{item}</MenuItem>);
  }

  getValue(id) {
    const filter = this.props.activeFilters.find(filter => filter.id === id);
    if (filter) {
      return filter.value;
    }
    return "все";
  }

  render() {
    return <div className="filters">
      <h2 className="filters__title">Фильтр</h2>
      <form>
        {this.getFilters()}
      </form>
    </div>
  }
}

export default Filters;
