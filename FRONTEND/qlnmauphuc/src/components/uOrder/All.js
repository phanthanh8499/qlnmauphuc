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
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { LOCAL_PATH } from "../../constants/Constants";
import DeleteForm from "./deleteForm/DeteleForm";
import DetailForm from "./detailForm/DetailForm";

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
    "&:hover": {
      backgroundColor: "#f5f5f5",
    },
  },
  img: {
    width: 67,
    heigth: 67,
    borderRadius: '4px',
  },
  title: {
    fontSize: "14px !important",
    fontWeight: "600 !important",
  },
  subTitle: { fontSize: "14px !important", color: "#666666" },
}));

export default function All(props) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { userid, data } = props;

  const [loading, setLoading] = useState(true);
  const [dataRender, setDataRender] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [count, setCount] = useState(0);
  const handleChange = (event, value) => {
    setPage(value - 1);
  };
  useEffect(() => {
    const rowsPerPage = 3;
    setDataRender(data);
    setRowsPerPage(rowsPerPage);
    setCount(Math.ceil(data.length / rowsPerPage));
    setLoading(false);
  }, [data]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const handleClickEdit = (id) => {
    console.log("edit", id);

    console.log("edit", id);
  };

  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [orderid, setOrderid] = useState(0);
  const [orderSelected, setOrderSelected] = useState([])
  const openDetailForm = () => {
    setDetailForm(true);
  };
  const closeDetailForm = () => {
    setDetailForm(false);
  };

  const openDeleteForm = () => {
    setDeleteForm(true);
  };
  const closeDeleteForm = () => {
    setDeleteForm(false);
  };

  const handleClickDelete = (id) => {
    // setDeleteForm(true);
    openDeleteForm();
    setOrderid(id);
  };

  const handleClickDetail = (id) => {
    // setDetailForm(true);
    openDetailForm();
    setOrderid(parseInt(id));
    setOrderSelected(dataRender.filter((item) => item.id === parseInt(id)));
  };

  const renderForm = () => {
    if (deleteForm) {
      return (
        <DeleteForm
          open={deleteForm}
          onClose={closeDeleteForm}
          id={orderid}
        ></DeleteForm>
      );
    }
    if (detailForm) {
      return (
        <DetailForm
          open={detailForm}
          onClose={closeDetailForm}
          id={parseInt(orderid)}
          data={orderSelected[0]}
        ></DetailForm>
      );
    }
  };

  const renderData = () => {
    return (
      rowsPerPage > 0
        ? dataRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        : dataRender
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
              <Typography className={classes.subTitle}>
                Trạng thái: {value.os_name}
              </Typography>
              <Typography className={classes.subTitle}>
                Loại vải: {value.cloth_name}
              </Typography>
              <Typography className={classes.subTitle}>
                Tổng tiền:{" "}
                {value.order_total.toLocaleString("it-IT", {
                  style: "currency",
                  currency: "VND",
                })}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography className={classes.title}>Ngày đặt may:</Typography>
              <Typography className={classes.subTitle}>
                {formatDate(value.order_startdate)}
              </Typography>
              <Typography className={classes.title}>
                Ngày hoàn tất (dự định):
              </Typography>
              <Typography className={classes.subTitle}>
                {formatDate(value.order_enddate)}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        {value.order_statusid === 0 ? (
          <Grid item xs={2} sx={center}>
            <ButtonGroup>
              <IconButton
                onClick={() => handleClickDetail(value.id)}
                size="large"
              >
                <VisibilityIcon color="primary" />
              </IconButton>
            </ButtonGroup>
            <IconButton
              onClick={() => handleClickDelete(value.od_orderid)}
              size="large"
            >
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </Grid>
        ) : (
          <Grid item xs={2} sx={center}>
            <IconButton
              onClick={() => handleClickDetail(value.id)}
              size="large"
            >
              <VisibilityIcon color="primary" />
            </IconButton>
          </Grid>
        )}
      </Grid>
    ));
  };
  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
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
          {renderForm()}
        </Grid>
      )}
    </>
  );
}
