import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

export default class App extends Component {
  pageSize = 21;
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <News pageSize={this.pageSize} key="general" />
            </Route>
            <Route exact path="/business">
              <News pageSize={this.pageSize} key="business" country="in" category="business" />
            </Route>
            <Route exact path="/entertainment">
              <News pageSize={this.pageSize} key="entertainment" country="in" category="entertainment" />
            </Route>
            <Route exact path="/health">
              <News pageSize={this.pageSize} key="health" country="in" category="health" />
            </Route>
            <Route exact path="/science">
              <News pageSize={this.pageSize} key="science" country="in" category="science" />
            </Route>
            <Route exact path="/sports">
              <News pageSize={5 } key="sports" country="in" category="sports" />
            </Route>
            <Route exact path="/technology">
              <News pageSize={this.pageSize} key="technology" country="in" category="technology" />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
