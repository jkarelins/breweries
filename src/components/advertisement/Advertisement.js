import React, { Component } from "react";

export default class Advertisement extends Component {
  showImage() {
    const phone = this.props.phone ? `Phone: ${this.props.phone}` : "";
    return (
      <div className="d-flex justify-content-between">
        <p className="card-text text-left">
          {this.props.postal_code}
          <br />
          {phone}
        </p>
        {this.props.imageUrl ? (
          <img
            src={this.props.imageUrl}
            className="img-fluid text-right"
            alt=""
          />
        ) : (
          ""
        )}

        {/* {console.log(this.props)} */}
      </div>
    );
  }
  increment = () =>
    this.setState({
      likes: this.props.likes + 1
    });

  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            Name: {this.props.name} / Type: {this.props.brType}
          </div>
          <div className="card-body">
            <h5 className="card-title text-left">
              {this.props.street}, {this.props.city}, {this.props.state}
            </h5>
            {this.showImage()}
            <p>
              <button className="btn btn-outline-dark" onClick={this.increment}>
                <i className="fab fa-gratipay"> </i>
              </button>
              {/* {console.log(this.props)} */}
              {this.props.brewerie.likes} Likes
            </p>

            <span className="text-center">
              <a
                href={this.props.web}
                target="blank"
                className="btn btn-primary text-center"
              >
                Visit our website
              </a>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

// brType={brewerie.brewery_type}
// postCode={brewerie.postal_code}
// country={brewerie.country}
// web={brewerie.website_url}
// update={brewerie.updated_at}
