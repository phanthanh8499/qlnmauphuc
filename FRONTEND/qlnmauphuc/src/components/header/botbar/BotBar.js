import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  MenuItem,
  Link,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import { LOCAL_PATH } from "../../../constants/Constants";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "#fefcfc",
    borderBottom: "1px solid #E5E5E5",
  },
  navigation: {
    margin: "25px !important",
    justifyContent: "center",
    alignItems: "center",
  },
  menu: {
    height: "100px !important",
    margin: "0px auto !important",
  },
  logoimg: {
    height: 95,
  },
  icon: {
    margin: "25px 0px !important",
    padding: "0px 10px !important",
  },
  sticky: {
    top: 0,
    position: "fixed",
    left: 0,
    right: 0,
    margin: "0 auto",
    boxShadow: "1px 1px 10px rgb(0 0 0 / 15%)",
    zIndex: 2,
    opacity: 0.9,
    animation: "stuckMoveDown .6s",
  },
  nav: {
    display: "flex",
  },
  navItem: {
    display: "inline-block",
    padding: "10px !important",
    "& a:hover": {
      fontWeight: "bold",
      color: "#000000",
      "& $navSubMenu": {
        display: "block",
      },
    },
    "&:hover": {
      "& $navSubMenu": {
        display: "block",
      },
    },
  },
  navSubMenu: {
    display: "none",
    borderRadius: 6,
    width: 370,
    height: 200,
    position: "absolute",
    padding: "10px 5px",
    zIndex: 9,
    backgroundColor: "rgb(255, 255, 255)",
    boxShadow:
      "rgb(255 255 255) 0px 0px 0px 0px, rgb(0 0 0 / 5%) 0px 0px 0px 1px, rgb(0 0 0 / 10%) 0px 10px 15px -3px, rgb(0 0 0 / 5%) 0px 4px 6px -2px",
  },
  fashionIcon: {
    height: 30,
    width: 30,
    verticalAlign: "middle",
  },
  subMenuTitle: {
    fontSize: 18,
    fontWeight: 500,
    color: "#757474 !important",
    "&:hover": {
      color: "#000000",
    },
  },
  subNavLink: {
    color: "#757474 !important",
    "&:hover": {
      color: "#000000",
    },
  },
}));

export default function BotBar() {
  const classes = useStyles();
  useEffect(() => {
    const header = document.getElementById("header");
    const sticky = header.offsetTop;

    const scrollHandler = () => {
      if (window.pageYOffset > sticky) {
        header.classList.add(classes.sticky);
      } else {
        header.classList.remove(classes.sticky);
      }
    };
    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, [classes]);

  return (
    <React.Fragment>
      <CssBaseline></CssBaseline>
      <div className={classes.bg} id="header">
        <Container>
          <Grid container spacing={1} className={classes.menu}>
            <Grid item xs={3}>
              <Link to="/home">
                <img
                  src={LOCAL_PATH + "images/logo.png"}
                  alt="logo"
                  className={classes.logoimg}
                ></img>
              </Link>
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
                    isActive={(match, location) => {
                      var pathname = location.pathname.substring(1, 9);
                      if (pathname === "home") {
                        return true;
                      }
                      if (pathname === "") {
                        return true;
                      }
                      return false;
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
                    to="/category/type=ALL"
                    className="nav-link"
                    activeStyle={{
                      fontWeight: "bold",
                      color: "#000000",
                    }}
                    isActive={(match, location) => {
                      var pathname = location.pathname.substring(1, 9);
                      if (pathname === "category") {
                        return true;
                      }
                      return false;
                    }}
                  >
                    Thời trang
                    <KeyboardArrowDownIcon sx={{ verticalAlign: "middle" }} />
                  </NavLink>

                  <ul className={classes.navSubMenu}>
                    <li>
                      <Grid container>
                        <Grid item xs={6}>
                          <Grid
                            container
                            sx={{
                              borderRight: "1px solid rgba(0, 0, 0, 0.12)",
                              p: 0.5,
                            }}
                          >
                            <Grid
                              item
                              xs={12}
                              sx={{
                                borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
                                mb: 1,
                                pb: 0.5,
                              }}
                            >
                              <Box sx={{ display: "inline-block" }}>
                                <img
                                  className={classes.fashionIcon}
                                  src={LOCAL_PATH + "images/male-icon.png"}
                                  alt="male-icon"
                                />
                              </Box>
                              <Link
                                href="/category/type=FFM"
                                className={classes.subMenuTitle}
                              >
                                Thời trang NAM
                              </Link>
                            </Grid>
                            <Grid item xs={12}>
                              <Link
                                href="/category/type=GFM"
                                className={classes.subNavLink}
                              >
                                <MenuItem isableRipple>Áo Gile </MenuItem>
                              </Link>
                              <Link
                                href="/category/type=BFM"
                                className={classes.subNavLink}
                              >
                                <MenuItem isableRipple>Áo Blazer </MenuItem>
                              </Link>
                              <Link
                                href="/category/type=SFM"
                                className={classes.subNavLink}
                              >
                                <MenuItem isableRipple>Bộ Vest </MenuItem>
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={6}>
                          <Grid
                            container
                            sx={{
                              p: 0.5,
                            }}
                          >
                            <Grid
                              item
                              xs={12}
                              sx={{
                                borderBottom: "2px solid rgba(0, 0, 0, 0.12)",
                                mb: 1,
                                pb: 0.5,
                              }}
                            >
                              <Box sx={{ display: "inline-block" }}>
                                <img
                                  className={classes.fashionIcon}
                                  src={LOCAL_PATH + "images/female-icon.png"}
                                  alt="male-icon"
                                />
                              </Box>
                              <Link
                                href="/category/type=FFF"
                                className={classes.subMenuTitle}
                              >
                                Thời trang nữ
                              </Link>
                            </Grid>
                            <Grid item xs={12}>
                              <Link
                                href="/category/type=GFF"
                                className={classes.subNavLink}
                              >
                                <MenuItem isableRipple>Áo Gile </MenuItem>
                              </Link>
                              <Link
                                href="/category/type=VFF"
                                className={classes.subNavLink}
                              >
                                <MenuItem isableRipple>Áo Blazer </MenuItem>
                              </Link>
                              <Link
                                href="/category/type=SFF"
                                className={classes.subNavLink}
                              >
                                <MenuItem isableRipple>Bộ Vest </MenuItem>
                              </Link>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </li>
                  </ul>
                </li>
              </ul>
            </Grid>
            <Grid item className={classes.icon} justifyContent="flex-end">
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
