import { Breadcrumbs, Container, Grid, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from '@mui/styles';
import ListModule from './ListModule';
import Header from '../header/Header';
import Footer from '../footer/Footer';
import { useLocation } from "react-router";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  box: {
    margin: "10px 0px !important",
  },
  breadcrumb: {
    padding: 10,
  },
  listModule: {
    margin: "10px 0px !important",
  },
}));

export default function AccountLayout (props){
  const classes = useStyles();
  let { pathname } = useLocation();
  const [title, setTitle] = useState("");
  
  useEffect(() => {
    function getTitle() {
      if (pathname === "/account/orders") {
        setTitle("Danh sách đơn hàng");
      } else if (pathname === "/account/profile") {
        setTitle("Thông tin cá nhân");
      } else if (pathname === "/account/cloth") {
        setTitle("Quản lý vải");
      } else if (pathname === "/account") {
        setTitle("");
      } else if (pathname === "/account/measurements") {
        setTitle("Số hiệu đăng ký");
      } else if (pathname === "/account/measurements-add") {
        setTitle("Thêm số hiệu đăng ký");
      } else if (pathname === "/account/giftvoucher") {
        setTitle("Danh sách quà tặng");
      } else {
        setTitle("Sửa số hiệu đăng ký");
      }
    }
    getTitle();
  }, [pathname]);
    return (
      <>
        <Header></Header>
        <Container className={classes.root}>
          <Grid container className={classes.box}>
            <Grid item xs={12} component={Paper} className={classes.breadcrumb}>
              <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link color="inherit" to="/account">
                  Trang cá nhân
                </Link>
                <Typography color="primary">{title}</Typography>
              </Breadcrumbs>
            </Grid>

            <Grid item xs={9} components={Paper} className={classes.box}>
              <>{props.children}</>
            </Grid>
            <Grid item xs={3} component={Paper} className={classes.box}>
              <ListModule></ListModule>
            </Grid>
          </Grid>
        </Container>
        <Footer></Footer>
      </>
    );
}
