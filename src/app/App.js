import React, { Component } from "react";
import { hot } from "react-hot-loader";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      darkMode: false
    };
    this.appName = 'Image Annotator Studio';
    // this.handleChange = this.handleChange.bind(this);
  }

  getImages() {
    const imgAssetSrc = '.'
  }

  render() {
    return (
      <div className="app">
        <h1>App (h1)</h1>
        <h2>{ this.appName }</h2>
        <img src="assets/data/1.jpg"></img>
      </div>
    );
  }
}

export default hot(module)(App);
