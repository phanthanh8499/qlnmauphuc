import React from "react";
import ReactImageMagnify from "react-image-magnify";
import { useSelector } from "react-redux";

function ImageMagnify(props) {
  // const cloth = useSelector((state) => state.cloth);
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
        // enlargedImagePortalId: "myPortal",
      }}
    />
  );
}

export default ImageMagnify;
