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
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
import { changeStatusUser } from "../../../redux/Action";
import ChangeCircleIcon from "@mui/icons-material/ChangeCircle";
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
    color: "#0095ff",
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

function ChangeForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id, listId, dataReq, userid} = props;
  const handleSubmit = () => {
    if (listId.length !== 0) {
      listId.forEach((element) => {
        if (element.user_status === "active") {
          const formData = new FormData();
          const now = new Date();
          formData.append("log_date", format(now, "yyyy-MM-dd HH:mm:ss"));
          formData.append("log_userid", userid);
          formData.append("log_eventtypeid", "BCA");
          formData.append("id", element.id);
          formData.append("user_username", element.user_username);
          formData.append("status", "block");
          dispatch(changeStatusUser(formData));
        } else {
          const formData = new FormData();
          const now = new Date();
          formData.append("log_date", format(now, "yyyy-MM-dd HH:mm:ss"));
          formData.append("log_userid", userid);
          formData.append("log_eventtypeid", "UCA");
          formData.append("id", element.id);
          formData.append("user_username", element.user_username);
          formData.append("status", "active");
          dispatch(changeStatusUser(formData));
        }
        
      });
    } else {
      dispatch(changeStatusUser(parseInt(id)));
    }
    enqueueSnackbar("Thay đổi trạng thái tài khoản thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
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
        <ChangeCircleIcon className={classes.img}></ChangeCircleIcon>
        <Grid item xs={12}>
          <Stack
            spacing={1}
            className={clsx(classes.center, classes.title)}
            xs={{ mb: 2 }}
          >
            <Typography variant="h5">Xác nhận thay thay đổi?</Typography>
            <Typography>Bạn có chắc chắn muốn thay đổi trạng thái</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Stack spacing={2} direction="row" className={classes.center}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Hủy bỏ
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Xác nhận thay đổi
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default ChangeForm;
