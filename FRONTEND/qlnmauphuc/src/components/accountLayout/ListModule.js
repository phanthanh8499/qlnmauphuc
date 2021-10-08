import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { styled } from "@mui/material/styles";
import {useLocation} from 'react-router';

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
  const abc = useLocation().pathname.substring(9);
   useEffect(() => {
     abc === "orders"
       ? setValue(0)
       : abc === "profile"
       ? setValue(1)
       : abc === "measurements"
       ? setValue(2)
       : abc === "cloth"
       ? setValue(3)
       : abc === "/"
       ? setValue(0)
       : setValue(2);
   }, []);
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
              <ListItemText primary="Thông tin cá nhân" />
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
          <Link to="/">
            <MyListItem
              selected={value === 4}
              onClick={(e) => handleClick(e, 4)}
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
