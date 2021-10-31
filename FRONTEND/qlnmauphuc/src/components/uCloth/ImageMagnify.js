import React from "react";
import ReactImageMagnify from "react-image-magnify";

function ImageMagnify(props) {
  const { image, name } = props;
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: name,
          // isFluidWidth: true,
          src: image,
          width: 134,
          height: 134,
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
