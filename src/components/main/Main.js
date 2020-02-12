import React, { Component } from "react";
import Advertisement from "../advertisement/Advertisement";

export default class Main extends Component {
  state = {
    loading: true,
    breweries: [],
    error: null,
    breweriesWithImg: []
  };
  sortByType = breweries => {
    return breweries.sort(function(a, b) {
      return a.brewery_type - b.brewery_type;
    });
  };
  componentDidMount() {
    fetch("https://api.openbrewerydb.org/breweries")
      .then(data => data.json())
      .then(data => this.sortByType(data))
      .then(sorted =>
        this.setState({
          breweries: sorted,
          loading: false
        })
      )
      .then(wow => {
        this.fetchImages();
      })
      .catch(err =>
        this.setState({
          error: err,
          loading: false
        })
      );
  }
  fetchImages() {
    const breweriesWithImg = [];
    this.state.breweries.map(({ name }, index) => {
      const firstWord = name.replace(" ", "+").split(" ")[0];
      fetch(
        `https://pixabay.com/api/?key=15235209-ef7229ba5181d19e97e965940&q=${firstWord}&image_type=photo`
      )
        .then(data => data.json())
        .then(data => {
          if (data.total !== 0) {
            breweriesWithImg[index] = data.hits[0].webformatURL;
          } else {
            breweriesWithImg[index] = null;
          }
        })
        .catch(err => console.log(err));
    });
    this.setState({ breweriesWithImg: breweriesWithImg });
    // console.log(this.state.breweriesWithImg);
  }
  renderContent() {
    if (this.state.loading) {
      return `<h1>Loading...</h1>`;
    } else if (this.state.error) {
      return `<h1>{this.state.error}</h1>`;
    } else {
      console.log(this.state.breweriesWithImg);
      return this.state.breweries.map((brewerie, index) => (
        <Advertisement
          name={brewerie.name}
          key={brewerie.id}
          brType={brewerie.brewery_type}
          street={brewerie.street}
          city={brewerie.city}
          state={brewerie.state}
          postCode={brewerie.postal_code}
          country={brewerie.country}
          phone={brewerie.phone}
          web={brewerie.website_url}
          update={brewerie.updated_at}
          imageUrl={this.state.breweriesWithImg[index]}
        />
      ));
    }
  }
  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}
