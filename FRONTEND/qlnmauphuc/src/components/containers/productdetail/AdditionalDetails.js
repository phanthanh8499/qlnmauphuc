import { Grid, Paper, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "20px 10px 20px 10px",
    margin: "10px 0px 10px 0px",
    border: "1px solid #d3d3d3",
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
}));

export default function AdditionalDetails(props) {
  const classes = useStyles();
  const {data} = props;
  return (
    <Grid container xs={12} component={Paper} className={classes.root}>
      <Grid item xs={2}>
        <Typography className={classes.title}>MÔ TẢ</Typography>
      </Grid>
      <Grid item xs={10}>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.title}>
              Thông tin sản phẩm
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li className={classes.star}>
                <Typography className={classes.font}>Màu sắc:</Typography>{" "}
                {data[0].product_color}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Chất liệu:</Typography>{" "}
                {data[0].product_material}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Lớp lót:</Typography>{" "}
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
            <Typography className={classes.title}>Chỉ số</Typography>
          </Grid>
          <Grid item xs={12}>
            <ul>
              <li className={classes.star}>
                <Typography className={classes.font}>Độ dày:</Typography>
                {data[0].product_thickness}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Độ mềm:</Typography>
                {data[0].product_softness}
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Co giãn:</Typography>{" "}
                {data[0].product_elasticity}
              </li>
            </ul>
          </Grid>
        </Grid>
        <Grid container xs={12}>
          <Grid item xs={12}>
            <Typography className={classes.title}>Hình ảnh</Typography>
          </Grid>
          <Grid item xs={12} className={classes.center}>
            <img
              src={data[0].product_sizeimage}
              alt="Bảng size"
              className={`${classes.picture} ${classes.priceTable}`}
            ></img>
            <img
              src={data[0].product_image1}
              alt="Ảnh sản phẩm 1"
              className={classes.picture}
            ></img>
            <img
              src={data[0].product_image2}
              alt="Ảnh sản phẩm 2"
              className={classes.picture}
            ></img>
            <img
              src={data[0].product_image3}
              alt="Ảnh sản phẩm 3"
              className={classes.picture}
            ></img>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
