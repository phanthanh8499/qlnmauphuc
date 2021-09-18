import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import ProductDetail from "../components/containers/productdetail/ProductDetail";
import Home from "../components/Home";

class RouterURL extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/dt" component={ProductDetail}></Route>   
      </Switch>
    );
  }
}

export default RouterURL;
