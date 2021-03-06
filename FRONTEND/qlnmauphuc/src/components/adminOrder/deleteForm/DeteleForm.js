import { Button, Dialog, Grid, Stack, Typography } from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { deleteOrder } from "../../../redux/Action";
import { format } from "date-fns";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "15px 0px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  img: {
    fontSize: "125px !important",
    color: "#ff0000",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    margin: "10px 0px",
  },
}));

function DeleteForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id, listId, orderStatus, userid } = props;
  const handleSubmit = () => {
    if (listId.length !== 0) {
      listId.forEach((element) => {
        if (
          element.order_statusid === 0 ||
          element.order_statusid === 10
        ) {
          const now = new Date();
          dispatch(
            deleteOrder({
              od_orderid: element.od_orderid,
              log_date: format(now, "yyyy-MM-dd HH:mm:ss"),
              log_userid: userid,
              log_eventtypeid: "DOF",
            })
          );
        } 
      });
    } else {
      if (orderStatus === 0 || orderStatus === 10){
        const now = new Date();
        dispatch(
          deleteOrder({
            od_orderid: id,
            log_date: format(now, "yyyy-MM-dd HH:mm:ss"),
            log_userid: userid,
            log_eventtypeid: "DOF",
          })
        );
      } else {
        enqueueSnackbar("Không thể xoá đơn hàng này", {
          variant: "error",
          autoHideDuration: 2000,
        });
        onClose();
        return false;
      }
    }
    enqueueSnackbar("Xoá đơn hàng thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
    onClose();
  };
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
    >
      <Grid container className={classes.root}>
        <ErrorOutlineIcon className={classes.img}></ErrorOutlineIcon>
        <Grid item xs={12}>
          <Stack
            spacing={1}
            className={clsx(classes.center, classes.title)}
            xs={{ mb: 2 }}
          >
            <Typography variant="h5">Xác nhận xoá?</Typography>
            <Typography>Bạn có chắc chắn muốn xoá</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" className={classes.center}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Xác nhận xoá
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default DeleteForm;
