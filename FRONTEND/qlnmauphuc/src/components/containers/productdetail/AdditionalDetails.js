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
    fontWeight: 400,
    color: "#4fb1f6",
    display: "inline-block",
    padding: "0px 5px 0px 0px",
  },
  title: {
    fontWeight: "bold",
    color: "#777777",
  },
  center: {
    display: "block",
    justifyContent: "center",
    alignItems: "center",
  },
  picture: {
    padding: "10px 0px 10px 0px",
  },
  priceTable: {
    width: "80%",
  },
}));

export default function AdditionalDetails() {
  const classes = useStyles();
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
                <Typography className={classes.font}>Màu sắc:</Typography> Xanh
                than, cà phê, xám
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Chất liệu:</Typography>{" "}
                100% polyster
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>lớp lót:</Typography> 100%
                polysters
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Size:</Typography> L, M, S,
                XL, XXL, Yêu cầu may theo số đo
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
                <Typography className={classes.font}>Độ dày:</Typography> mỏng
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Độ mềm:</Typography> vừa
              </li>
              <li className={classes.star}>
                <Typography className={classes.font}>Co giãn:</Typography> không
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
              src="./images/bangsize.png"
              alt="Bảng size"
              className={`${classes.picture} ${classes.priceTable}`}
            ></img>
            <img
              src="https://188.com.vn/uploads/ao-vest-nam-a6521.jpg"
              alt="Ảnh sản phẩm"
              className={classes.picture}
            ></img>
            <img
              src="https://cbu01.alicdn.com/img/ibank/O1CN01PkM5Kh1FkUb9bGQ5n_!!2815000525-0-cib.jpg"
              alt="Ảnh sản phẩm"
              className={classes.picture}
            ></img>
            <img
              src="https://cbu01.alicdn.com/img/ibank/O1CN01rgWppy1FkUauQfYKM_!!2815000525-0-cib.jpg"
              alt="Ảnh sản phẩm"
              className={classes.picture}
            ></img>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
