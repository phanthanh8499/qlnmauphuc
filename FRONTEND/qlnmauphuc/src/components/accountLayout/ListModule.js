import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled } from "@mui/material/styles";
import {useLocation} from 'react-router';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { DANG_XUAT } from '../../constants/Constants';

const MyListItem = styled(ListItem)(({ theme }) => ({
  color: "#000000",
  "&.Mui-selected": {
    backgroundColor: "rgb(25 117 210 / 22%)",
  },
  "&:hover": {
    backgroundColor: "rgba(25, 118, 210, 0.08)",
  },
}));

export default function ListModule () {
  const [value, setValue] = useState(0);
  const handleClick = (e, index) => {
    setValue(index)
  }
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const pathname = useLocation().pathname.substring(9);
   useEffect(() => {
     pathname === "orders"
       ? setValue(0)
       : pathname === "profile"
       ? setValue(1)
       : pathname === "measurements"
       ? setValue(2)
       : pathname === "cloth"
       ? setValue(3)
       : pathname === "giftvoucher"
       ? setValue(4)
       : pathname === ""
       ? setValue("")
       : setValue(2);
   }, [pathname]);

   const dangXuat = () => {
     enqueueSnackbar("Đăng xuất thành công", {
       variant: "success",
       autoHideDuration: 1000,
     });
     dispatch({ type: DANG_XUAT });
   };

    return (
      <>
        <List component="nav" aria-label="main mailbox folders">
          <Link to="/account/orders">
            <MyListItem
              selected={value === 0}
              onClick={(e) => handleClick(e, 0)}
            >
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách đơn đặt may" />
            </MyListItem>
          </Link>
          <Link to="/account/profile">
            <MyListItem
              selected={value === 1}
              onClick={(e) => handleClick(e, 1)}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý tài khoản" />
            </MyListItem>
          </Link>
          <Link to="/account/measurements">
            <MyListItem
              selected={value === 2}
              onClick={(e) => handleClick(e, 2)}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Số hiệu đăng ký" />
            </MyListItem>
          </Link>
          <Link to="/account/cloth">
            <MyListItem
              selected={value === 3}
              onClick={(e) => handleClick(e, 3)}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Quản lý vải" />
            </MyListItem>
          </Link>
          <Link to="/account/giftvoucher">
            <MyListItem
              selected={value === 4}
              onClick={(e) => handleClick(e, 4)}
            >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Quà tặng" />
            </MyListItem>
          </Link>
          <Link to="/" onClick={(e) => dangXuat()}>
            <MyListItem
              selected={value === 5}
              onClick={(e) => handleClick(e, 5)}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </MyListItem>
          </Link>
        </List>
      </>
    );
}
