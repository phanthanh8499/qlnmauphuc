import {
  Button,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DataCount from "./DataCount";
import OrderChart from "./OrderChart";
import PPieChart from "./PPieChart";
import { format } from "date-fns";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function AdminDashboard() {
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataCount />
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={8}>
            <Item sx={{ height: 420 }}>
              <Typography sx={{ fontWeight: 600 }}>
                Doanh thu trong tuần
              </Typography>
              <Divider />
              <OrderChart />
            </Item>
          </Grid>
          <Grid item xs={4}>
            <Item sx={{ height: 420 }}>
              <Typography sx={{ fontWeight: 600 }}>
                Trạng thái hoá đơn
              </Typography>
              <Divider />
              <PPieChart />
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}