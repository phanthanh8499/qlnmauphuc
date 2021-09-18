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
          original: "https://188.com.vn/uploads/ao-vest-nam-a6521.jpg",
          thumbnail: "https://188.com.vn/uploads/ao-vest-nam-a6521.jpg",
        },
        {
          original:
            "https://cbu01.alicdn.com/img/ibank/O1CN01PkM5Kh1FkUb9bGQ5n_!!2815000525-0-cib.jpg",
          thumbnail:
            "https://cbu01.alicdn.com/img/ibank/O1CN01PkM5Kh1FkUb9bGQ5n_!!2815000525-0-cib.jpg",
        },
        {
          original:
            "https://cbu01.alicdn.com/img/ibank/O1CN01rgWppy1FkUauQfYKM_!!2815000525-0-cib.jpg",
          thumbnail:
            "https://cbu01.alicdn.com/img/ibank/O1CN01rgWppy1FkUauQfYKM_!!2815000525-0-cib.jpg",
        },
      ],
    };

    return (
        <ImageGallery {...properties2} onClick={this.openLightbox} />
   
    );
  }
}

export default MyImageGallery;
