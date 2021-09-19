import { Breadcrumbs, Grid, Link, Paper, Typography, Button } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from "react";
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
    fontSize: "35px !important",
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
  colorChoose: {
    "& li": {
      display: "inline-block",
    },
  },
  iconColor1: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#ffffff",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor2: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#000000",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor3: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#666666",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor4: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#fcff01",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor5: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#ff8d00",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor6: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#ff0000",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor7: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#008000",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor8: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#0059c9",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  iconColor9: {
    padding: "5px 5px 5px 0px",
    "& a::before": {
      content: '""',
      display: "inline-block",
      width: 40,
      height: 40,
      borderRadius: "50%",
      backgroundColor: "#7f00ff",
      border: "1px solid #000000",
    },
    "& a:hover::before": {
      border: "1px solid #ff8d00",
    },
  },
  active: {
    "& a::before": {
      border: "1px solid #ff8d00",
    },
  },
}));
export default function MainDetail() {
  const classes = useStyles();
  const [mau, setMau] = useState(0);

  useEffect(() => {
    const color1 = document.getElementById("color1");
    const color2 = document.getElementById("color2");
    const color3 = document.getElementById("color3");
    const color4 = document.getElementById("color4");
    const color5 = document.getElementById("color5");
    const color6 = document.getElementById("color6");
    const color7 = document.getElementById("color7");
    const color8 = document.getElementById("color8");
    const color9 = document.getElementById("color9");
    for (var i = 1; i <= 9; i++) {
      const name = document.getElementById(`color${i}`);
      name.classList.remove(classes.active);
    }
    if (mau === 1) {
      color1.classList.add(classes.active);
    }
    if (mau === 2) {
      color2.classList.add(classes.active);
    }
    if (mau === 3) {
      color3.classList.add(classes.active);
    }
    if (mau === 4) {
      color4.classList.add(classes.active);
    }
    if (mau === 5) {
      color5.classList.add(classes.active);
    }
    if (mau === 6) {
      color6.classList.add(classes.active);
    }
    if (mau === 7) {
      color7.classList.add(classes.active);
    }
    if (mau === 8) {
      color8.classList.add(classes.active);
    }
    if (mau === 9) {
      color9.classList.add(classes.active);
    }
  });
  const choose = (abc) => {
    setMau(abc);
  };
  return (
    <>
      <Grid container className={classes.mainDetail}>
        <Grid
          container
          justifyContent="center"
          className={classes.productTitle}
        >
          <Grid item xs={12} className={classes.center}>
            <Typography className={classes.font}>ÁO VEST – F1000AT</Typography>
          </Grid>
          <div className={classes.divider}></div>
          <Grid item xs={12} className={classes.center}>
            <Breadcrumbs aria-label="breadcrumb">
              <Link color="inherit" href="/">
                Trang chủ
              </Link>
              <Link color="inherit" href="/getting-started/installation/">
                Thời trang Nam
              </Link>
              <Typography color="textPrimary">ÁO VEST – F1000AT</Typography>
            </Breadcrumbs>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <MyImageGallery></MyImageGallery>
          </Grid>
          <Grid item xs={6} component={Paper} className={classes.productBox}>
            <Grid container xs={12}>
              <Grid item xs={12}>
                <Typography className={classes.price}>1.000.000 đ</Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.title}>
                  Áo Vest - F1000AT
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <ul>
                  <li className={classes.star}>Mẫu thời trang mới.</li>
                  <li className={classes.star}>
                    Kiểu thiết kế nam tính, lịch lãm.
                  </li>
                  <li className={classes.star}>
                    Form áo vừa vặn, mềm mại, mặc thoải mái.
                  </li>
                  <li className={classes.star}>
                    Phong cách thời trang Châu Âu hiện đại
                  </li>
                  <li className={classes.star}>
                    Linh hoạt trong kết hợp với các loại trang phục
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12}>
                <Grid container xs={12}>
                  <Grid item xs={12} className={classes.center}>
                    <Typography className={classes.titleColor}>
                      Màu sắc
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.center}>
                    <ul className={classes.colorChoose}>
                      <li
                        className={classes.iconColor1}
                        id="color1"
                        onClick={() => choose(1)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor2}
                        id="color2"
                        onClick={() => choose(2)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor3}
                        id="color3"
                        onClick={() => choose(3)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor4}
                        id="color4"
                        onClick={() => choose(4)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor5}
                        id="color5"
                        onClick={() => choose(5)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor6}
                        id="color6"
                        onClick={() => choose(6)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor7}
                        id="color7"
                        onClick={() => choose(7)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor8}
                        id="color8"
                        onClick={() => choose(8)}
                      >
                        <Link></Link>
                      </li>
                      <li
                        className={classes.iconColor9}
                        id="color9"
                        onClick={() => choose(9)}
                      >
                        <Link></Link>
                      </li>
                    </ul>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} className={classes.center}>
                <Button
                  variant="outlined"
                  color="primary"
                  className={classes.btnOrder}
                >
                  Đặt may
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
