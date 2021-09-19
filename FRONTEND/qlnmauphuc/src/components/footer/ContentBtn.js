
import { Button, Grid, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "30px 0px 30px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: "#000 !important",
    padding: 0,
    minWidth: "45px !important",
    border: "1px solid #fff !important",
    height: 40,
    color: "#fff",
    transition: "all 0.5s",
    margin: "0px 5px 0px 0px !important",
    "&:hover": {
      border: "1px solid #000 !important",
      backgroundColor: "#fff !important",
      color: "#000 !important",
    },
  },
}));

export default function ContentBtn() {
  const classes = useStyles();
  return (
    <Grid container xs={12} className={classes.root}>
      <Button variant="contained" className={classes.btn}>
        <i className="fab fa-facebook-f" />
      </Button>
      <Button variant="contained" className={classes.btn}>
        <i className="fab fa-twitter" />
      </Button>
      <Button variant="contained" className={classes.btn}>
        <i className="fab fa-google" />
      </Button>
      <Button variant="contained" className={classes.btn}>
        <i className="fab fa-instagram" />
      </Button>
      <Button variant="contained" className={classes.btn}>
        <i className="fab fa-linkedin-in" />
      </Button>
      <Button variant="contained" className={classes.btn}>
        <i className="fab fa-github" />
      </Button>
    </Grid>
  );
}
