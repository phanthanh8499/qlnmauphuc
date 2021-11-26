import { Divider, Grid, Paper, Typography, Menu, MenuItem, IconButton} from "@mui/material";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import DataCount from "./DataCount";
import PStackChart from "./PStackChart";
import PPipeChart from "./PPipeChart";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import WeeklyForm from "./weeklyForm/WeeklyForm";
import MonthlyForm from "./monthlyForm/monthlyForm";
import { Copyright } from "../utility/Utility";
import TailorsData from "./TailorsData";

const options = [
  "Báo cáo mỗi tuần",
  "Báo cáo mỗi tháng",
];

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 20,
  color: theme.palette.text.secondary,
}));


const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: "#98a6ad !important",
    fontSize: 14,
  },
  iconSize: {
    fontSize: "45px !important",
  },
  title: {
    fontWeight: "600 !important",
  },
  root: {
    backgroundColor: "#ffffff",
    color: "rgb(97, 97, 97)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid rgba(144, 202, 249, 0.46)",
    padding: "10px",
    "&:hover": {
      boxShadow: "rgb(32 40 45 / 8%) 0px 2px 14px 0px",
    },
  },
}));

export default function AdminProject() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [weeklyForm, setWeeklyForm] = useState(false);
  const [monthlyForm, setMonthlyForm] = useState(false);
  const closeWeeklyForm = () => {
    setWeeklyForm(false);
  }
  const closeMonthlyForm = () => {
    setMonthlyForm(false);
  }
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelect = (e, index) => {
    console.log(index)
    if(index === 0 ){
      setWeeklyForm(true);
    }
    if(index === 1){
      setMonthlyForm(true);
    }
    handleClose()
  }
  const renderForm = () => {
    if(weeklyForm){
      return (<WeeklyForm open={weeklyForm} onClose={closeWeeklyForm}></WeeklyForm>)
    }
    if(monthlyForm){
      return (
        <MonthlyForm open={monthlyForm} onClose={closeMonthlyForm}></MonthlyForm>
      );
    }
  }
  return (
    <Grid container className={classes.root} sx={{ padding: "20px" }}>
      <Grid item xs={12}>
        <DataCount />
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Item sx={{ height: 440 }} className={classes.root}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.title}>
                    Trạng thái hoá đơn
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

              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              <PPipeChart />
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
                    <MenuItem
                      key={option}
                      onClick={(e) => handleSelect(e, index)}
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item sx={{ height: 440 }} className={classes.root}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.title}>
                    Tiến trình may của nhân viên
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

              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              <PStackChart />
            </Item>
          </Grid>
          <Grid item xs={12}>
            <Item className={classes.root}>
              <Grid container>
                <Grid item xs={8}>
                  <Typography className={classes.title}>
                    Dữ liệu tiến trình may
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

              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              <TailorsData />
            </Item>
          </Grid>
        </Grid>
        {Copyright()}
      </Grid>
      {renderForm()}
    </Grid>
  );
}
