import { CssBaseline, Grid, Container, IconButton } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "#fefcfc",
    borderBottom: "1px solid #E5E5E5",
  },
  navigation: {
    margin: "25px",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    height: 100,
    margin: "0px auto",
  },
  logoimg: {
    height: 95,
  },
  icon: {
    margin: 25,
    padding: "0px 10px",
  },
  sticky: {
    top: 0,
    position: "fixed",
    left: 0,
    right: 0,
    margin: "0 auto",
    boxShadow: "1px 1px 10px rgb(0 0 0 / 15%)",
    zIndex: 9999,
    opacity: 0.9,
    animation: "stuckMoveDown .6s",
  },
  nav: {
    display: 'flex',
  },
  navItem: {
    display: 'inline-block',
    padding: '10px',
    "& a:hover": {
      fontWeight: 'bold',
      color: '#000000',
    },
  }
}));

export default function BotBar() {
  const classes = useStyles();
  // useEffect(() => {
  //   const header = document.getElementById("header");
  //   const sticky = header.offsetTop;

  //   const scrollHandler = () => {
  //     if (window.pageYOffset > sticky) {
  //       header.classList.add(classes.sticky);
  //     } else {
  //       header.classList.remove(classes.sticky);
  //     }
  //   };
  //   window.addEventListener("scroll", scrollHandler);

  //   return () => {
  //     window.removeEventListener("scroll", scrollHandler);
  //   };
  // }, [classes]);
  
  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <div className={classes.bg} id="header">
        <Container>
          <Grid container spacing={1} className={classes.menu}>
            <Grid item xs={3}>
              <img
                src="./images/logo.png"
                alt="logo"
                className={classes.logoimg}
              ></img>
            </Grid>
            <Grid item xs={7} className={classes.navigation}>
              <ul className={classes.nav}>
                <li className={classes.navItem}>
                  <NavLink
                    to="/home"
                    className="nav-link"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    Trang chủ
                  </NavLink>
                </li>
                <li className={classes.navItem}>
                  <NavLink
                    to="/polices"
                    className="nav-link"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    Chính sách
                  </NavLink>
                </li>
                <li className={classes.navItem}>
                  <NavLink
                    to="/contacts"
                    className="nav-link"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    Liên hệ
                  </NavLink>
                </li>
                <li className={classes.navItem}>
                  <NavLink
                    to="/contacts"
                    className="nav-link"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                  >
                    Danh mục
                  </NavLink>
                </li>
              </ul>
            </Grid>
            <Grid item  className={classes.icon} justifyContent='flex-end'>
              <IconButton size="large">
                <ShoppingBasketIcon
                  className={classes.buttonIcon}
                ></ShoppingBasketIcon>
              </IconButton>
              <IconButton size="large">
                <SearchIcon className={classes.buttonIcon}></SearchIcon>
              </IconButton>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
