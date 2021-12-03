import React, { useEffect, useState } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useLocation } from "react-router";
import AppsIcon from "@mui/icons-material/Apps";
import { Box } from "@mui/system";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { DANG_XUAT, LOCAL_PATH } from "../../constants/Constants";
import { getUserPermissions } from "../../redux/Action";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CardMembershipIcon from "@mui/icons-material/CardMembership";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";

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
  color: "#ffffff",
  backgroundColor: "#1976d2 !important",
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
  "& .MuiTypography-root": {
    fontWeight: "500 !important",
  },
  "&.Mui-selected": {
    color: "#ffffff !important",
    backgroundColor: "#1976d2",
    "& .MuiListItemIcon-root": {
      color: "#ffffff",
    },
    ":hover": {
      backgroundColor: "#1976d2",
    },
  },
  "&:hover": {
    color: "#ffffff",
    backgroundColor: "#1976d275",
  },
}));

const MyListSubItem = styled(ListItem)(({ theme }) => ({
  color: "#000000",
  "&.Mui-selected": {
    color: "#ffffff !important",
    backgroundColor: "#1976d2ad",
    "& .MuiListItemIcon-root": {
      color: "#ffffff",
    },
    ":hover": {
      backgroundColor: "#1976d2ad",
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
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  const [userData, setUserData] = useState(userInfo);

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
    const temp = [...openSubMenu];
    if (open === true) {
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

  const [selected, setSelected] = useState(0);
  const changeTitle = (event, index) => {
    setSelected(index);
    setSelectedSubMenu();
  };
  const [selectedSubMenu, setSelectedSubMenu] = useState();
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
      : abc === "STATISTIC"
      ? setSelected(0) || setSelectedSubMenu("0b")
      : abc === "LOG"
      ? setSelected(5)
      : abc === "LOYALTYPROGRAM"
      ? setSelected(6)
      : abc === "GIFTVOUCHER"
      ? setSelected(7)
      : setSelected() || setSelectedSubMenu();
  }, [abc]);

  const [openSubMenu, setOpenSubMenu] = useState([true, true]);
  const [openSubMenuBK, setOpenSubMenuBK] = useState([true, true]);

  const title = (item) => {
    if (item === "DASHBOARD") {
      return "Bảng điều khiển - Thương mại";
    } else if (item === "CUSTOMER") {
      return "Quản lý tài khoản khách hàng";
    } else if (item === "STAFF") {
      return "Quản lý tài khoản nhân viên";
    } else if (item === "PRODUCTS") {
      return "Quản lý sản phẩm";
    } else if (item === "CLOTH") {
      return "Quản lý vải";
    } else if (item === "ORDERS") {
      return "Quản lý đơn hàng";
    } else if (item === "STATISTIC") {
      return "Bảng điểu khiển - Tình trạng may";
    } else if (item === "PROFILE") {
      return "Trang cá nhân";
    } else if (item === "LOG") {
      return "Nhật ký hoạt động";
    } else if (item === "LOYALTYPROGRAM") {
      return "Khách hàng thân thiết";
    } else if (item === "GIFTVOUCHER") {
      return "Mã giảm giá";
    }
  };

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
          <ListItemText primary="Bảng điều khiển" />
          {openSubMenu[0] ? <ExpandLess /> : <ExpandMore />}
        </MyListItem>
        <Collapse in={openSubMenu[0]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {permissionData[0].up_eccommercedashboard ? (
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
                  <ListItemText primary="Thương mại" />
                </MyListSubItem>
              </Link>
            ) : null}
            {permissionData[0].up_orderdashboard ? (
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
                  <ListItemText primary="Tình trạng may" />
                </MyListSubItem>
              </Link>
            ) : null}
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
          <ListItemText primary="Quản lý tài khoản" />
          {openSubMenu[1] ? <ExpandLess /> : <ExpandMore />}
        </MyListItem>
        <Collapse in={openSubMenu[1]} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {permissionData[0].up_customeraccountmanager === true ? (
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
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Khách hàng" />
                </MyListSubItem>
              </Link>
            ) : null}
            {permissionData[0].up_staffaccountmanager === true ? (
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
                    <PersonAddAlt1Icon />
                  </ListItemIcon>
                  <ListItemText primary="Nhân viên" />
                </MyListSubItem>
              </Link>
            ) : null}
          </List>
        </Collapse>

        {permissionData[0].up_productmanager === true ? (
          <Link to="/admin/products">
            <MyListItem
              button
              selected={selected === 2}
              onClick={(e) => changeTitle(e, 2)}
            >
              <ListItemIcon>
                <CategoryIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý sản phẩm" />
            </MyListItem>
          </Link>
        ) : null}

        {permissionData[0].up_clothmanager === true ? (
          <Link to="/admin/cloth" onClick={(e) => changeTitle(e, 3)}>
            <MyListItem button selected={selected === 3}>
              <ListItemIcon>
                <AppsIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý vải" />
            </MyListItem>
          </Link>
        ) : null}

        {permissionData[0].up_ordermanager === true ? (
          <Link to="/admin/orders" onClick={(e) => changeTitle(e, 4)}>
            <MyListItem button selected={selected === 4}>
              <ListItemIcon>
                <ShoppingCartIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý đơn hàng" />
            </MyListItem>
          </Link>
        ) : null}

        {permissionData[0].up_ordermanager === true ? (
          <Link to="/admin/log" onClick={(e) => changeTitle(e, 5)}>
            <MyListItem button selected={selected === 5}>
              <ListItemIcon>
                <AssignmentIcon />
              </ListItemIcon>
              <ListItemText primary="Nhật ký hoạt động" />
            </MyListItem>
          </Link>
        ) : null}

        {permissionData[0].up_ordermanager === true ? (
          <Link to="/admin/loyaltyprogram" onClick={(e) => changeTitle(e, 6)}>
            <MyListItem button selected={selected === 6}>
              <ListItemIcon>
                <CardMembershipIcon />
              </ListItemIcon>
              <ListItemText primary="Khách hàng thân thiết" />
            </MyListItem>
          </Link>
        ) : null}

        {permissionData[0].up_ordermanager === true ? (
          <Link to="/admin/giftvoucher" onClick={(e) => changeTitle(e, 7)}>
            <MyListItem button selected={selected === 7}>
              <ListItemIcon>
                <CardGiftcardIcon />
              </ListItemIcon>
              <ListItemText primary="Mã giảm giá" />
            </MyListItem>
          </Link>
        ) : null}
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

  const dispatch = useDispatch();
  const dangXuat = () => {
    dispatch({ type: DANG_XUAT });
  };
 
  const users = useSelector((state) => state.users);
  const {loadingPermissions, permissionData} = users

  useEffect(() => {
    dispatch(getUserPermissions(userInfo.id));
  }, [])

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
            sx={{ flexGrow: 1, color: "#ffffff" }}
          >
            {title(abc)}
          </Typography>
          <Box
            sx={{
              display: "flex",
              border: "1px solid #ffffff",
              padding: "9px",
              backgroundColor: "#ffffff",
              cursor: "pointer",
            }}
            onClick={handleClickMenu}
          >
            <Avatar
              alt={userData.user_firstname}
              src={LOCAL_PATH + userData.user_avatar.substring(2)}
              className={classes.lagre}
              sx={{ mr: 0.5 }}
            />
            <Box sx={{ color: "#000000" }}>
              <Typography>
                {userData.user_lastname + " " + userData.user_firstname}
              </Typography>
              <Typography sx={{ fontSize: 14 }}>{userData.ut_name}</Typography>
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
            <Link to="/admin/profile">
              <MenuItem onClick={handleCloseMenu}>Trang cá nhân</MenuItem>
            </Link>
            <Link to="/">
              <MenuItem onClick={dangXuat}>Đăng xuất</MenuItem>
            </Link>
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
          <img
            src={LOCAL_PATH + "images/logo.png"}
            alt="logo"
            style={{ width: "145px", height: "65px" }}
          />
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        {loadingPermissions ? null : renderListModule()}
        <Divider />
      </Drawer>
    </>
  );
}
