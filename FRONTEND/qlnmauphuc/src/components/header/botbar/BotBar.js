import {
  CssBaseline,
  Grid,
  Container,
  IconButton,
  MenuItem,
  Link,
  TextField,
  Typography,
  Grow,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, {  useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SearchIcon from "@mui/icons-material/Search";
import { LOCAL_PATH } from "../../../constants/Constants";
import { Box } from "@mui/system";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import axios from "axios";

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
    position: "relative",
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
  searchForm: {
    width: 300,
    position: "absolute",
    right: 0,
    boxShadow: "1px 1px 10px rgb(0 0 0 / 15%)",
    zIndex: 9,
    backgroundColor: "#fff",
    padding: "5px",
    "&:before": {
      content: '" "',
      position: "absolute",
      top: -11,
      right: 22,
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: "10px solid #e7e7e7",
    },
  },
  resultForm: {
    width: 300,
    position: "absolute",
    right: 0,
    boxShadow: "1px 1px 10px rgb(0 0 0 / 15%)",
    zIndex: 20,
    top: 95,
    backgroundColor: "#fff",
  },
  resultImg: {
    width: 70,
    height: 70,
  },
  resultTitle: {
    overflow: "hidden",
    fontSize: "18px !important",
    whiteSpace: "nowrap",
    textOverflow: "ellipsis",
    fontWeight: "600 !important",
  },
  resultBox: {
    padding: "5px",
    borderBottom: "1px solid #eeeeee",
    "&:hover": {
      backgroundColor: "#eeeeee",
    },
    color: "#000000",
    
  },
  resultMore: {
    padding: 5,
    backgroundColor: "#000000",
    color: "#fff",
    "& a": {
      color: "#fff",
    },
  },
}));

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

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
  const [string, setString] = useState("");
  const [open, setOpen] = useState(false);
  const [openResult, setOpenResult] = useState(false);
  const [data, setData] = useState([]);
  const typingTimeoutRef = useRef(null);

  const handleSearch = async (e) => {
    let searchString = e.target.value;
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    if (searchString) {
      typingTimeoutRef.current = setTimeout(async () => {
        setString(e.target.value);
        setOpenResult(true);
        const { data } = await axios.get(`/livesearch.${searchString}`);
        setData(data);
      }, 300);
    } else {
      setOpenResult(false);
      setData([]);
    }
  };

  const covertURL = (str) => {
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");
    str = str.replace(/([^0-9a-z-\s])/g, "");
    str = str.replace(/(\s+)/g, "-");
    str = str.replace(/^-+/g, "");
    str = str.replace(/-+$/g, "");
    return str;
  };

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
                <SearchIcon
                  className={classes.buttonIcon}
                  onClick={(e) => setOpen(!open)}
                ></SearchIcon>
              </IconButton>
              <Grow
                in={open}
                style={{ transformOrigin: "0 0 0" }}
                {...(open ? { timeout: 500 } : {})}
              >
                <Box className={classes.searchForm}>
                  <TextField
                    type="search"
                    variant="standard"
                    fullWidth
                    onChange={handleSearch}
                  />
                </Box>
              </Grow>
              <Grow
                in={openResult}
                style={{ transformOrigin: "0 0 0" }}
                {...(openResult ? { timeout: 1000 } : {})}
              >
                <Box className={classes.resultForm}>
                  {data.length === 0 ? (
                    <Grid container>
                      <Grid item xs={12} sx={center}>
                        <Typography sx={{ padding: "10px 5px" }}>
                          Không tìm thấy kết quả
                        </Typography>
                      </Grid>
                    </Grid>
                  ) : (
                    data.slice(0,3).map((item, key) => (
                      <Link
                        href={
                          "/" +
                          covertURL(item.product_name) +
                          "." +
                          item.id +
                          ".html"
                        }
                      >
                        <Grid container className={classes.resultBox} key={key}>
                          <Grid item xs={3} sx={center}>
                            <img
                              className={classes.resultImg}
                              src={
                                LOCAL_PATH + item.product_image1.substring(2)
                              }
                              alt="sml"
                            />
                          </Grid>
                          <Grid item xs={9}>
                            <Box sx={{ pl: 0.5 }}>
                              <Typography className={classes.resultTitle}>
                                {item.product_name}
                              </Typography>
                            </Box>
                            <Typography sx={{ fontSize: 14, pl: 0.5 }}>
                              {item.product_price.toLocaleString('it-IT', {style : 'currency', currency : 'VND'})}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Link>
                    ))
                  )}

                  {data.length === 0 ? null : (
                    <Grid container className={classes.resultMore}>
                      <Grid item xs={12} sx={center}>
                        <Link href={"/search=" + string}>
                          <Typography>
                            Xem thêm ({data.length} sản phẩm)
                          </Typography>
                        </Link>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </Grow>
            </Grid>
          </Grid>
        </Container>
      </div>
    </React.Fragment>
  );
}
