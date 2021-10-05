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
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";

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
  backgroundColor: '#000000 !important',
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
  console.log(abc);
  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };
  const [title, setTitle] = useState("Dashboard");

  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  const changeTitle = (name) => {
    setTitle(name);
  };
  const renderListModule = () => {
    return (
      <List>
        <Link to="/admin/dashboard" onClick={() => changeTitle("Dashboard")}>
          <ListItem button>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link to="/admin/orders" onClick={() => changeTitle("Orders")}>
          <ListItem button>
            <ListItemIcon>
              <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </Link>
        <Link to="/admin/customers" onClick={() => changeTitle("Customers")}>
          <ListItem button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Customers" />
          </ListItem>
        </Link>
        <Link to="/admin/products" onClick={() => changeTitle("Products")}>
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
        </Link>
        <Link to="/admin/cloth" onClick={() => changeTitle("Cloth")}>
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Cloth" />
          </ListItem>
        </Link>
        <Link to="/admin/orders" onClick={() => changeTitle("Orders")}>
          <ListItem button>
            <ListItemIcon>
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText primary="Orders" />
          </ListItem>
        </Link>
        <Link to="/admin/statistic" onClick={() => changeTitle("Statistic")}>
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Statistic" />
          </ListItem>
        </Link>
      </List>
    );
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
            sx={{ flexGrow: 1 }}
          >
            {abc}
          </Typography>
          {/* <TitleDB dbtitle={title}></TitleDB> */}
          <IconButton color="inherit" size="large">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton color="inherit" size="large">
            <ExitToAppIcon></ExitToAppIcon>
          </IconButton>
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
        <div className={classes.center}>
          <Avatar
            alt="Remy Sharp"
            src="./images/avatar/user-image.jpg"
            className={classes.lagre}
          />
          <Typography
            className={clsx(classes.avatarTitle, !open && classes.avatarClose)}
          >
            Nguyễn Văn A
          </Typography>
          <Typography
            className={clsx(
              classes.avatarSubTitle,
              !open && classes.avatarClose
            )}
          >
            Administrator
          </Typography>
        </div>
        <Divider />
        {renderListModule()}
        <Divider />
      </Drawer>
    </>
  );
}
