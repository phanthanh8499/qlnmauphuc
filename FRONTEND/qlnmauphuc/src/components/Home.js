import React, { Component } from "react";
import Vest from "./containers/products/vest/Vest";
import VestNu from "./containers/products/vestnu/VestNu";
import SlideShow from "./containers/slideshow/SlideShow";
import Content from "./containers/content/Content";

export default class Home extends Component {
  render() {
    return (
      <>
        <SlideShow></SlideShow>
        <Vest></Vest>
        <VestNu></VestNu>
        <Content></Content>
      </>
    );
  }
}
