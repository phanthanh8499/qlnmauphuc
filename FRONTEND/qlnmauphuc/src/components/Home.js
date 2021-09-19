import React, { Component } from "react";
import SlideShow from "./containers/slideshow/SlideShow";
import Content from "./containers/content/Content";
import Product from "./containers/products/Product";

export default class Home extends Component {
  render() {
    return (
      <>
        <SlideShow></SlideShow>
        <Product></Product>
        <Content></Content>
      </>
    );
  }
}
