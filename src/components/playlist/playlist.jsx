import React, { Component } from 'react';
import './playlist.css';
import { Paper } from '@material-ui/core';
import PlayListTable from "../playlist-table/playlist-table";
import generateData from "../../data";

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      error: false,
      loading: true
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

  showContent() {
    const { data } = this.state;
    if (!data.length) return;
    return <PlayListTable data={data} />
  }

  render() {
    return (
      <section className="playlist">
        <h2>Плейлист</h2>
        {this.showError()}
        <Paper>
          {this.showSpinner()}
          {this.showContent()}
        </Paper>
      </section>
    );
  }
}

export default Playlist;
