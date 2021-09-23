import { Breadcrumbs, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { makeStyles } from '@mui/styles';
import ListModule from './ListModule';
import Header from '../header/Header';
import Footer from '../footer/Footer';

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
                <Typography color="primary">bccc</Typography>
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
