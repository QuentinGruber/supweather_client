import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Home from "./routes/Home/Home";
import Landing from "./routes/Landing/Landing";
import Detail from "./routes/Detail/Detail";
require("dotenv").config();

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
      <Route path="/detail">
        <Detail />
      </Route>
    </Switch>
  </Router>,
  document.getElementById("root")
);
reportWebVitals();
