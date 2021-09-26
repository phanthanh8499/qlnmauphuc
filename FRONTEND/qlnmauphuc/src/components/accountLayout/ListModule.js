import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react'
import { Link } from 'react-router-dom';
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

export default function ListModule () {
    return (
      <>
        <List component="nav" aria-label="main mailbox folders">
          <Link to="/account">
            <ListItem >
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Danh sách đơn hàng" />
            </ListItem>
          </Link>
          <Link to="/account/profile">
            <ListItem >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Thông tin cá nhân" />
            </ListItem>
          </Link>
          <Link to="/account/measurements">
            <ListItem >
              <ListItemIcon>
                <PermIdentityIcon />
              </ListItemIcon>
              <ListItemText primary="Số hiệu đăng ký" />
            </ListItem>
          </Link>
          <Link to="/">
            <ListItem >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Đăng xuất" />
            </ListItem>
          </Link>
        </List>
      </>
    );
}
