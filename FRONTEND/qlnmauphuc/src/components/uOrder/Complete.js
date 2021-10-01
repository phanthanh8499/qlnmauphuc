import {
  ButtonGroup,
  Grid,
  IconButton,
  Typography,
  Pagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getOrderData } from "../../redux/Action";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LOCAL_PATH } from "../../constants/Constants";

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
    boxShadow: "0 0 0 1px rgb(0 0 0 / 10%) inset",
    margin: "0px 0px 5px 0px",
  },
  img: {
    width: 67,
    heigth: 67,
  },
  title: {
    fontSize: "14px !important",
    fontWeight: "600 !important",
  },
  subTitle: { fontSize: "14px !important", color: "#666666" },
}));

export default function Complete(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userid, data } = props;

  const handleClickEdit = () => {
    console.log("abc");
  };
  const handleClickDelete = () => {
    console.log("abc");
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [count, setCount] = useState(0);
  const handleChange = (event, value) => {
    setPage(value - 1);
  };
  useEffect(() => {
    const rowsPerPage = 3;
    setRowsPerPage(rowsPerPage);
    setCount(Math.ceil(data.length / rowsPerPage));
  }, [data]);

  const renderData = () => {
    return (
      rowsPerPage > 0
        ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : data
    ).map((value, key) => (
      <Grid container className={classes.root} key={key}>
        <Grid item xs={1} sx={center}>
          <img
            className={classes.img}
            src={LOCAL_PATH + value.product_image1.substring(2)}
            alt={value.product_name}
          ></img>
        </Grid>
        <Grid item xs={9}>
          <Grid container>
            <Grid item xs={8} sx={{ padding: "0px 10px" }}>
              <Typography className={classes.title}>
                {value.product_name}
              </Typography>
              {/* <Typography className={classes.subTitle}>
                  Phân loại: {productTypeName}
                </Typography> */}
              <Typography className={classes.subTitle}>
                Loại vải: {value.cloth_name}
              </Typography>
              <Typography className={classes.subTitle}>
                Tổng tiền: {value.order_total}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.title}>Ngày đặt may:</Typography>
              <Typography className={classes.subTitle}>
                {value.order_startdate}
              </Typography>
              <Typography className={classes.title}>
                Ngày hoàn tất (dự định):
              </Typography>
              <Typography className={classes.subTitle}>
                {value.order_enddate}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={2} sx={center}>
          <ButtonGroup>
            <IconButton onClick={handleClickEdit} size="large">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={handleClickDelete} size="large">
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </ButtonGroup>
        </Grid>
      </Grid>
    ));
  };
  return (
    <Grid container>
      <Grid item xs={12}>
        {renderData()}
      </Grid>
      <Grid item xs={12} sx={center}>
        <Pagination
          count={count}
          page={page + 1}
          onChange={handleChange}
          variant="outlined"
          color="primary"
        />
      </Grid>
    </Grid>
  );
}
