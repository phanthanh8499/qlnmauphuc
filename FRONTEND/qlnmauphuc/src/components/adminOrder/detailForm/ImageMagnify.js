import React from "react";
import ReactImageMagnify from "react-image-magnify";

function ImageMagnify(props) {
  const { image } = props;

  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: "Wristwatch by Ted Baker London",
          src: image,
          width: 132,
          height: 132,
        },
        largeImage: {
          src: image,
          width: 640,
          height: 480,
        },
      }}
    />
  );
}

export default ImageMagnify;
