
import React from 'react'
import makeStyles from "@mui/styles/makeStyles";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Grid, Typography } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  bg: {
    margin: "20px 0px 0px 0px !important",
    backgroundColor: "#f8f8f8",
    padding: "30px 0px 30px 0px",
  },
  icon: {
    fontSize: "100px !important",
    margin: "0px auto",
  },
  box: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontFamily: `"Noto Serif", sans-serif !important`,
    fontWeight: "700 !important",
    fontSize: "20px !important",
  },
}));

export default function Content () {
  const classes = useStyles();
    return (
      <>
        <Grid container spacing={1} xs={12} className={classes.bg}>
          <Grid item xs={4}>
            <Grid container xs={12} className={classes.box}>
              <Grid item xs={12} className={classes.box}>
                <LocalShippingOutlinedIcon
                  className={classes.icon}
                ></LocalShippingOutlinedIcon>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" className={classes.title}>
                  GIAO HÀNG MIỄN PHÍ & TRẢ LẠI
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" className={classes.subtitle}>
                  Miễn phí vận chuyển
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container xs={12} className={classes.box}>
              <Grid item xs={12} className={classes.box}>
                <MonetizationOnOutlinedIcon
                  className={classes.icon}
                ></MonetizationOnOutlinedIcon>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" className={classes.title}>
                  ĐẢM BẢO LẠI TIỀN
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" className={classes.subtitle}>
                  Đảm bảo hoàn tiền trong 30 ngày
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Grid container xs={12} className={classes.box}>
              <Grid item xs={12} className={classes.box}>
                <LockOutlinedIcon className={classes.icon}></LockOutlinedIcon>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" className={classes.title}>
                  THANH TOÁN AN TOÀN
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography align="center" className={classes.subtitle}>
                  Tất cả các khoản thanh toán được bảo đảm
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </>
    );
}
