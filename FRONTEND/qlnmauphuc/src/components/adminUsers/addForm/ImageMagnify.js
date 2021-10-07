import React from "react";
import ReactImageMagnify from "react-image-magnify";
import { useSelector } from "react-redux";

function ImageMagnify () {
  const cloth = useSelector(state => state.cloth);
  const { image } = cloth;
    return (
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            // isFluidWidth: true,
            src: image,
            width: 386,
            height: 211,
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
