import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { makeStyles } from "@mui/styles";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";

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
  return (
    <Grid container>
      <Grid item xs={3}>
        <Item sx={center}>
          <Grid container>
            <Grid item xs={12} sx={center}>
              <ListAltOutlinedIcon className={classes.iconSize} />
            </Grid>
            <Grid item xs={12} sx={center}>
              <Typography variant="h5">123</Typography>
            </Grid>
            <Grid item xs={12} sx={center}>
              <Typography className={classes.subTitle}>Số hoá đơn</Typography>
            </Grid>
          </Grid>
        </Item>
      </Grid>
      <Grid item xs={3}>
        <Item sx={center}>
          <Grid container>
            <Grid item xs={12} sx={center}>
              <AssignmentTurnedInOutlinedIcon className={classes.iconSize} />
            </Grid>
            <Grid item xs={12} sx={center}>
              <Typography variant="h5">123</Typography>
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
              <Typography variant="h5">123</Typography>
            </Grid>
            <Grid item xs={12} sx={center}>
              <Typography className={classes.subTitle}>Nhân viên</Typography>
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
              <Typography variant="h5">90%</Typography>
            </Grid>
            <Grid item xs={12} sx={center}>
              <Typography className={classes.subTitle}>Tăng trưởng</Typography>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
}
