import React, { Component } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import SortControls from "../sort-controls/sort-controls";
import { HEADERS } from "../../constants";
import uid from "uid";
import './playlist-table.css';

class PlayListTable extends Component {
  getHeaders() {
    return HEADERS.map(header => <TableCell align="left" key={uid()}>
      <div className="playlist-table__header">
        {header.label}
        <SortControls
          sortBy={header.id}
          active={this.props.sortBy === header.id}
          reverse={this.props.reverse}
          handleClick={id => this.props.handleClick(id)}
        />
      </div>
    </TableCell>)
  }

  getRows() {
    const { data } = this.props;
    if (!data.length) return;

    return data.map(item => <TableRow key={uid()} hover>{this.getCells(item)}</TableRow>)
  }

  getCells(item) {
    return Object.values(item).map(value => <TableCell key={uid()} align="left">{value}</TableCell>)
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
