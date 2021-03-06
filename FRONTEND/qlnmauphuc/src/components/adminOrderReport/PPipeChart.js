import { CircularProgress, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { makeStyles } from "@mui/styles";
import { format } from "date-fns";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import { getOrderReportPieChart } from "../../redux/Action";

const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#0088FE", "#f00"];

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: "#98a6ad!important",
    fontSize: "12px !important",
  },
  square: {
    height: 10,
    width: 10,
    backgroundColor: "#fff000",
    display: "inline-block",
    marginRight: 5,
  },
  percent: {
    float: "right",
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
    // backgroundImage: `url("${BACKGROUNDADM}")`,
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    // backgroundSize: "cover",
  },
}));

export default function PPipeChart() {
  const classes = useStyles();
  // const [data, setData] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const dispatch = useDispatch();
  const orderReport = useSelector((state) => state.orderReport);
  const { loadingPC, dataPieChart } = orderReport;
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
    // var date = new Date("2021-1-16");
    // var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    // var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    const dataSend = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    dispatch(getOrderReportPieChart(dataSend));
  }, []);

  return (
    <>
      {loadingPC ? (
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <Grid container>
          <Grid item xs={12} sx={{ height: 205 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={205}>
                <Pie
                  isAnimationActive={false}
                  data={dataPieChart}
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {dataPieChart.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Grid>
          <Grid item xs={12}>
            <Grid container>
              {dataPieChart.map((value, key) => (
                <Grid item xs={12} sx={{ pr: 8, pl: 8 }}>
                  <Typography>
                    <Box
                      className={classes.square}
                      sx={{
                        backgroundColor: COLORS[key],
                      }}
                    ></Box>
                    {value.name}
                    <span className={classes.percent}>
                      {(
                        (dataPieChart[key].value /
                          (dataPieChart[0].value +
                            dataPieChart[1].value +
                            dataPieChart[2].value +
                            dataPieChart[3].value +
                            dataPieChart[4].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </span>
                  </Typography>
                  <Divider />
                </Grid>
              ))}
            </Grid>
          </Grid>
          {/* <Grid item xs={12}>
            <Grid container>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12} sx={center}>
                    <TrendingUpOutlinedIcon sx={{ color: `${COLORS[0]}` }} />
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography variant="h5">
                      {(
                        (dataPieChart[0].value /
                          (dataPieChart[0].value +
                            dataPieChart[1].value +
                            dataPieChart[2].value +
                            dataPieChart[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      ?????i x??? l??
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12} sx={center}>
                    <TrendingDownOutlinedIcon sx={{ color: `${COLORS[1]}` }} />
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography variant="h5">
                      {(
                        (dataPieChart[1].value /
                          (dataPieChart[0].value +
                            dataPieChart[1].value +
                            dataPieChart[2].value +
                            dataPieChart[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      ??ang may
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12} sx={center}>
                    <TrendingDownOutlinedIcon sx={{ color: `${COLORS[2]}` }} />
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography variant="h5">
                      {(
                        (dataPieChart[2].value /
                          (dataPieChart[0].value +
                            dataPieChart[1].value +
                            dataPieChart[2].value +
                            dataPieChart[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      ??ang v???n chuy???n
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12} sx={center}>
                    <TrendingDownOutlinedIcon sx={{ color: `${COLORS[3]}` }} />
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography variant="h5">
                      {(
                        (dataPieChart[3].value /
                          (dataPieChart[0].value +
                            dataPieChart[1].value +
                            dataPieChart[2].value +
                            dataPieChart[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      Ho??n t???t
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              
            </Grid>
          </Grid> */}
        </Grid>
      )}
    </>
  );
}
