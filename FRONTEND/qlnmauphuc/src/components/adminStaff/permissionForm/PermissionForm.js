import {
  Button,
  ButtonGroup,
  Dialog,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import makeStyles from "@mui/styles/makeStyles";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "15px 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
  },
  img: {
    fontSize: "125px !important",
    color: "#ff0000",
  },
  title: {
    fontSize: "20px !important",
    fontWeight: "500 !important",
    color: "#1976d2",
  },
}));

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function PermissionForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { open, onClose, id, listId } = props;

  const handleSubmit = () => {
    if (listId.length !== 0) {
      listId.forEach((element) => {
        // dispatch(deleteUser(element.id));
      });
    } else {
      // dispatch(deleteUser(parseInt(id)));
    }
    enqueueSnackbar("Phân quyền thành công", {
      variant: "success",
      autoHideDuration: 2000,
    });
    onClose();
  };

  const [product, setProduct] = useState(true);
  const [order, setOrder] = useState(true);
  const [cloth, setCloth] = useState(true);
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
    >
      <Grid container className={classes.root}>
        <Grid item xs={12} sx={center}>
          <Typography className={classes.title}>Phân quyền</Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mt: 0.5, mb: 0.5 }} />
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel
                control={
                  <Switch
                    checked={product}
                    onChange={(e) => setProduct(!product)}
                    name="product"
                  />
                }
                label="Quản lý sản phẩm"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={order}
                    onChange={(e) => setOrder(!order)}
                    name="order"
                  />
                }
                label="Quản lý hoá đơn"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={cloth}
                    onChange={(e) => setCloth(!cloth)}
                    name="cloth"
                  />
                }
                label="Quản lý vải"
              />
            </FormGroup>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <Divider sx={{ mt: 0.5, mb: 0.5 }} />
          <ButtonGroup sx={{ float: "right" }}>
            <Button variant="outlined" color="error" onClick={onClose}>
              Huỷ bỏ
            </Button>
            <Button variant="outlined" color="primary" onClick={handleSubmit}>
              Xác nhận
            </Button>
          </ButtonGroup>
        </Grid>
      </Grid>
    </Dialog>
  );
}

export default PermissionForm;
