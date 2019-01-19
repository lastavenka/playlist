import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import SortControls from "../sort-controls/sort-controls";
import { HEADERS } from "../../constants";
import uid from "uid";
import './playlist-table.css';

class PlayListTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "band",
      reverse: false
    }
  }

  getHeaders() {
    return HEADERS.map(header => <TableCell align="left" key={uid()}>
      <div className="playlist-table__header">
        {header.label}
        <SortControls
          sortBy={header.id}
          active={this.state.sortBy === header.id}
          reverse={this.state.reverse}
          handleClick={id => this.handleSortClick(id)}
        />
      </div>
    </TableCell>)
  }

  getRows() {
    const { data } = this.props;
    if (!data.length) return;

    const sortedData = this.sortData();
    return sortedData.map(item => <TableRow key={uid()} hover>{this.getCells(item)}</TableRow>)
  }

  getCells(item) {
    return Object.values(item).map(value => <TableCell key={uid()} align="left">{value}</TableCell>)
  }

  handleSortClick(sortBy) {
    if (this.state.sortBy === sortBy) return this.toggleSortDirection();
    this.setState({ sortBy, reverse: false });
  }

  toggleSortDirection() {
    this.setState({ reverse: !this.state.reverse })
  }

  sortData() {
    const { data } = this.props;
    if (!data.length) return;

    let sortedData = [];
    const { sortBy, reverse } = this.state;

    if(sortBy === "year") {
      sortedData = data.sort((a, b) => reverse ? (a.year - b.year) : (b.year - a.year));
    } else {
      sortedData = data.sort((a, b) => reverse ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy]));
    }

    return sortedData;
  }

  render() {
    return (
      <Table>
        <TableHead>
          <TableRow>
            {this.getHeaders()}
          </TableRow>
        </TableHead>
        <TableBody>
          {this.getRows()}
        </TableBody>
      </Table>
    );
  }
}

export default PlayListTable;
