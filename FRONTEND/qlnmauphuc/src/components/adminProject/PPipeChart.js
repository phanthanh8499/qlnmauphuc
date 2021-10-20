import { Grid, Typography } from "@mui/material";
import React, { PureComponent } from "react";
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

const data = [
  { name: "Group A", value: 400 },
  { name: "Group B", value: 300 },
  { name: "Group C", value: 300 },
  { name: "Group D", value: 200 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const center = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const useStyles = makeStyles((theme) => ({
  subTitle: {
    color: "#98a6ad!important",
    fontSize: "12px !important",
  },
}));
export default function PPipeChart() {
  const classes = useStyles();
  return (
    <>
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
                  <Typography variant="h5">60%</Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Hoàn thành
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
                  <Typography variant="h5">60%</Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Đang xử lý
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
                  <Typography variant="h5">60%</Typography>
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
                  <Typography variant="h5">60%</Typography>
                </Grid>
                <Grid item xs={12} sx={center}>
                  <Typography className={classes.subTitle}>
                    Đợi xác nhận
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
