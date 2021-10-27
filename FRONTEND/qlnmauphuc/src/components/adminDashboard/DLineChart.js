import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
} from "recharts";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { format } from "date-fns";
import React, { PureComponent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEcommerceReportLineChart } from "../../redux/Action";
import { makeStyles } from "@mui/styles";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const COLORS = ["#8884d8", "#82ca9d"];
const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const useStyles = makeStyles((theme) => ({
  circle: {
    height: 10,
    width: 10,
    backgroundColor: "#fff",
    borderRadius: "50%",
    margin: 5,
  },
  title: {
    color: "#98a6ad!important",
  },
}));

export default function DLineChart() {
  const classes = useStyles();
  const [dataRender, setDataRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const ecommerceReport = useSelector((state) => state.ecommerceReport);
  const { loadinLC, dataLineChart } = ecommerceReport;
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
    dispatch(getEcommerceReportLineChart(dataSend));
  }, []);
  const [currentWeekRevenue, setCurrentWeekRevenue] = useState(0)
  const [previousWeekRevenue, setPreviousWeekRevenue] = useState(0)
  useEffect(() => {
    var temp1 = 0;
    var temp2 = 0;
    for(let i=0; i<dataLineChart.length; i++){
      temp1 = temp1 + dataLineChart[i].current_week;
      temp2 =
        temp2 +
        dataLineChart[i].previous_week;
      console.log(temp2)
    }
    setCurrentWeekRevenue((temp1 * 1000000).toFixed(0));
    setPreviousWeekRevenue((temp2 * 1000000).toFixed(0));
  }, [dataLineChart]);
  return (
    <>
      {loadinLC ? (
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
          <Grid item xs={12} sx={{ mt: 0.5, mb: 0.5 }}>
            <Grid container sx={{ backgroundColor: "#f9f9fd", p: 2 }}>
              <Grid item xs={6}>
                <Box>
                  <Box sx={center}>
                    <Typography className={classes.title}>Tuần này</Typography>
                  </Box>
                  <Box sx={center}>
                    <Box
                      className={classes.circle}
                      sx={{ backgroundColor: COLORS[0] }}
                    ></Box>
                    <Typography variant="h5">
                      {parseInt(currentWeekRevenue).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box>
                  <Box sx={center}>
                    <Typography className={classes.title}>
                      Tuần trước
                    </Typography>
                  </Box>
                  <Box sx={center}>
                    <Box
                      className={classes.circle}
                      sx={{ backgroundColor: COLORS[1] }}
                    ></Box>
                    <Typography variant="h5">
                      {parseInt(previousWeekRevenue).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ height: 250, width: "100%" }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={500} height={250} data={dataLineChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="revenue_date" />
                <YAxis unit=" triệu" />
                <Tooltip />
                {/* <Legend /> */}
                <Line
                  type="monotone"
                  dataKey="current_week"
                  stroke={COLORS[0]}
                  activeDot={{ r: 8 }}
                  strokeWidth={3}
                />
                <Line
                  type="monotone"
                  dataKey="previous_week"
                  stroke={COLORS[1]}
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </Grid>
        </Grid>
      )}
    </>
  );
}

