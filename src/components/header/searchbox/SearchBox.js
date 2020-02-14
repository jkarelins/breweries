import React, { Component, Fragment } from "react";
import { Link, Redirect, useHistory } from "react-router-dom";

const initialState = {
  searchBox: "beer"
};

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }
  reset() {
    this.setState(initialState);
  }

  handleSearch = e => {
    this.setState({
      searchBox: e.target.value
    });
  };

  componentDidMount() {
    this.reset();
  }

  search = () => {
    this.setState({ redirect: true });
  };

  render() {
    if (this.state.redirect === true) {
      return (
        <Redirect
          to={`/search/${this.state.searchBox.split(" ").join("%20")}`}
        />
      );
    }
    return (
      <Fragment>
        <input
          className="form-control mr-sm-2 col-3"
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={this.handleSearch}
        />
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="button"
          onClick={this.search}
        >
          Search for: {this.state.searchBox}
        </button>
      </Fragment>
    );
  }
}
