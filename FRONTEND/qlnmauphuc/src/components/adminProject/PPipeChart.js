import { CircularProgress, Grid, Typography } from "@mui/material";
import React, { PureComponent, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Legend,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import { makeStyles } from "@mui/styles";
import { format } from "date-fns";
import axios from "axios";
import { Box } from "@mui/system";

const COLORS = ["#FFBB28", "#00C49F", "#FF8042", "#0088FE"];

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: "#98a6ad!important",
    fontSize: "12px !important",
  },
}));
export default function PPipeChart() {
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
    const dataSend = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    async function getRevenueData() {
      const { data } = await axios.post(`/admin/getCountOrder`, dataSend);
      setData([
        { name: "Đợi xử lý", value: parseInt(data[0].processing_count) },
        { name: "Đang may", value: parseInt(data[0].sewing_count) },
        { name: "Đang vận chuyển", value: parseInt(data[0].shipping_count) },
        { name: "Hoàn tất", value: parseInt(data[0].complete_count) },
        // { name: "Huỷ bỏ", value: parseInt(data[0].cancel_count) },
      ]);
      setLoading(false);
    }
    getRevenueData();
  }, []);
  return (
    <>
      {loading ? (
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
          <Grid item xs={12} sx={{ height: 250 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={350}>
                <Pie
                  isAnimationActive={false}
                  data={data}
                  cx="50%"
                  cy="50%"
                  fill="#8884d8"
                  label
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {data.map((entry, index) => (
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
              <Grid item xs={3}>
                <Grid container>
                  <Grid item xs={12} sx={center}>
                    <TrendingUpOutlinedIcon sx={{ color: `${COLORS[0]}` }} />
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography variant="h5">
                      {(
                        (data[0].value /
                          (data[0].value +
                            data[1].value +
                            data[2].value +
                            data[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      Đợi xử lý
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
                        (data[1].value /
                          (data[0].value +
                            data[1].value +
                            data[2].value +
                            data[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      Đang may
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
                        (data[2].value /
                          (data[0].value +
                            data[1].value +
                            data[2].value +
                            data[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      Đang vận chuyển
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
                        (data[3].value /
                          (data[0].value +
                            data[1].value +
                            data[2].value +
                            data[3].value)) *
                        100
                      ).toFixed(2)}
                      %
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.subTitle}>
                      Hoàn tất
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}
    </>
  );
}
