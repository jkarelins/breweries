import React, { Component } from "react";
import Comments from "../Comments/Comments";
import "./Advertisement.css";

export default class Advertisement extends Component {
  render() {
    const phone = this.props.phone ? `Phone: ${this.props.phone}` : "";
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
            <div className="d-flex justify-content-between">
              <p className="card-text text-left">
                {this.props.postal_code}
                <br />
                {phone}
              </p>
              {this.props.image ? (
                <img
                  src={this.props.image}
                  className="img-fluid text-right advImage"
                  alt=""
                />
              ) : (
                ""
              )}
            </div>
            <span className="text-center">
              <a
                href={this.props.web}
                target="blank"
                className="btn btn-primary text-center"
              >
                Visit our website
              </a>
            </span>

            <Comments
              id={this.props.id}
              addComment={this.props.addComment}
              comments={this.props.comments}
            />
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
