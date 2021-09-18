import React, { useState } from "react";
import { Container, Grid, Typography, CssBaseline } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import SignIn from "./../../module/SignIn";
import SignUp from "./../../module/SignUp";
import { useSelector } from "react-redux";
import MenuAppBar from "./MenuAppBar";

const useStyles = makeStyles((theme) => ({
  topbar: {
    backgroundColor: "black",
  },
  titleColor: {
    fontSize: "14px",
    color: "#cccccc",
    "& span": {
      padding: '0px 5px',
    },
    "& span:hover": {
      color: "#ffffff",
    },
  },
}));

export default function TopBar() {
  const classes = useStyles();
  const [openSignUpForm, setOpenSignUpForm] = useState(false);
  const [openSignInForm, setOpenSignInForm] = useState(false);
  const handleClose = () => {
    setOpenSignUpForm(false);
    setOpenSignInForm(false);
  };

  const handleOpenSignUpForm = () => {
    setOpenSignUpForm(true);
  };

  const handleOpenSignInForm = () => {
    setOpenSignInForm(true);
  };

  const renderSignUpForm = () => {
    let xhtml = null;
    xhtml = (
      <SignUp open={openSignUpForm} onClose={() => handleClose()}></SignUp>
    );
    return xhtml;
  };

  const renderSignInForm = () => {
    let xhtml = null;
    xhtml = (
      <SignIn open={openSignInForm} onClose={() => handleClose()}></SignIn>
    );
    return xhtml;
  };

  const dangNhap = useSelector((state) => state.dangNhap);
  var { userInfo } = dangNhap;
  console.log(userInfo);
  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <div className={classes.topbar}>
        <Container>
          <Grid container spacing={1} justifyContent="space-between">
            <Grid item></Grid>
            <Grid item>
              {userInfo ? (
                <MenuAppBar></MenuAppBar>
              ) : (
                <Typography variant="subtitle1" className={classes.titleColor}>
                  Wellcome guest!
                  <span
                    onClick={handleOpenSignInForm}
                    className={classes.title}
                  >
                    Login
                  </span>
                  or
                  <span
                    onClick={handleOpenSignUpForm}
                    className={classes.title}
                  >
                    Register
                  </span>
                </Typography>
              )}
            </Grid>
          </Grid>
        </Container>
      </div>
      {renderSignUpForm()}
      {renderSignInForm()}
    </React.Fragment>
  );
}
