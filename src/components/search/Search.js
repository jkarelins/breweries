import React, { Component } from "react";
import Advertisement from "../advertisement/Advertisement";
import "./Search.css";

export default class Main extends Component {
  state = {
    loading: true,
    breweries: [],
    error: null
  };

  componentDidMount() {
    this.getData();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps !== this.props) {
      this.setState({ loading: true });
      this.getData();
    }
  };

  getData = async () => {
    const searchfor = this.props.match.params.searchfor;
    const response = await fetch(
      `https://api.openbrewerydb.org/breweries/search?query=${encodeURIComponent(
        searchfor
      )}`
    );
    const data = await response.json();
    const sorted = data.map(brewerie => ({
      ...brewerie,
      comments: [],
      likes: 0
    }));
    await this.fetchImages(sorted);
  };

  fetchImages = async breweries => {
    const promises = breweries.map(brewerie => {
      const firstWord = `beer+${brewerie.name.split(" ")[1]}`;

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

  increment = likeInfo => {
    const updatedBreweries = this.state.breweries.map(brewerie => {
      if (brewerie.id === likeInfo) {
        brewerie.likes = brewerie.likes + 1;
      }
      return brewerie;
    });
    this.setState({
      breweries: updatedBreweries
    });
  };

  renderContent() {
    const sortedBreweries = this.state.breweries.sort(
      (a, b) => b.likes - a.likes
    );
    console.log(sortedBreweries);

    if (this.state.loading) {
      return (
        <div className="lds-circle">
          <div></div>
        </div>
      );
    } else if (this.state.error) {
      return <h1 className="text-danger">{this.state.error}</h1>;
    } else {
      if (sortedBreweries.length === 0) {
        return <h1 className="text-danger">Sorry, nothing was found.</h1>;
      } else {
        return sortedBreweries.map(brewerie => {
          return (
            <Advertisement
              likes={brewerie.likes}
              newLike={this.increment}
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
  }

  render() {
    return <div className="">{this.renderContent()}</div>;
  }
}
