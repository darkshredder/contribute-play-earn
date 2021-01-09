import React, { Component } from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

export default class Home extends Component {
  render() {
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
          <a class="navbar-brand" href="#">
            Contribute Play Earn
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a
                  class="nav-link"
                  href="https://github.com/login/oauth/authorize?scope=repo,user:email&client_id=4c3a4a4089509b332cb6"
                >
                  <Button variant="contained" color="primary">
                    Github PR Collect
                  </Button>
                </a>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="/game">
                <Button variant="contained" color="secondary">
                    Game Collect
                  </Button>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
