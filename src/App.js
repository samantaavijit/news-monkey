import React, { Component } from "react";
import NavBar from "./components/NavBar";
import News from "./components/News";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoadingBar from "react-top-loading-bar";
import "./App.css";

export default class App extends Component {
  pageSize = 21;
  apiKey=process.env.REACT_APP_NEWS_API

  state = {
    progress:10
  }
  
  setProgress = (progress) => {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <NavBar />
          <LoadingBar color="#f11946" progress={this.state.progress}
            height={ 3}/>
          <Switch>
            <Route exact path="/">
              <News setProgress={this.setProgress.bind(this)} apiKey={this.apiKey} pageSize={this.pageSize} key="general" />
            </Route>
            <Route exact path="/business">
              <News setProgress={this.setProgress.bind(this)} apiKey={this.apiKey}
                pageSize={this.pageSize}
                key="business"
                country="in"
                category="business"
              />
            </Route>
            <Route exact path="/entertainment">
              <News setProgress={this.setProgress.bind(this)} apiKey={this.apiKey}
                pageSize={this.pageSize}
                key="entertainment"
                country="in"
                category="entertainment"
              />
            </Route>
            <Route exact path="/health">
              <News setProgress={this.setProgress.bind(this)} apiKey={this.apiKey}
                pageSize={this.pageSize}
                key="health"
                country="in"
                category="health"
              />
            </Route>
            <Route exact path="/science">
              <News setProgress={this.setProgress.bind(this)} apiKey={this.apiKey}
                pageSize={this.pageSize}
                key="science"
                country="in"
                category="science"
              />
            </Route>
            <Route exact path="/sports">
              <News setProgress={this.setProgress.bind(this)} apiKey={this.apiKey} pageSize={5} key="sports" country="in" category="sports" />
            </Route>
            <Route exact path="/technology">
              <News setProgress={this.setProgress.bind(this)} apiKey={this.apiKey}
                pageSize={this.pageSize}
                key="technology"
                country="in"
                category="technology"
              />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
