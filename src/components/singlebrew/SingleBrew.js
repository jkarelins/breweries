import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SingleBrew extends Component {
  state = {
    brewery: {}
  };

  getContent = async () => {
    const newRequest = this.props.match.params.id;
    const { image } = this.props.location.state;
    const response = await fetch(
      `https://api.openbrewerydb.org/breweries/${newRequest}`
    );
    const data = await response.json();
    this.setState({ brewery: data, image });
  };

  componentDidMount = async () => {
    await this.getContent();
  };
  render() {
    return (
      <div className="container">
        <div className="d-flex justify-content-center">
          <div className="card mt-5 col-6">
            <Link
              to={{
                pathname: `/gallery/${this.state.brewery.id}`,
                state: {
                  breweryData: this.state.brewery
                }
              }}
            >
              <img
                className="card-img-top"
                src={this.state.image}
                alt={this.state.brewery.name}
              />
            </Link>
            <div className="card-body">
              <h5>{this.state.brewery.name}</h5>
              <p className="card-text">
                Brewery type: {this.state.brewery.brewery_type}
              </p>
              <a href={this.state.brewery.website_url} target="blank">
                <button className="btn btn-lg btn-info">OFICIAL WEBSITE</button>
              </a>
            </div>
          </div>
        </div>
        <div className="container mt-3"></div>
      </div>
    );
  }
}
