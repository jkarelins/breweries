import React, { Component } from "react";
import Advertisement from "../advertisement/Advertisement";

export default class Main extends Component {
  state = {
    loading: true,
    breweries: [],
    error: null
  };
  componentDidMount() {
    fetch("https://api.openbrewerydb.org/breweries")
      .then(data => data.json())
      .then(data => {
        this.setState({
          breweries: data,
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
  renderContent() {
    if (this.state.loading) {
      return `<h1>Loading...</h1>`;
    } else if (this.state.error) {
      return `<h1>{this.state.error}</h1>`;
    } else {
      return this.state.breweries.map(brewerie => (
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
        />
      ));
    }
  }
  render() {
    return <div className="container">{this.renderContent()}</div>;
  }
}
