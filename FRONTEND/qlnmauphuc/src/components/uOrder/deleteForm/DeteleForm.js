import {
  Button,
  Dialog,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { cancelOrder, deleteOrder, deleteProduct, processingOrder } from "../../../redux/Action";

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
    margin: '10px 0px',
  },
}));

function DeleteForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id } = props;
  const handleSubmit = () => {
    enqueueSnackbar("Huỷ đơn hàng thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
    dispatch(
      processingOrder({
        order_statusid: 10,
        od_orderid: id,
      })
    );
    onClose();
  }
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
            <Typography variant="h5">Xác nhận huỷ đơn hàng?</Typography>
            <Typography>Bạn có chắc chắn muốn huỷ đơn hàng</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" className={classes.center}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Xác nhận huỷ
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default DeleteForm;
