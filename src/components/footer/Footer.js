import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <footer className="container mt-5">
        <p className="float-right">
          <a href="#">Back to top</a>
        </p>
        <p>© Brewery Search React App · Privacy · Terms</p>
      </footer>
    );
  }
}
