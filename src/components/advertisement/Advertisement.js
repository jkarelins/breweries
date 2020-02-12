import React, { Component } from "react";

export default class Advertisement extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">{this.props.name}</div>
          <div className="card-body">
            <h5 className="card-title text-left">
              {this.props.street}, {this.props.city}, {this.props.state}
            </h5>
            <p className="card-text text-left">
              {this.props.postal_code}
              <br />
              Phone: {this.props.phone}
              <div className="text-center">
                <a
                  href={this.props.web}
                  target="blank"
                  className="btn btn-primary"
                >
                  Visit our website
                </a>
              </div>
            </p>
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
