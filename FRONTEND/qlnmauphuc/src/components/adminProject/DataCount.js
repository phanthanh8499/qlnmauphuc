import { Button, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { makeStyles } from "@mui/styles";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import { format } from "date-fns";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 20,
  color: theme.palette.text.secondary,
}));

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: "#98a6ad !important",
    fontSize: 14,
  },
  iconSize: {
    fontSize: "45px !important",
  },
}));

export default function DataCount() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var startDate = new Date(now);
    startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
    var endDate = new Date(now);
    endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
    endDate.setHours(23, 59, 59, 0);
    var startDateLW = new Date(now);
    startDateLW.setDate(startDateLW.getDate() - startDateLW.getDay() - 6);
    var endDateLW = new Date(now);
    endDateLW.setDate(endDateLW.getDate() - endDateLW.getDay());
    endDateLW.setHours(23, 59, 59, 0);
    const dataSend = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      startDateLW: format(startDateLW, "yyyy-MM-dd"),
      endDateLW: format(endDateLW, "yyyy-MM-dd HH:mm:ss"),
    };
    async function getRevenueData() {
      const { data } = await axios.post(`/admin/getOrderCount`, dataSend);
      setData(data[0]);
      setLoading(false);
    }
    getRevenueData();
  }, []);
  return (
    <Grid container>
      {loading ? (
        <>
          <Grid item xs={3}>
            <Item
              sx={{
                height: 141,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item
              sx={{
                height: 141,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item
              sx={{
                height: 141,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item
              sx={{
                height: 141,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress />
            </Item>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={3}>
            <Item sx={center}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <ListAltOutlinedIcon className={classes.iconSize} />
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography variant="h5">{data.count_order}</Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Số hoá đơn
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <AssignmentTurnedInOutlinedIcon
                    className={classes.iconSize}
                  />
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography variant="h5">
                    {data.count_completeorder}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Hoá đơn hoàn thành
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <GroupsOutlinedIcon className={classes.iconSize} />
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography variant="h5">{data.count_tailor}</Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Nhân viên
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <QueryStatsOutlinedIcon className={classes.iconSize} />
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography variant="h5">
                    {(
                      ((data.order_total - data.order_pretotal) /
                        data.order_pretotal) *
                      100
                    ).toFixed(2)}
                    %
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Tăng trưởng
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </>
      )}
    </Grid>
  );
}
