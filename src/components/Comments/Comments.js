// const crypto = require("crypto");

import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Comments extends Component {
  static propTypes = {
    addComment: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = { comment: "", id: "" };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.addComment(this.state);
    this.setState({ comment: "", id: "" });
  };

  handleChange = e => {
    this.setState({
      id: this.props.id,
      comment: e.target.value
    });
  };

  render() {
    return (
      <div>
        <div className="addComment container mt-2">
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>New comment:</label>
            </div>
            <input
              type="text"
              placeholder="Input New Comment"
              onChange={this.handleChange}
              value={this.state.comment}
            />
            <input type="submit" value="ADD" />
          </form>
        </div>
        <div className="showCommnets">
          <ul className="list-group list-group-flush">
            {this.props.comments.map((comment, i) => (
              <li className="list-group-item" key={i}>
                {comment.comment}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
