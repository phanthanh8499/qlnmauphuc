import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { Link } from "react-router-dom";
import { useSnackbar } from "notistack";
import { DANG_XUAT } from "../../../constants/Constants";
import { useDispatch, useSelector } from "react-redux";
import { Typography } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  titleColor: {
    fontSize: "14px !important",
    color: "#cccccc",
    display: "inline-block",
    "& span": {
      padding: "0px 5px",
    },
    "& span:hover": {
      color: "#ffffff",
    },
  },
  icon: {
    color: "#ffffff",
  },
}));

export default function MenuAppBar() {
  const classes = useStyles();
  const [auth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dangNhap = useSelector((state) => state.dangNhap);
  const { userInfo } = dangNhap;

  const dispatch = useDispatch();
  const dangXuat = () => {
    enqueueSnackbar("Đăng xuất thành công", {
      variant: "success",
      autoHideDuration: 1000,
    });
    dispatch({ type: DANG_XUAT });
  };

  return (
    <div className={classes.root}>
      {auth && (
        <div>
          {userInfo ? (
            <Typography className={classes.titleColor}>
              Xin chào {userInfo.user_username}
            </Typography>
          ) : userInfo.user_typeid === "AD" ? (
            <Typography className={classes.titleColor}>
              Xin chào Admin
            </Typography>
          ) : (
            ""
          )}
          <IconButton
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            className={classes.icon}
            size="large"
            sx={{color: '#ffffff'}}
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={open}
            onClose={handleClose}
          >
            {userInfo.user_typeid === "AD" ? (
              <>
                <MenuItem onClick={handleClose}>
                  <Link to="/admin/" target="_blank">
                    Trang quản trị
                  </Link>
                </MenuItem>
              </>
            ) : userInfo.user_typeid === "NV" ? (
              <>
                <MenuItem onClick={handleClose}>
                  <Link to="/admin/orders" target="_blank">
                    Trang quản trị
                  </Link>
                </MenuItem>
              </>
            ) : userInfo ? (
              <>
                <MenuItem onClick={handleClose}>
                  <Link to="/account">Trang cá nhân</Link>
                </MenuItem>
              </>
            ) : (
              ""
            )}
            <MenuItem onClick={dangXuat}>
              <Link to="/">Đăng xuất</Link>
            </MenuItem>
          </Menu>
        </div>
      )}
    </div>
  );
}
