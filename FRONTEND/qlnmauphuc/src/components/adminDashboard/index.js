import {
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import DataCount from "./DataCount";
import PPieChart from "./PPieChart";
import DLineChart from "./DLineChart";
import WeeklyForm from "./weeklyForm/WeeklyForm";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const options = ["Báo cáo mỗi tuần"];

export default function AdminDashboard() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [weeklyForm, setWeeklyForm] = useState(false);
  const closeWeeklyForm = () => {
    setWeeklyForm(false);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (e, index) => {
    if (index === 0) {
      setWeeklyForm(true);
    }
    handleClose();
  };
  const renderForm = () => {
    if (weeklyForm) {
      return (
        <WeeklyForm open={weeklyForm} onClose={closeWeeklyForm}></WeeklyForm>
      );
    }
  };
  const renderMenu = () => {
    return (
      <div>
        <Menu
          id="stack-chart-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "20ch",
            },
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {options.map((option, index) => (
            <MenuItem key={option} onClick={(e) => handleSelect(e, index)}>
              {option}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataCount />
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Item sx={{ height: 435 }}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography sx={{ fontWeight: 600 }}>Doanh thu</Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{ float: "right", padding: 0 }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider />
              {/* <OrderChart /> */}
              <DLineChart />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ height: 435 }}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography sx={{ fontWeight: 600 }}>
                    Sản phẩm được đặt may
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <IconButton
                    aria-label="more"
                    id="long-button"
                    aria-controls="long-menu"
                    aria-expanded={open ? "true" : undefined}
                    aria-haspopup="true"
                    onClick={handleClick}
                    sx={{ float: "right", padding: 0 }}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </Grid>
              </Grid>
              <Divider />
              <PPieChart />
            </Item>
          </Grid>
        </Grid>
      </Grid>
      {renderMenu()}
      {renderForm()}
    </Grid>
  );
}
