import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import CategoryIcon from "@mui/icons-material/Category";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import {
  Avatar,
  Badge,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import AppsIcon from "@mui/icons-material/Apps";
import { Box } from "@mui/system";


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

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  color: "#000000",
  backgroundColor: '#ffffff !important',
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const MyListItem = styled(ListItem)(({ theme }) => ({
  color: "#000000",
  "&.Mui-selected": {
    color: "#ffffff !important",
    backgroundColor: "#000000",
    "& .MuiListItemIcon-root": {
      color: "#ffffff",
    },
    ":hover": {
      backgroundColor: "#000000",
    },
  },
}));


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

export default function AAppBar(props) {
  const classes = useStyles();
  const abc = useLocation().pathname.substring(7).toUpperCase();
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [title, setTitle] = useState("Dashboard");
  console.log(abc)
  console.log(useLocation().pathname);
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  const [selected, setSelected] = useState(0)
  const changeTitle = (event, index) => {
    setSelected(index);
  };
  useEffect(() => {
    abc === "DASHBOARD"
      ? setSelected(0)
      : abc === "USERS"
      ? setSelected(1)
      : abc === "PRODUCTS"
      ? setSelected(2)
      : abc === "CLOTH"
      ? setSelected(3)
      : abc === "ORDERS"
      ? setSelected(4)
      : abc === ""
      ? setSelected(0)
      : setSelected(5);
  }, [])
  const renderListModule = () => {
    return (
      <List>
        <Link to="/admin/dashboard" onClick={(e) => changeTitle(e, 0)}>
          <MyListItem button selected={selected === 0}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </MyListItem>
        </Link>
        <Link to="/admin/users" onClick={(e) => changeTitle(e, 1)}>
          <MyListItem button selected={selected === 1}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </MyListItem>
        </Link>
        <Link to="/admin/products">
          <MyListItem
            button
            selected={selected === 2}
            onClick={(e) => changeTitle(e, 2)}
          >
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </MyListItem>
        </Link>
        <Link to="/admin/cloth" onClick={(e) => changeTitle(e, 3)}>
          <MyListItem button selected={selected === 3}>
            <ListItemIcon>
              <AppsIcon />
            </ListItemIcon>
            <ListItemText primary="Cloth" />
          </MyListItem>
        </Link>
        <Link to="/admin/orders" onClick={(e) => changeTitle(e, 4)}>
          <MyListItem button selected={selected === 4}>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </MyListItem>
        </Link>
        <Link to="/admin/statistic" onClick={(e) => changeTitle(e, 5)}>
          <MyListItem button selected={selected === 5}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Statistic" />
          </MyListItem>
        </Link>
      </List>
    );
  };

  
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(false);
  };

  return (
    <>
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1, color: "#000000" }}
          >
            {abc}
          </Typography>

          <Box
            sx={{
              display: "flex",
              border: "1px solid #f1f3fa",
              padding: "9px",
              backgroundColor: "#fafbfd",
              cursor: 'pointer'
            }}
            onClick={handleClickMenu}
          >
            <Avatar
              alt="Remy Sharp"
              src="./images/avatar/user-image.jpg"
              className={classes.lagre}
              sx={{mr: 0.5}}
            />
            <Box sx={{ color: "#98a6ad" }}>
              <Typography>Nguyễn Văn A</Typography>
              <Typography sx={{ fontSize: 14 }}>Administrator</Typography>
            </Box>
          </Box>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openMenu}
              onClose={handleCloseMenu}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleCloseMenu}>Profile</MenuItem>
              <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
              <MenuItem onClick={handleCloseMenu}>Logout</MenuItem>
            </Menu>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
      
        
        <Divider />
        {renderListModule()}
        <Divider />
      </Drawer>
    </>
  );
}
