import React, { Component } from "react";
import myLoader from "./myLoader.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="loader-container">
        <div className="loader">
          <img src={myLoader} alt="Loading" />
        </div>
      </div>
    );
  }
}
