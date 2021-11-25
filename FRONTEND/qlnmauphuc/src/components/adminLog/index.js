import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Badge,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Tab,
} from "@mui/material";
import { getActivityLogData, getProductData } from "../../redux/Action";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import axios from "axios";
import { format } from "date-fns";
import { BACKGROUNDADM } from "../../constants/Constants";

const MyBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "-10px",
  },
}));

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  padding: "12px 21px",
}));

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px -5px 0px !important",
  },
  img: {
    height: 100,
    width: 100,
  },
  root: {
    color: "rgb(97, 97, 97)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid rgba(144, 202, 249, 0.46)",
    height: 637,
    padding: "10px",
    backgroundImage: `url("${BACKGROUNDADM}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function AdminLog() {
  const classes = useStyles();
  const log = useSelector((state) => state.log);
  const { logData, loading } = log;
  const dispatch = useDispatch();

  const [data, setData] = useState();
  // const [loading, setLoading] = useState(true);
  const [startD, setStartD] = useState(new Date());
  const [endD, setEndD] = useState(new Date());
  useEffect(() => {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var startDate = new Date(now);
    var endDate = new Date(now);
    if (now.toLocaleDateString("en-us", { weekday: "long" }) === "Sunday") {
      startDate.setDate(startDate.getDate() - startDate.getDay() - 6);
      endDate.setDate(endDate.getDate() - endDate.getDay());
      endDate.setHours(23, 59, 59, 0);
    } else {
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
      endDate.setHours(23, 59, 59, 0);
    }
    setStartD(startDate);
    setEndD(endD);
    const dataSend = {
      functiontypeid: "All",
      eventtypeid: "All",
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(getActivityLogData(dataSend));
  }, [dispatch]);

  return (
    <Grid container className={classes.root}>
      {loading ? (
        <Grid
          item
          xs={12}
          sx={{
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "570px",
            backgroundColor: "rgb(0 0 0 / 2%);",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {/* <Grid item xs={12}>
            <Divider sx={{ margin: "0px 0px 5px 0px" }} />
          </Grid> */}

          <Grid item xs={12}>
            <Data data={logData} startD={startD} endD={endD} />
          </Grid>
        </>
      )}
    </Grid>
  );
}
