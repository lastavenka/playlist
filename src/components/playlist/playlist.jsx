import React, { Component, Fragment } from "react";
import "./playlist.css";
import PlayListTable from "../playlist-table/playlist-table";
import Filters from "../filters/filters";
import ControlsSet from "../controls-set/controls-set";
import Spinner from "../spinner/spinner";
import generateData from "../../data";
import {
  PLAYLIST_DEFAULT_ROWS_COUNT,
  PLAYLIST_DEFAULT_SORT_BY,
  PLAYLIST_ROWS_COUNT,
  PLAYLIST_FILTERS
} from "../../constants";
import ReactPaginate from "react-paginate";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: false,
      loading: true,
      rows: PLAYLIST_DEFAULT_ROWS_COUNT,
      currentPage: 1,
      sortBy: PLAYLIST_DEFAULT_SORT_BY,
      reverse: false,
      activeFilters: []
    };

    this.generateData = generateData;
  }

  componentDidMount() {
    this.getPlaylistData();
  }

  getPlaylistData() {
    // fetch method imitation
    this.generateData()
      .then(res => this.handleResponse(res))
      .catch(err =>
        this.setError("Что-то пошло не так. Пожалуйста, попробуйте позже")
      );
  }

  handleResponse(res) {
    if (res.status === 200) {
      this.setState({ data: JSON.parse(res.data), loading: false });
    } else {
      this.setState({ loading: false });
      this.setError("Что-то пошло не так. Пожалуйста, попробуйте позже");
    }
  }

  setError(error = "") {
    this.setState({ error });
  }

  showError() {
    const { error } = this.state;
    if (error) return <span className="playlist__error">{error}</span>;
  }

  showSpinner() {
    if (this.state.loading) return <Spinner text="Идет загрузка..." />;
  }

  decorateTableData(data) {
    const sortedData = this.sortData(data);
    const slicedData = this.sliceData(sortedData);

    return slicedData;
  }

  getFilters() {
    let filtersList = [];
    let filtersIds = [];

    PLAYLIST_FILTERS.forEach(filter => {
      filtersList.push({ id: filter.id, label: filter.label, items: [] });
      filtersIds.push(filter.id);
    });

    this.state.data.forEach(item => {
      for (let key in item) {
        if (!filtersIds.includes(key)) continue;
        const currentFilter = filtersList.find(filter => filter.id === key);
        currentFilter.items.push(item[key]);
      }
    });

    filtersList.forEach(filter => {
      const uniqueValues = new Set(filter.items);

      filter.items = [...uniqueValues];
      if (filter.id === "year") {
        filter.items.sort();
      } else {
        filter.items.sort((a, b) => a.localeCompare(b));
      }
      filter.items.unshift("все");
    });

    return filtersList;
  }

  filterData() {
    const { data, activeFilters } = this.state;

    if (!activeFilters.length) {
      return data;
    }
    return activeFilters.reduce((arr, currentfilter) => {
      return arr.filter(item => item[currentfilter.id] === currentfilter.value);
    }, data);
  }

  sortData(data) {
    const { sortBy, reverse } = this.state;
    let sortedData = [];

    if (sortBy === "year") {
      sortedData = data.sort((a, b) =>
        reverse ? a.year - b.year : b.year - a.year
      );
    } else {
      sortedData = data.sort((a, b) =>
        reverse
          ? b[sortBy].localeCompare(a[sortBy])
          : a[sortBy].localeCompare(b[sortBy])
      );
    }

    return sortedData;
  }

  sliceData(data) {
    const { rows, currentPage } = this.state;

    return data.slice(rows * (currentPage - 1), rows * currentPage);
  }

  showContent() {
    const { data, activeFilters } = this.state;
    if (!data.length) return;

    const filteredData = this.filterData();
    const filtersList = this.getFilters();

    return (
      <Fragment>
        <div className="playlist__inner">
          <h2 className="playlist__title">Плейлист</h2>
          {this.showTable(filteredData)}
        </div>
        <Filters
          filters={filtersList}
          activeFilters={activeFilters}
          onChange={(value, id) => this.changeFilter(value, id)}
        />
      </Fragment>
    );
  }

  showTable(filteredData) {
    if (!filteredData.length)
      return (
        <span>
          Нет данных для отображения. Попробуйте изменить фильтр поиска.
        </span>
      );

    const { rows, currentPage } = this.state;
    const tableData = this.decorateTableData(filteredData);

    return (
      <Fragment>
        <PlayListTable
          data={tableData}
          sortBy={this.state.sortBy}
          reverse={this.state.reverse}
          handleClick={id => this.changeSorting(id)}
        />
        <div className="playlist__controls">
          <ReactPaginate
            pageCount={filteredData.length / rows}
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
          <ControlsSet
            items={PLAYLIST_ROWS_COUNT}
            active={rows}
            handleClick={rows => this.changeRowsCount(rows)}
          />
        </div>
      </Fragment>
    );
  }

  changeSorting(sortBy) {
    if (this.state.sortBy === sortBy) return this.toggleSortDirection();
    this.setState({ sortBy, reverse: false });
  }

  changePage({ selected }) {
    this.setState({ currentPage: selected + 1 });
  }

  changeRowsCount(rows) {
    if (rows === this.state.rows) return;
    this.setState({ rows, currentPage: 1 });
  }

  toggleSortDirection() {
    this.setState({ reverse: !this.state.reverse });
  }

  changeFilter(id, value) {
    let activeFilters = this.state.activeFilters;
    const currentFilter = activeFilters.find(filter => filter.id === id);

    if (currentFilter) {
      const index = activeFilters.indexOf(currentFilter);
      value === "все"
        ? activeFilters.splice(index, 1)
        : (activeFilters[index].value = value);
    } else {
      activeFilters.push({ id: id, value: value });
    }
    this.setState({ activeFilters, currentPage: 1 });
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
