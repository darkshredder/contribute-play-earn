
import React, { Component } from "react";
import { HashRouter as Router, Switch, Route, Link } from "react-router-dom";
import Github from "./components/Github/Github";
import Home from "./components/Home/Home.js";
import Game from "./components/Game/Game.js";


export default class App1 extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/main">
            <Github />
          </Route>
          <Route exact path="/game">
            <Game />
          </Route>
        </Switch>
      </Router>
    );
  }
}