import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
  CircularProgress,
} from "@mui/material";
import React, { useEffect } from "react";
import { styled } from "@mui/material/styles";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getEcommerceReportCountData } from "../../redux/Action";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: "none",
  borderRadius: "12px",
  border: "1px solid rgba(144, 202, 249, 0.46)",
  "&:hover": {
    boxShadow: "rgb(32 40 45 / 8%) 0px 2px 14px 0px",
  },
}));

const center = {
  height: 127,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default function DataCount() {
  const dispatch = useDispatch();
  const ecommerceReport = useSelector((state) => state.ecommerceReport);
  const { loadingDC, dataCount } = ecommerceReport;
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
    dispatch(getEcommerceReportCountData(dataSend));
  }, []);
  return (
    <Grid container spacing={1}>
      {loadingDC ? (
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
                  <Typography variant="h4">{dataCount.count_order}</Typography>
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
                    {dataCount.count_product}
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
                  <Typography variant="h4">{dataCount.count_user}</Typography>
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
                  <Typography variant="h4">{dataCount.order_total}</Typography>
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
