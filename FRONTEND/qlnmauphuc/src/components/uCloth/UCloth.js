import { CircularProgress, Grid, Pagination, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LOCAL_PATH } from "../../constants/Constants";
import { getMyClothData } from "../../redux/Action";
import ImageMagnify from "./ImageMagnify";

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    boxShadow: "0 0 0 1px rgb(0 0 0 / 10%) inset",
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  img: {
    height: 134,
    width: 134,
  },
  title: {
    fontSize: "14px !important",
    fontWeight: "600 !important",
  },
  subTitle: {
    fontSize: "14px !important",
    color: "#666666",
  },
  progress: {
    height: 256,
  },
}));

export default function UCloth() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const {id} = JSON.parse(localStorage.getItem('userInfo')).userInfo

  const cloth = useSelector(state => state.cloth)
  const { loadingMyData, myClothData } = cloth;


  const idSend = {
    cloth_userid: id,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [count, setCount] = useState(0);
  const handleChange = (event, value) => {
    setPage(value - 1);
  };
  
  
  useEffect(() => {
    dispatch(getMyClothData(idSend));
  }, [])

  useEffect(() => {
    const rowsPerPage = 4;
    setRowsPerPage(rowsPerPage);
    setCount(Math.ceil(myClothData.length / rowsPerPage));
  }, [myClothData]);

  const renderCloth = () => {
    return (
      rowsPerPage > 0
        ? myClothData.slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
          )
        : myClothData
    ).map((value, key) => (
      <Grid item xs={6}>
        <Grid container className={classes.root}>
          <Grid item xs={4} sx={center}>
            {/* <img
              src= {LOCAL_PATH + value.cloth_image.substring(2)}
              alt={value.cloth_name}
              className={classes.img}
            /> */}
            <ImageMagnify
              image={LOCAL_PATH + value.cloth_image.substring(2)}
              name={value.cloth_name}
            ></ImageMagnify>
          </Grid>
          <Grid item xs={8} sx={{ padding: "0px 5px" }}>
            <Grid container>
              <Grid item xs={12}>
                <Typography className={classes.title}>
                  {value.cloth_name}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.subTitle}>
                  Thành phần: {value.cloth_material}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography className={classes.subTitle}>
                  Còn lại: {value.cloth_quantity} (mét)
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    ));
  }
  const loading = true;
  return (
    <Grid container spacing={1}>
      {loadingMyData ? (
        <Grid item xs={12} className={classes.progress} sx={center}>
          <CircularProgress />
        </Grid>
      ) : (
        <>
          {renderCloth()}
          <Grid item xs={12} sx={center}>
            <Pagination
              count={count}
              page={page + 1}
              onChange={handleChange}
              variant="outlined"
              color="primary"
            />
          </Grid>
        </>
      )}
    </Grid>
  );
}
