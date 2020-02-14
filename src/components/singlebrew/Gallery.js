import React, { Component } from "react";
import "./Gallery.css";

export default class Gallery extends Component {
  state = {
    breweryData: {},
    images: [],
    loading: true
  };
  getContent = () => {
    const { breweryData } = this.props.location.state;
    this.fetchImages(breweryData);
  };

  fetchImages = breweryData => {
    const firstWord = `beer+${breweryData.name.split(" ")[1]}`;
    fetch(
      `https://pixabay.com/api/?key=15235209-ef7229ba5181d19e97e965940&q=${encodeURIComponent(
        firstWord
      )}&image_type=photo`
    )
      .then(data => data.json())
      .then(images => {
        this.setState({
          images,
          breweryData,
          loading: false
        });
      });
  };

  componentDidMount = () => {
    this.getContent();
  };
  render() {
    if (this.state.loading === true) {
      return (
        <div className="lds-circle">
          <div></div>
        </div>
      );
    } else {
      return (
        <div className="container">
          <div className="col">
            <h1>Gallery of: {this.state.breweryData.name}</h1>
            <div className="row">
              {this.state.images.hits.map((image, index) => {
                return (
                  <div class="card col-3">
                    <img
                      className="image-fluid"
                      key={index}
                      src={image.webformatURL}
                      alt={image.tags}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
  }
}
