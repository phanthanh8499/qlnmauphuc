import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";
import { useSelector } from "react-redux";

function ImageMagnify(props) {
  const cloth = useSelector((state) => state.cloth);
  const { image } = props;
  const imgLoading = "./images/loadingImg.gif";
  const [img, setImg] = useState();
  useEffect(() => {
    image ? setImg(image) : setImg(imgLoading);
  }, [image]);
  // const image =
  //   "https://ivymoda.com/assets/files/news/2021/07/23/57c396b1466723e91eef5f7c96e6485e.jpg";
  return (
    <ReactImageMagnify
      {...{
        smallImage: {
          alt: "Wristwatch by Ted Baker London",
          isFluidWidth: true,
          src: img,
          width: 230,
          height: 152,
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
