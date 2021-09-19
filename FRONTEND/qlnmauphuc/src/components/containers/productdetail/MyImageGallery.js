import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

class MyImageGallery extends Component {
  render() {
    const properties2 = {
      thumbnailPosition: "bottom",
      useBrowserFullscreen: true,
      showPlayButton: false,

      items: [
        {
          original: this.props.img1,
          thumbnail: this.props.img1,
        },
        {
          original:
            this.props.img2,
          thumbnail:
            this.props.img2,
        },
        {
          original:
            this.props.img3,
          thumbnail:
            this.props.img3,
        },
      ],
    };

    return (
        <ImageGallery {...properties2} onClick={this.openLightbox} />
   
    );
  }
}

export default MyImageGallery;
