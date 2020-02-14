import React, { Component } from "react";
import Comments from "../Comments/Comments";
import { Link } from "react-router-dom";
import "./Advertisement.css";

export default class Advertisement extends Component {
  handleChange = () => {
    this.props.newLike(this.props.id);
  };
  render() {
    const phone = this.props.phone ? `Phone: ${this.props.phone}` : "";
    return (
      <div className="col-5 mx-auto">
        <div className="card mb-3">
          <Link
            to={{
              pathname: `/brewery/${this.props.id}`,
              state: {
                image: this.props.image
              }
            }}
            style={{ textDecoration: "none" }}
          >
            <div className="card-header">
              Name: {this.props.name} / Type: {this.props.brType}
            </div>
          </Link>

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
            <div className="my-3">
              <button
                className="btn btn-outline-dark mr-2"
                onClick={this.handleChange}
              >
                <i className="fab fa-gratipay"> </i>
              </button>
              {this.props.likes} Likes
            </div>
            <div>
              <Comments
                id={this.props.id}
                addComment={this.props.addComment}
                comments={this.props.comments}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
