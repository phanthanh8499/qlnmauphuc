import {
  Button,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  LOCAL_PATH,
  VOUCHERBG_BLUE,
  VOUCHERBG_GOLD,
  VOUCHERBG_RED,
} from "../../constants/Constants";
import { getGiftVoucherData } from "../../redux/Action";
import ImageMagnify from "./ImageMagnify";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import { useSnackbar } from "notistack";

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
    fontSize: "24px !important",
    fontWeight: "600 !important",
  },
  subTitle: {
    fontSize: "14px !important",
    color: "#666666",
  },
  progress: {
    height: 256,
  },
  voucherBox: {
    backgroundImage: `url("${VOUCHERBG_BLUE}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    height: "160px",
    backgroundSize: "427px 160px",
    padding: "25px",
  },
}));

export default function UGiftVoucher() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { id } = JSON.parse(localStorage.getItem("userInfo")).userInfo;

  const giftVoucher = useSelector((state) => state.giftVoucher);
  const { loading, giftVoucherData } = giftVoucher;

  const idSend = {
    id: id,
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(0);
  const [count, setCount] = useState(0);
  const handleChange = (event, value) => {
    setPage(value - 1);
  };

  useEffect(() => {
    dispatch(getGiftVoucherData(idSend));
  }, []);

  useEffect(() => {
    const rowsPerPage = 6;
    setRowsPerPage(rowsPerPage);
    setCount(Math.ceil(giftVoucherData.length / rowsPerPage));
  }, [giftVoucherData]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleClickCopy = (e, voucherid) => {
    navigator.clipboard.writeText(voucherid);
    enqueueSnackbar(`Đã sao chép ID: ${voucherid}`, {
      variant: "success",
      autoHideDuration: 2000,
    });
  };

  const renderCloth = () => {
    if (giftVoucherData.length >= 1) {
      return (
        rowsPerPage > 0
          ? giftVoucherData.slice(
              page * rowsPerPage,
              page * rowsPerPage + rowsPerPage
            )
          : giftVoucherData
      ).map((value, key) => {
        if (value.gv_discount === 10) {
          return (
            <Grid item xs={6}>
              <Grid
                container
                className={classes.voucherBox}
                align="right"
                sx={{ backgroundImage: `url("${VOUCHERBG_BLUE}")` }}
              >
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    sx={{ color: "#1976d2" }}
                  >
                    {value.gv_discription}
                  </Typography>
                  <Typography className={classes.subTitle}>
                    {value.id}
                  </Typography>
                  <Typography className={classes.subTitle}>
                    Ngày hết hạn: {formatDate(value.gv_expirationdate)}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={(e) => handleClickCopy(e, value.id)}
                  >
                    Sử dụng
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        } else if(value.gv_discount === 15){
          return (
            <Grid item xs={6}>
              <Grid
                container
                className={classes.voucherBox}
                align="right"
                sx={{ backgroundImage: `url("${VOUCHERBG_RED}")` }}
              >
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    sx={{ color: "#d32f2f" }}
                  >
                    {value.gv_discription}
                  </Typography>
                  <Typography className={classes.subTitle}>
                    {value.id}
                  </Typography>
                  <Typography className={classes.subTitle}>
                    Ngày hết hạn: {formatDate(value.gv_expirationdate)}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={(e) => handleClickCopy(e, value.id)}
                  >
                    Sử dụng
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        } else {
          return (
            <Grid item xs={6}>
              <Grid
                container
                className={classes.voucherBox}
                align="right"
                sx={{ backgroundImage: `url("${VOUCHERBG_GOLD}")` }}
              >
                <Grid item xs={12}>
                  <Typography
                    className={classes.title}
                    sx={{ color: "#ED6C02" }}
                  >
                    {value.gv_discription}
                  </Typography>
                  <Typography className={classes.subTitle}>
                    {value.id}
                  </Typography>
                  <Typography className={classes.subTitle}>
                    Ngày hết hạn: {formatDate(value.gv_expirationdate)}
                  </Typography>
                  <Button
                    variant="outlined"
                    color="warning"
                    fullWidth
                    onClick={(e) => handleClickCopy(e, value.id)}
                  >
                    Sử dụng
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          );
        }
      });
    } else
      return (
        <Grid item xs={12} sx={{ height: 256 }} className={classes.root}>
          <Grid container>
            <Grid item xs={12} sx={center}>
              <CardGiftcardIcon sx={{ fontSize: 200 }} />
            </Grid>
            <Grid item xs={12} sx={center}>
              <Typography variant="h6">Không có quà tặng</Typography>
            </Grid>
          </Grid>
        </Grid>
      );
  };
  return (
    <Grid container spacing={1}>
      {loading ? (
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
