import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { format } from "date-fns";
import axios from "axios";
import { Link } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

const center = {
height: 127, display: 'flex', alignItems: 'center', justifyContent: 'center'
}
export default function DataCount() {
  const [dataRender, setDataRender] = useState([])
  const [loading, setLoading] = useState(true);
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
    const dataSend = {
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd HH:mm:ss"),
    };
    async function getDataCount() {
      const { data } = await axios.post(`/admin/getDataCount`, dataSend);
      setDataRender(data[0]);
      setLoading(false)
    }
    getDataCount();
    setLoading(false);
  }, [])
  return (
    <Grid container spacing={1}>
      {loading ? (
        <>
          <Grid item xs={3}>
            <Item sx={center}>
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center}>
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center}>
              <CircularProgress />
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item sx={center}>
              <CircularProgress />
            </Item>
          </Grid>
        </>
      ) : (
        <>
          <Grid item xs={3}>
            <Item>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h4">{dataRender.count_order}</Typography>
                  <Typography>Đơn hàng mới</Typography>
                </Grid>
                <Grid item xs={4}>
                  <ShoppingCartIcon sx={{ fontSize: 60, color: "#1976d2" }} />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 0.5, mb: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                  <Link to="/admin/orders">
                    <Button variant="outlined" color="primary" fullWidth>
                      Xem thêm
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h4">
                    {dataRender.count_product}
                  </Typography>
                  <Typography>Sản phẩm</Typography>
                </Grid>
                <Grid item xs={4}>
                  <LocalMallIcon sx={{ fontSize: 60, color: "#2e7d32" }} />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 0.5, mb: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                  <Link to="/admin/products">
                    <Button variant="outlined" color="success" fullWidth>
                      Xem thêm
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h4">{dataRender.count_user}</Typography>
                  <Typography>Khách hàng</Typography>
                </Grid>
                <Grid item xs={4}>
                  <PersonAddIcon sx={{ fontSize: 60, color: "#d62f2f" }} />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 0.5, mb: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                  <Link to="/admin/users">
                    <Button variant="outlined" color="error" fullWidth>
                      Xem thêm
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid item xs={3}>
            <Item>
              <Grid container>
                <Grid item xs={8}>
                  <Typography variant="h4">{dataRender.order_total}</Typography>
                  <Typography>Doanh thu mỗi tuần</Typography>
                </Grid>
                <Grid item xs={4}>
                  <MonetizationOnIcon sx={{ fontSize: 60, color: "#f7b753" }} />
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ mt: 0.5, mb: 0.5 }} />
                </Grid>
                <Grid item xs={12}>
                  <Link to="/admin/users">
                    <Button variant="outlined" color="warning" fullWidth>
                      Xem thêm
                    </Button>
                  </Link>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </>
      )}
    </Grid>
  );
}