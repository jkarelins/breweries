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

  componentDidMount() {
    fetch("https://api.openbrewerydb.org/breweries")
      .then(data => data.json())
      .then(sorted => {
        sorted.map(brewerie => (brewerie.comments = []));
        return sorted;
      })
      .then(breweries => {
        this.fetchImages(breweries);
        this.setState({
          breweries,
          loading: false
        });
      })
      .catch(err =>
        this.setState({
          error: err,
          loading: false
        })
      );
  }
  fetchImages = breweries => {
    breweries.forEach(brewerie => {
      const firstWord = brewerie.name.replace(" ", "+").split(" ")[0];
      fetch(
        `https://pixabay.com/api/?key=15235209-ef7229ba5181d19e97e965940&q=${firstWord}&image_type=photo`
      )
        .then(data => data.json())
        .then(data => {
          if (data.total !== 0) {
            brewerie.image = data.hits[0].webformatURL;
          }
        })
        .catch(err => console.log(err));
    });
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
      console.log(this.state.breweries);
      return this.state.breweries.map(brewerie => {
        console.log(brewerie.image);
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
    return <div className="container">{this.renderContent()}</div>;
  }
}
