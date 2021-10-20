import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import { styled } from "@mui/material/styles";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import { makeStyles } from "@mui/styles";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import QueryStatsOutlinedIcon from "@mui/icons-material/QueryStatsOutlined";
import DataCount from "./DataCount";
import PStackChart from "./PStackChart";
import PPipeChart from "./PPipeChart";

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

export default function AdminProject() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <DataCount />
      </Grid>
      <Grid item xs={12} sx={{ mt: 1 }}>
        <Grid container spacing={1}>
          <Grid item xs={5}>
            <Item sx={{ height: 400 }}>
              <Typography>abc</Typography>
              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              <PPipeChart />
            </Item>
          </Grid>
          <Grid item xs={7}>
            <Item sx={{ height: 400 }}>
              <Typography>abc</Typography>
              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              <PStackChart />
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
