import { Breadcrumbs, Grid, Link, Paper, Typography, Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from "react";
import Order from "../order/Order";
import MyImageGallery from "./MyImageGallery";

const useStyles = makeStyles((theme) => ({
  mainDetail: {
    marginBottom: "20px !important",
  },
  font: {
    fontWeight: "300px !important",
    fontSize: "23px !important",
    fontFamily: `"Roboto", sans-serif !important`,
    color: "#555",
    display: "block",
  },
  divider: {
    height: "3px !important",
    display: "block",
    backgroundColor: "#00001a",
    margin: "10px 0px !important",
    width: "100%",
    maxWidth: "40%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "& a:hover": {
      color: "#000000",
    },
  },
  productTitle: {
    margin: "10px 0px 40px 0px !important",
  },
  price: {
    color: "#111",
    fontWeight: "700px !important",
    fontSize: "20px !important",
  },
  title: {
    fontWeight: "400px !important",
    fontFamily: `"Roboto", sans-serif !important`,
    fontSize: "25px !important",
    color: "#555",
  },
  titleColor: {
    fontWeight: "400px !important",
    fontFamily: `"Roboto", sans-serif !important`,
    fontSize: "20px !important",
    color: "#555",
  },
  productBox: {
    padding: "20px 20px 20px 20px !important",
    borderRadius: "10px !important",
    border: "1px solid #d3d3d3",
  },
  star: {
    position: "relative",
    padding: "7px 0 7px 25px",
    margin: 0,
    borderBottom: "1px solid #ececec !important",
    fontFamily: `"Roboto", sans-serif !important`,
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
  order: {
    "&:hover::before": {
      left: "0%",
      width: "100%",
      opacity: 1,
    },
    "&::before": {
      content: '""',
      height: "2px",
      backgroundColor: "currentColor",
      opacity: ".3",
      "-webkit-transition": "all .3s",
      "-o-transition": "all .3s",
      transition: "all .3s",
      position: "absolute",
      bottom: 0,
      left: "20%",
      width: "60%",
    },
  },
  btnOrder: {
    width: "40%",
    border: "0px solid !important",
    borderBottom: "1px solid !important",
    transition: "width 2s !important",
    "&:hover": {
      border: "0px solid",
      borderBottom: "1px solid",
      width: "100%",
    },
  },
  
}));
export default function MainDetail(props) {
  const classes = useStyles();
  const [mau, setMau] = useState(0);
  const { data } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log("main", data)
  const choose = (abc) => {
    setMau(abc);
  };
  const renderBreadCrumbs = () => {
    if (
      data[0].product_typeid === "BFM" ||
      data[0].product_typeid === "SFM" ||
      data[0].product_typeid === "TFM" ||
      data[0].product_typeid === "GFM"
    ) {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/home">
            Trang chủ
          </Link>
          <Link color="inherit" href="/">
            Thời trang Nam
          </Link>
          <Typography color="textPrimary">{data[0].pt_name}</Typography>
        </Breadcrumbs>
      );
    } else {
      return (
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/home">
            Trang chủ
          </Link>
          <Link color="inherit" href="/">
            Thời trang Nữ
          </Link>
          <Typography color="textPrimary">{data[0].pt_name}</Typography>
        </Breadcrumbs>
      );
    }
  }

  const renderModalOrder = () => {
    if(open){
      return (<Order open={open} onClose={handleClose} productData={data[0]}></Order>)
    }
  }

  return (
    <>
      <Grid container className={classes.mainDetail}>
        <Grid
          container
          justifyContent="center"
          className={classes.productTitle}
        >
          <Grid item xs={12} className={classes.center}>
            <Typography className={classes.font}>
              {data[0].product_name} - {data[0].product_code}
            </Typography>
          </Grid>
          <div className={classes.divider}></div>
          <Grid item xs={12} className={classes.center}>
            {renderBreadCrumbs()}
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <MyImageGallery
              img1={data[0].product_image1}
              img2={data[0].product_image2}
              img3={data[0].product_image3}
            ></MyImageGallery>
          </Grid>
          <Grid item xs={6} component={Paper} className={classes.productBox}>
            <Grid container xs={12}>
              <Grid item xs={12}>
                <Typography className={classes.price}>
                  {data[0].product_price.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.title}>
                  {data[0].product_name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ul>
                  <li className={classes.star}>
                    {data[0].product_introduction1}
                  </li>
                  <li className={classes.star}>
                    {data[0].product_introduction2}
                  </li>
                  <li className={classes.star}>
                    {data[0].product_introduction3}
                  </li>
                  <li className={classes.star}>
                    {data[0].product_introduction4}
                  </li>
                  <li className={classes.star}>
                    {data[0].product_introduction5}
                  </li>
                </ul>
              </Grid>

              <Grid item xs={12} className={classes.center}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btnOrder}
                  onClick={handleOpen}
                >
                  Đặt may
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      {renderModalOrder()}
    </>
  );
}
