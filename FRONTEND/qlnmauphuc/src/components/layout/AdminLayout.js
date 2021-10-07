import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CssBaseline,
  Toolbar,
  Typography,
  Box,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import AAppBar from "../adminAppBar/AAppBar";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  content: {
    flexGrow: 1,
    height: "90vh",
    overflow: "auto",
    padding: "10px",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "10px 0px",
    flexDirection: "column",
  },
  lagre: {
    width: 55,
    height: 55,
  },
  avatarTitle: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 500,
    fontSize: "16px",
    lineHeight: 1.334,
    letterSpacing: "-0.05px",
    color: "#172b4d",
  },
  avatarClose: {
    display: "none",
  },
  avatarSubTitle: {
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: 400,
    fontSize: "0.875rem",
    lineHeight: 1.43,
    letterSpacing: "0.01071em",
    color: "#6b778c",
  },
  // appBarSpacer: theme.mixins.toolbar,
}));

export default function AdminLayout(props) {
  const classes = useStyles();
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AAppBar></AAppBar>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          overflow: "auto",
        }}
      >
        <Toolbar />
        <main className={classes.content}>
          {props.children}
        </main>
      </Box>
    </Box>
  );
}
