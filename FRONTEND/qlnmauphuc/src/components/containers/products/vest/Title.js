import { CssBaseline, Grid, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "40px !important",
  },
  mainTitle: {
    fontSize: "32px !important",
    fontWeight: "900 !important",
    // fontFamily: `neNikeCurrency,'FuturaW01-ExtraBoldCond 774896',Helvetica,Arial,sans-serif`,
    margin: "10px 0px !important",
    textAlign: "center",
  },
  subTitle: {
    color: "#999",
    fontStyle: "normal",
    letterSpacing: ".03em",
    wordSpacing: "-0.05em",
    fontFamily: `OneNikeCurrency,Helvetica,Arial,sans-serif !important`,
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&>li": {
      padding: 10,
      display: "inline-block",
    },
  },
  navitem: {
    color: "#888888",
    fontWeight: "bold",
    "&:hover": {
      color: "#000000",
      fontWeight: "bold",
    },
  },
}));

export default function Title() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <Grid container justifyContent="center">
        <Grid item xs={3}></Grid>
        <Grid item className={classes.title}>
          <Typography className={classes.mainTitle}>THỜI TRANG NAM</Typography>
          <Typography className={classes.subTitle}>
            Thiết kế áo vừa vặn, mang theo phong cách hiện đại và năng động,
            <br />
            các đường chỉ cắt may chi tiết tỉ mỉ đảm bảo về độ bền và chắc chắn
          </Typography>
          <ul className={classes.nav}>
            <li>
              <Typography className={classes.navitem}>Blazer</Typography>
            </li>
            <li>
              <Typography className={classes.navitem}>Suit</Typography>
            </li>
            <li>
              <Typography className={classes.navitem}>Tuxedo</Typography>
            </li>
          </ul>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </React.Fragment>
  );
}
