import React, { Component } from "react";
import myLoader from "./myLoader.gif";

export default class Spinner extends Component {
  render() {
    return (
      <div className="text-center">
        <img className="my-3" src={myLoader} alt="Loading" />
      </div>
    );
  }
}
