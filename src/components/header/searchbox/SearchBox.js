import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import Search from "../../search/Search";

const initialState = {
  searchBox: ""
};

export default class SearchBox extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  handleSearch = e => {
    this.setState({
      searchBox: e.target.value
    });
  };
  search() {}

  render() {
    return (
      <Fragment>
        <input
          className="form-control mr-sm-2 col-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={this.state.searchBox}
          onChange={this.handleSearch}
        />
        <Link to={`/search/${this.state.searchBox.split(" ").join("%20")}`}>
          <button
            className="btn btn-outline-success my-2 my-sm-0"
            type="button"
            onClick={this.search}
          >
            Search
          </button>
        </Link>
      </Fragment>
    );
  }
}
