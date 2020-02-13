import React, { Component } from "react";
import Advertisement from "../advertisement/Advertisement";

export default class Main extends Component {
  state = {
    loading: true,
    breweries: [],
    error: null
  };

  sortByType = breweries => {
    return breweries.sort(function(a, b) {
      return a.brewery_type - b.brewery_type;
    });
  };

  async componentDidMount() {
    const response = await fetch("https://api.openbrewerydb.org/breweries");
    const data = await response.json();
    const sorted = data.map(brewerie => ({ ...brewerie, comments: [] }));
    await this.fetchImages(sorted);
  }

  fetchImages = async breweries => {
    const promises = breweries.map(brewerie => {
      const firstWord = brewerie.name.replace(/" "/g, "+").split(" ")[0];

      return fetch(
        `https://pixabay.com/api/?key=15235209-ef7229ba5181d19e97e965940&q=${encodeURIComponent(
          firstWord
        )}&image_type=photo`
      )
        .then(data => data.json())
        .then(data => {
          if (data.total !== 0) {
            return { ...brewerie, image: data.hits[0].webformatURL };
          }

          return brewerie;
        })
        .catch(err => console.log(err));
    });

    const newBreweries = await Promise.all(promises);

    this.setState({ breweries: newBreweries, loading: false });
  };

  addComment = commentInfo => {
    this.state.breweries.forEach(brewerie => {
      if (brewerie.id === commentInfo.id) {
        brewerie.comments.push({ comment: commentInfo.comment });
      }
    });
  };

  renderContent() {
    if (this.state.loading) {
      return `<h1>Loading...</h1>`;
    } else if (this.state.error) {
      return `<h1>{this.state.error}</h1>`;
    } else {
      return this.state.breweries.map(brewerie => {
        return (
          <Advertisement
            name={brewerie.name}
            key={brewerie.id}
            id={brewerie.id}
            brType={brewerie.brewery_type}
            street={brewerie.street}
            city={brewerie.city}
            state={brewerie.state}
            postCode={brewerie.postal_code}
            country={brewerie.country}
            phone={brewerie.phone}
            web={brewerie.website_url}
            update={brewerie.updated_at}
            image={brewerie.image}
            addComment={this.addComment}
            comments={brewerie.comments}
          />
        );
      });
    }
  }

  render() {
    return <div className="">{this.renderContent()}</div>;
  }
}
