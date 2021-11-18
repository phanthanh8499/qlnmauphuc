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
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import makeStyles from "@mui/styles/makeStyles";
import axios from "axios";

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
  const { open, onClose, id, listId } = props;

  const handleSubmit = async () => {
    const dataSend = {
      up_userid: id,
      up_eccommercedashboard: dDashboard,
      up_orderdashboard: dOrder,
      up_customeraccountmanager: customer,
      up_staffaccountmanager: staff,
      up_productmanager: product,
      up_clothmanager: cloth,
      up_ordermanager: order,
    };
    if (listId.length !== 0) {
      listId.forEach((element) => {
        // dispatch(deleteUser(element.id));
      });
    } else {
      const { data } = await axios.post(`/editUserPermissions`, dataSend);
      if(data === "ERROR"){
        enqueueSnackbar("Phân quyền thất bại", {
          variant: "error",
          autoHideDuration: 2000,
        });
      } else {
        enqueueSnackbar("Phân quyền thành công", {
          variant: "success",
          autoHideDuration: 2000,
        });
      }
    }
    onClose();
  };

  const [dDashboard, setDDashboard] = useState(true);
  const [dOrder, setDOrder] = useState(true);
  const [customer, setCustomer] = useState(true);
  const [staff, setStaff] = useState(true);
  const [product, setProduct] = useState(true);
  const [order, setOrder] = useState(true);
  const [cloth, setCloth] = useState(true);
  useEffect(() => {
    async function setState() {
      const {data} = await axios.get(`/getUserPermissions.${id}`)
      setDDashboard(data[0].up_eccommercedashboard);
      setDOrder(data[0].up_orderdashboard);
      setCustomer(data[0].up_customeraccountmanager);
      setStaff(data[0].up_staffaccountmanager);
      setProduct(data[0].up_productmanager);
      setCloth(data[0].up_clothmanager);
      setOrder(data[0].up_ordermanager);
    }
    setState()
  }, [id])

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
                    checked={dDashboard}
                    onChange={(e) => setDDashboard(!dDashboard)}
                    name="dDashboard"
                  />
                }
                label="Bảng điều khiển - Thương mại"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={dOrder}
                    onChange={(e) => setDOrder(!dOrder)}
                    name="dOrder"
                  />
                }
                label="Bảng điều khiển - Tình trạng hoá đơn"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={customer}
                    onChange={(e) => setCustomer(!customer)}
                    name="customer"
                  />
                }
                label="Quản lý tài khoản khách hàng"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={staff}
                    onChange={(e) => setStaff(!staff)}
                    name="staff"
                  />
                }
                label="Quản lý tài khoản nhân viên"
              />
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
                label="Quản lý đơn hàng"
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
