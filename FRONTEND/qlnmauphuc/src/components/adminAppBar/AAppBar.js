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
  Collapse,
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";

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

const MyListSubItem = styled(ListItem)(({ theme }) => ({
  color: "#000000",
  "&.Mui-selected": {
    color: "#ffffff !important",
    backgroundColor: "#b7b3b3",
    "& .MuiListItemIcon-root": {
      color: "#ffffff",
    },
    ":hover": {
      backgroundColor: "#b7b3b3",
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
    const temp = [...openSubMenu];
    if(open === true){
      for (let i = 0; i < temp.length; i++) {
        temp[i] = false;
      }
      setOpenSubMenu(temp);
    } else {
      for (let i = 0; i < temp.length; i++) {
        temp[i] = openSubMenuBK[i];
      }
      setOpenSubMenu(temp);
    }
  };
  const [title, setTitle] = useState("Dashboard");
  console.log(abc)
  console.log(useLocation().pathname);
  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  const [selected, setSelected] = useState(0)
  const changeTitle = (event, index) => {
    setSelected(index);
    setSelectedSubMenu();
  };
  const [selectedSubMenu, setSelectedSubMenu] = useState()
  const changeTitleMenu = (event, index, indexSub) => {
    setSelected(index);
    setSelectedSubMenu(indexSub);
  };
  useEffect(() => {
    abc === "DASHBOARD"
      ? setSelected(0) || setSelectedSubMenu("0a")
      : abc === "CUSTOMER"
      ? setSelected(1) || setSelectedSubMenu("1a")
      : abc === "PRODUCTS"
      ? setSelected(2)
      : abc === "CLOTH"
      ? setSelected(3)
      : abc === "STAFF"
      ? setSelected(1) || setSelectedSubMenu("1b")
      : abc === "ORDERS"
      ? setSelected(4)
      : abc === ""
      ? setSelected(0)
      : setSelected(0) || setSelectedSubMenu("0b");
  }, [abc]);

  const [openSubMenu, setOpenSubMenu] = useState([true, true]);
  const [openSubMenuBK, setOpenSubMenuBK] = useState([true, true]);

  const handleClick = (e, index) => {
    const temp = [...openSubMenu];
    temp[index] = !temp[index];
    setOpenSubMenu(temp);
    setOpenSubMenuBK(temp);
  };

  const renderListModule = () => {
    return (
      <List>
        <MyListItem
          button
          selected={selected === 0}
          onClick={(e) => handleClick(e, 0)}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
          {openSubMenu[0] ? <ExpandLess /> : <ExpandMore />}
        </MyListItem>
        <Collapse in={openSubMenu[0]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <Link
              to="/admin/dashboard"
              onClick={(e) => changeTitleMenu(e, 0, "0a")}
            >
              <MyListSubItem
                button
                sx={{ pl: 4 }}
                selected={selectedSubMenu === "0a"}
              >
                <ListItemIcon>
                  <StarBorder />
                </ListItemIcon>
                <ListItemText primary="Ecommerce" />
              </MyListSubItem>
            </Link>
            <Link
              to="/admin/statistic"
              onClick={(e) => changeTitleMenu(e, 0, "0b")}
            >
              <MyListSubItem
                button
                sx={{ pl: 4 }}
                selected={selectedSubMenu === "0b"}
              >
                <ListItemIcon>
                  <TrendingUpIcon />
                </ListItemIcon>
                <ListItemText primary="Statistic" />
              </MyListSubItem>
            </Link>
          </List>
        </Collapse>

     
          <MyListItem
            button
            selected={selected === 1}
            onClick={(e) => handleClick(e, 1)}
          >
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Account" />
            {openSubMenu[1] ? <ExpandLess /> : <ExpandMore />}
          </MyListItem>
          <Collapse in={openSubMenu[1]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <Link
                Link
                to="/admin/customer"
                onClick={(e) => changeTitleMenu(e, 1, "1a")}
              >
                <MyListSubItem
                  button
                  sx={{ pl: 4 }}
                  selected={selectedSubMenu === "1a"}
                >
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Customers" />
                </MyListSubItem>
              </Link>
              <Link
                to="/admin/staff"
                onClick={(e) => changeTitleMenu(e, 1, "1b")}
              >
                <MyListSubItem
                  button
                  sx={{ pl: 4 }}
                  selected={selectedSubMenu === "1b"}
                >
                  <ListItemIcon>
                    <TrendingUpIcon />
                  </ListItemIcon>
                  <ListItemText primary="Staff" />
                </MyListSubItem>
              </Link>
            </List>
          </Collapse>


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
        {/* <Link to="/admin/statistic" onClick={(e) => changeTitle(e, 5)}>
          <MyListItem button selected={selected === 5}>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Statistic" />
          </MyListItem>
        </Link> */}
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
