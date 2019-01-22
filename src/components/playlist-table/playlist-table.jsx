import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@material-ui/core";
import SortControls from "../sort-controls/sort-controls";
import { PLAYLIST_HEADERS } from "../../constants";
import uid from "uid";
import "./playlist-table.css";

class PlayListTable extends Component {
  getHeaders() {
    return PLAYLIST_HEADERS.map(header => (
      <TableCell align="left" key={uid()}>
        <div className="playlist-table__header">
          {header.label}
          <SortControls
            sortBy={header.id}
            active={this.props.sortBy === header.id}
            reverse={this.props.reverse}
            handleClick={id => this.props.handleClick(id)}
          />
        </div>
      </TableCell>
    ));
  }

  getRows() {
    const { data } = this.props;
    return data.map(item => (
      <TableRow key={uid()} hover>
        {this.getCells(item)}
      </TableRow>
    ));
  }

  getCells(item) {
    return Object.values(item).map(value => (
      <TableCell key={uid()} align="left">
        {value}
      </TableCell>
    ));
  }

  render() {
    return (
      <Table className="playlist-table">
        <TableHead>
          <TableRow>{this.getHeaders()}</TableRow>
        </TableHead>
        <TableBody>{this.getRows()}</TableBody>
      </Table>
    );
  }
}

PlayListTable.propTypes = {
  sortBy: PropTypes.string,
  reverse: PropTypes.bool,
  handleClick: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default PlayListTable;
