import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./../products/Products";

export default class RouterURL extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/admin/products" component={Products}></Route>
      </Switch>
    );
  }
}
