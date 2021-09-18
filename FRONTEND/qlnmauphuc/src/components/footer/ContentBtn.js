import { Button, Grid, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 0px 30px 0px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: "#000",
    padding: 0,
    minWidth: 45,
    border: "1px solid #fff",
    height: 40,
    color: "#fff",
    transition: 'all 0.5s',
    margin: '0px 5px 0px 0px',
    "&:hover": {
      border: "1px solid #000",
      backgroundColor: "#fff",
      color: '#000'
    },
  },
}));

export default function ContentBtn() {
  const classes = useStyles();
  return (
    <Grid container xs={12} className={classes.root}>
      <Button variant="contained" color="light" className={classes.btn}>
        <i className="fab fa-facebook-f" />
      </Button>
      <Button variant="contained" color="light" className={classes.btn}>
        <i className="fab fa-twitter" />
      </Button>
      <Button variant="contained" color="light" className={classes.btn}>
        <i className="fab fa-google" />
      </Button>
      <Button variant="contained" color="light" className={classes.btn}>
        <i className="fab fa-instagram" />
      </Button>
      <Button variant="contained" color="light" className={classes.btn}>
        <i className="fab fa-linkedin-in" />
      </Button>
      <Button variant="contained" color="light" className={classes.btn}>
        <i className="fab fa-github" />
      </Button>
    </Grid>
  );
}
