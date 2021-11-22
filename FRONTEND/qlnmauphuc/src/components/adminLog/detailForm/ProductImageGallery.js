import React, { Component } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

class ProductImageGallery extends Component {
  render() {
    const image = this.props;
    const properties = {
      thumbnailPosition: "bottom",
      useBrowserFullscreen: true,
      showPlayButton: false,
      items: [
        {
          original: image.img1,
          thumbnail: image.img1,
        },
        {
          original: image.img2,
          thumbnail: image.img2,
        },
        {
          original: image.img3,
          thumbnail: image.img3,
        },
        {
          original: image.img4,
          thumbnail: image.img4,
        },
      ],
    };

    return (
        <ImageGallery {...properties} onClick={this.openLightbox} />
    );
  }
}

export default ProductImageGallery;
