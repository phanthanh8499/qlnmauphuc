import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function DataCount() {
  return (
    <Grid container spacing={1}>
      <Grid item xs={3}>
        <Item>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h4">12</Typography>
              <Typography>Đơn hàng mới</Typography>
            </Grid>
            <Grid item xs={4}>
              <ShoppingCartIcon sx={{ fontSize: 60, color: "#1976d2" }} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="primary" fullWidth>
                Xem thêm
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h4">33</Typography>
              <Typography>Sản phẩm</Typography>
            </Grid>
            <Grid item xs={4}>
              <LocalMallIcon sx={{ fontSize: 60, color: "#2e7d32" }} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="success" fullWidth>
                Xem thêm
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h4">33</Typography>
              <Typography>Khách hàng</Typography>
            </Grid>
            <Grid item xs={4}>
              <PersonAddIcon sx={{ fontSize: 60, color: "#d62f2f" }} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="error" fullWidth>
                Xem thêm
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item>
          <Grid container>
            <Grid item xs={8}>
              <Typography variant="h4">123</Typography>
              <Typography>Doanh thu mỗi tuần</Typography>
            </Grid>
            <Grid item xs={4}>
              <MonetizationOnIcon sx={{ fontSize: 60, color: "#f7b753" }} />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            </Grid>
            <Grid item xs={12}>
              <Button variant="outlined" color="warning" fullWidth>
                Xem thêm
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
}
