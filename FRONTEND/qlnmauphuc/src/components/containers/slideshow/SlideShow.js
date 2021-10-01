import makeStyles from '@mui/styles/makeStyles';
import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const useStyles = makeStyles(() => ({
  bannerImg: {},
}));

export default function SlideShow() {
  const [index, setIndex] = useState(0);
  const classes = useStyles();
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel autoPlay showThumbs={false} showStatus={false}>
      <div>
        <img alt="" src="./images/banner/banner-ao-vest-1024x361.jpg" />
      </div>
      <div>
        <img alt="" src="./images/banner/banner-ao-vest-1024x361.jpg" />
      </div>
      <div>
        <img alt="" src="./images/banner/banner-ao-vest-1024x361.jpg" />
      </div>
    </Carousel>
  );
}
