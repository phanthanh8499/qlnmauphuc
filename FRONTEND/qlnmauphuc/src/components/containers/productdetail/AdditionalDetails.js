import { Button, Grid, Paper, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useState } from "react";
import clsx from "clsx";
import { Box } from "@mui/system";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 10px 20px 10px",
    margin: "10px 0px 10px 0px",
    border: "1px solid #d3d3d3",
    position: "relative",
  },
  rootHidden: {
    height: 480,
    overflow: "hidden",
  },
  star: {
    position: "relative",
    padding: "7px 0 7px 25px",
    margin: 0,
    borderBottom: "1px solid #ececec",
    fontFamily: `"Roboto", sans-serif`,
    lineHeight: 1.6,
    color: "#777777",
    fontSize: "16px",
    "&::before": {
      content: '"\\e005"!important',
      fontFamily: "fl-icons",
      left: 0,
      position: "absolute",
      fontSize: "16px",
      color: "#24abe5",
    },
  },
  font: {
    fontWeight: "400px !important",
    color: "#4fb1f6",
    display: "inline-block",
    padding: "0px 5px 0px 0px !important",
  },
  title: {
    fontWeight: "bold !important",
    color: "#777777",
  },
  center: {
    display: "block",
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    padding: "10px 0px 10px 0px !important",
  },
  priceTable: {
    width: "80%",
  },
  seeMore: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#fff",
    "&:before": {
      position: "absolute",
      content: '" "',
      left: 0,
      right: 0,
      bottom: "100%",
      height: 100,
      background:
        "linear-gradient(180deg, rgba(255, 255, 255, 0) 17%, #FFFFFF 93.12%)",
    },
  },
  seeMoreActive: {
    display: "none !important",
  },
}));

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function AdditionalDetails(props) {
  const classes = useStyles();
  const { data } = props;
  const [open, setOpen] = useState(true);

  return (
    <Grid
      container
      xs={12}
      component={Paper}
      className={clsx(classes.root, open && classes.rootHidden)}
    >
      <Grid
        item
        xs={12}
        sx={center}
        className={open ? null : classes.seeMoreActive}
      >
        <Box sx={center} className={classes.seeMore}>
          <Button
            variant="outlined"
            color="primary"
            onClick={(e) => setOpen(false)}
          >
            Xem th??m
          </Button>
        </Box>
      </Grid>
      <Grid item xs={2}>
        <Typography className={classes.title}>M?? T???</Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Th??ng tin s???n ph???m
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li className={classes.star}>
                <Typography className={classes.font}>M??u s???c:</Typography>{" "}
                {data[0].product_color}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Ch???t li???u:</Typography>{" "}
                {data[0].product_material}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>L???p l??t:</Typography>{" "}
                {data[0].product_lining}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Size:</Typography>{" "}
                {data[0].product_size}
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.title}>Ch??? s???</Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li className={classes.star}>
                <Typography className={classes.font}>????? d??y:</Typography>
                {data[0].product_thickness}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>????? m???m:</Typography>
                {data[0].product_softness}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Co gi??n:</Typography>{" "}
                {data[0].product_elasticity}
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.title}>H??nh ???nh</Typography>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <img
              src={data[0].product_sizeimage}
              alt="B???ng size"
              className={`${classes.picture} ${classes.priceTable}`}
            ></img>
            <img
              src={data[0].product_image1}
              alt="???nh s???n ph???m 1"
              className={classes.picture}
            ></img>
            <img
              src={data[0].product_image2}
              alt="???nh s???n ph???m 2"
              className={classes.picture}
            ></img>
            <img
              src={data[0].product_image3}
              alt="???nh s???n ph???m 3"
              className={classes.picture}
            ></img>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
