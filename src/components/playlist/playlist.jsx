import React, { Component, Fragment } from 'react';
import './playlist.css';
import PlayListTable from "../playlist-table/playlist-table";
import ControlsSet from "../controls-set/controls-set";
import generateData from "../../data";
import { DEFAULT_ROWS_COUNT, DEFAULT_SORT_BY, ROWS_COUNT } from "../../constants";
import ReactPaginate from 'react-paginate';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: false,
      loading: true,
      rows: DEFAULT_ROWS_COUNT,
      currentPage: 1,
      sortBy: DEFAULT_SORT_BY,
      reverse: false
    }
  }

  componentDidMount() {
    this.getPlaylistData();
  }

  getPlaylistData() {
    generateData()
      .then(res => this.handleResponse(res))
      .catch(err => this.setError("Something went wrong, please try agein later"));
  }

  handleResponse(res) {
    if (res.status === 200) {
      this.setState({ data: JSON.parse(res.data), loading: false });
    } else {
      this.setError("Something went wrong, please try agein later")
    }
  }

  setError(error = "") {
    this.setState({ error })
  }

  showError() {
    const { error } = this.state;
    if (error) return <span className="playlist__error">{error}</span>
  }

  showSpinner() {
    if (this.state.loading) return <span className="playlist__error">Loading...</span>;
  }

  getTableData() {
    const sortedData = this.sortData();
    const slicedData = this.sliceData(sortedData)
    return slicedData;
  }

  sortData() {
    const { data, sortBy, reverse } = this.state;
    if (!data.length) return;

    let sortedData = [];

    if (sortBy === "year") {
      sortedData = data.sort((a, b) => reverse ? (a.year - b.year) : (b.year - a.year));
    } else {
      sortedData = data.sort((a, b) => reverse ? b[sortBy].localeCompare(a[sortBy]) : a[sortBy].localeCompare(b[sortBy]));
    }

    return sortedData;
  }

  sliceData(data) {
    const { rows, currentPage } = this.state;

    return data.slice(rows * (currentPage - 1), rows * currentPage);
  }

  showContent() {
    const { data, rows, currentPage } = this.state;
    if (!data.length) return;

    return <Fragment>
      <div className="playlist__inner">
        <h2 className="playlist__title">Плейлист</h2>
        <PlayListTable data={this.getTableData()} sortBy={this.state.sortBy} reverse={this.state.reverse} handleClick={id => this.changeSorting(id)} />
        <div className="playlist__controls">
          <ReactPaginate
            pageCount={data.length / rows}
            pageRangeDisplayed={2}
            marginPagesDisplayed={1}
            forcePage={currentPage - 1}
            onPageChange={page => this.changePage(page)}
            previousLabel={"<"}
            nextLabel={">"}
            containerClassName="pagination-controls"
            pageClassName="pagination-controls__item"
            activeClassName="pagination-controls__item_state_active"
            nextClassName="pagination-controls__btn pagination-controls__btn_direction_next"
            previousClassName="pagination-controls__btn pagination-controls__btn_direction_prev"
            disabledClassName="pagination-controls__btn_state_disabled"
            breakClassName="pagination-controls__break"
          />
          <ControlsSet items={ROWS_COUNT} active={rows} handleClick={rows => this.changeRowsCount(rows)} />
        </div>
      </div>
      {/* <PlaylistFilters /> */}
    </Fragment>
  }

  changeSorting(sortBy) {
    if (this.state.sortBy === sortBy) return this.toggleSortDirection();
    this.setState({ sortBy, reverse: false });
  }

  changePage({ selected }) {
    this.setState({ currentPage: selected + 1 })
  }

  changeRowsCount(rows) {
    if (rows === this.state.rows) return;
    this.setState({ rows, currentPage: 1 })
  }

  toggleSortDirection() {
    this.setState({ reverse: !this.state.reverse })
  }

  render() {
    return (
      <section className="playlist">
          {this.showError()}
          {this.showSpinner()}
          {this.showContent()}
      </section>
    );
  }
}

export default Playlist;
