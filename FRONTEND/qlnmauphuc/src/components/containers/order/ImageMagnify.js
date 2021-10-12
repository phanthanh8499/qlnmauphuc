import { Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactImageMagnify from "react-image-magnify";

function ImageMagnify(props) {
  const { image, quantity } = props;
  const imgLoading = "./images/loading.gif";
  const [img, setImg] = useState();

  useEffect(() => {
    image ? setImg(image) : setImg(imgLoading);
  }, [image]);

  const center = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px 0px 0px",
  };

  return (
    <>
      <ReactImageMagnify
        {...{
          smallImage: {
            alt: "Wristwatch by Ted Baker London",
            src: img,
            width: 170,
            height: 134,
          },
          largeImage: {
            src: img,
            width: 640,
            height: 480,
          },
        }}
      />
      {quantity === 0 ? (
        <></>
      ) : (
        <Grid container sx={center}>
          <Typography sx={{fontSize: 14}}>Còn lại: {quantity} (mét)</Typography>
        </Grid>
      )}
    </>
  );
}

export default ImageMagnify;
