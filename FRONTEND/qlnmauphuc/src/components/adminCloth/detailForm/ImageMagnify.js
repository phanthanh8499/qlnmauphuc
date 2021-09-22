import React from "react";
import ReactImageMagnify from "react-image-magnify";

function ImageMagnify(props) {
  const { img } = props;
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: "Wristwatch by Ted Baker London",
          // isFluidWidth: true,
          src: img,
          width: 386,
          height: 211,
        },
        largeImage: {
          src: img,
          width: 640,
          height: 480,
        },
        // enlargedImagePortalId: "myPortal",
      }}
    />
  );
}

export default ImageMagnify;
