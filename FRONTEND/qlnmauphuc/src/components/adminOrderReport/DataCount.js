import { CircularProgress, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { getOrderReportCountData } from "../../redux/Action";
import { BACKGROUNDADM } from "../../constants/Constants";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: 20,
  color: theme.palette.text.secondary,
  boxShadow: 'none',
  "&:hover": {
    boxShadow: "rgb(32 40 45 / 8%) 0px 2px 14px 0px",
  },
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
  root: {
    color: "rgb(97, 97, 97)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    // boxShadow: "none !important",
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid rgba(144, 202, 249, 0.46)",
    padding: "10px",
    backgroundImage: `url("${BACKGROUNDADM}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function DataCount() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const orderReport = useSelector((state) => state.orderReport);
  const { loadingDC, dataCount } = orderReport;
  useEffect(() => {
    var now = new Date();
    now.setHours(0, 0, 0, 0);
    var startDate = new Date(now);
    var endDate = new Date(now);
    var startDateLW = new Date(now);
    var endDateLW = new Date(now);
    if (now.toLocaleDateString("en-us", { weekday: "long" }) === "Sunday") {
      startDate.setDate(startDate.getDate() - startDate.getDay() - 6);
      endDate.setDate(endDate.getDate() - endDate.getDay());
      endDate.setHours(23, 59, 59, 0);
      startDateLW.setDate(startDateLW.getDate() - startDateLW.getDay() - 13);
      endDateLW.setDate(endDateLW.getDate() - endDateLW.getDay() - 7);
      endDateLW.setHours(23, 59, 59, 0);
    } else {
      startDate.setDate(startDate.getDate() - startDate.getDay() + 1);
      endDate.setDate(endDate.getDate() - endDate.getDay() + 7);
      endDate.setHours(23, 59, 59, 0);
      startDateLW.setDate(startDateLW.getDate() - startDateLW.getDay() - 6);
      endDateLW.setDate(endDateLW.getDate() - endDateLW.getDay());
      endDateLW.setHours(23, 59, 59, 0);
    }
    const dataSend = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
      startDateLW: format(startDateLW, "yyyy-MM-dd"),
      endDateLW: format(endDateLW, "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(getOrderReportCountData(dataSend));
  }, []);

  return (
    <Grid container>
      {loadingDC ? (
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
            <Item sx={center} className={classes.root}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <ListAltOutlinedIcon className={classes.iconSize} />
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography variant="h5">{dataCount.count_order}</Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    S??? ho?? ????n
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center} className={classes.root}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <AssignmentTurnedInOutlinedIcon
                    className={classes.iconSize}
                  />
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography variant="h5">
                    {dataCount.count_completeorder}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Ho?? ????n ???? may xong
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center} className={classes.root}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <GroupsOutlinedIcon className={classes.iconSize} />
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography variant="h5">{dataCount.count_tailor}</Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Nh??n vi??n
                  </Typography>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center} className={classes.root}>
              <Grid container>
                <Grid item xs={12} sx={center}>
                  <QueryStatsOutlinedIcon className={classes.iconSize} />
                </Grid>
                <Grid item xs={12} sx={center}>
                  {dataCount.order_total - dataCount.order_pretotal < 0 ? (
                    <>
                      <TrendingDownIcon sx={{ color: "#fa5c80", mr: 1 }} />
                      <Typography variant="h5" sx={{ color: "#fa5c80" }}>
                        {(
                          (Math.abs(
                            dataCount.order_total - dataCount.order_pretotal
                          ) /
                            dataCount.order_pretotal) *
                          100
                        ).toFixed(2)}
                        %
                      </Typography>
                    </>
                  ) : (
                    <>
                      <TrendingUpIcon sx={{ color: "#0bcf97", mr: 1 }} />
                      <Typography variant="h5" sx={{ color: "#0bcf97" }}>
                        {(
                          ((dataCount.order_total - dataCount.order_pretotal) /
                            dataCount.order_pretotal) *
                          100
                        ).toFixed(2)}
                        %
                      </Typography>
                    </>
                  )}
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    T??ng tr?????ng
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
