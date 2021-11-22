import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Badge,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Tab,
} from "@mui/material";
import { getProductData } from "../../redux/Action";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import axios from "axios";

const MyBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "-10px",
  },
}));

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  padding: "12px 21px",
}));

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px -5px 0px !important",
  },
  img: {
    height: 100,
    width: 100,
  },
}));

export default function AdminLog() {
  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const { productData, error } = products;
  const dispatch = useDispatch();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getActivityLog(){
      const {data} = await axios.get(`/getActivityLog`)
      for (let i = 0; i < data.length; i++) {
        data[i] = {...data[i], stt: i+1}
      }
      setData(data)
      setLoading(false);
    }
    getActivityLog()
  }, []);


  return (
    <Grid container component={Paper}>
      {loading ? (
        <Grid
          item
          xs={12}
          sx={{
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "570px",
            backgroundColor: "rgb(0 0 0 / 2%);",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          <Grid item xs={12}>
            <Divider sx={{ margin: "0px 0px 5px 0px" }} />
          </Grid>

          <Grid item xs={12}>
            <Data data={data} />
          </Grid>
        </>
      )}
    </Grid>
  );
}
