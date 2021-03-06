import React from "react";
import "./App.css";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Search from "./components/search/Search";
import Footer from "./components/footer/Footer";
import SingleBrewery from "./components/singlebrew/SingleBrew";
import { Route } from "react-router-dom";
import Gallery from "./components/singlebrew/Gallery";

function App() {
  return (
    <div className="App">
      <Header />
      <Route exact path="/" component={Main} />
      <Route exact path="/search/:searchfor" component={Search} />
      <Route exact path="/brewery/:id" component={SingleBrewery} />
      <Route exact path="/gallery/:id" component={Gallery} />
      <Footer />
    </div>
  );
}

export default App;
