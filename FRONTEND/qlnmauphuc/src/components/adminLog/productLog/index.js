import {
  Button,
  ButtonGroup,
  Dialog,
  Grid,
  TextField,
  Divider,
  CircularProgress,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { CurrencyFormatCustom } from "../../utility/Utility";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  img: {
    width: 300,
    height: 300,
  },
  btngroup: {
    float: "right",
    marginTop: 20,
  },
  image: {
    margin: "30px 10px 10px 10px",
  },
  label: {
    color: "#00000099",
    padding: 0,
    fontFamily: `"Roboto", "Helvetica", "Arial", sans-serif`,
    fontWeight: 400,
    lineHeight: 1,
    letterSpacing: "0.00938em",
    fontSize: 13,
  },
  input: {
    display: "none",
  },
  sliderBox: {
    margin: "0px 50px 0px 7px !important",
  },
  detailBox: {
    padding: "0px 20px",
  },
  marginLeft: {
    margin: "0px 0px 0px 9px",
  },
  box: {
    margin: "0px 4px",
  },
}));

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export function ProductLog(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose, id, dataReq } = props;
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [productTypeList, setProductTypeList] = useState([]);
  useEffect(() => {
    async function getProductLogDetail() {
      const { data } = await axios.get(`/getProductLogDetail.${dataReq.id}`);
      setData(data);
    }
    getProductLogDetail();
    async function getProductType() {
      const { data } = await axios.get("/getProductTypeData");
      setProductTypeList(data);
      setLoading(false);
    }
    getProductType();
  }, []);

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="xs"
    >
      <Grid container className={classes.root}>
        {loading ? (
          <Grid
            item
            xs={12}
            sx={{
              height: 320,
              width: 443,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid container className={classes.box}>
              <Grid item xs={12} align="center">
                <Typography
                  sx={{ color: "#1976d2", fontSize: 20, fontWeight: 600 }}
                >
                  Chi tiết chỉnh sửa sản phẩm {dataReq.productid}
                </Typography>
                <Typography
                  sx={{ color: "#1976d2", fontSize: 16, fontWeight: 600 }}
                >
                  {dataReq.description.substring(
                    dataReq.description.lastIndexOf("sản phẩm") + 9
                  )}
                </Typography>
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              {data.pld_old_typeid === data.pld_new_typeid ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_typeid"
                    label="Loại sản phẩm cũ"
                    defaultValue={
                      productTypeList.filter(
                        (item) => item.id === data.pld_old_typeid
                      )[0].pt_name
                    }
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_typeid"
                    label="Loại sản phẩm mới"
                    color="success"
                    defaultValue={
                      productTypeList.filter(
                        (item) => item.id === data.pld_new_typeid
                      )[0].pt_name
                    }
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_name === data.pld_new_name ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_name"
                    label="Tên sản phẩm cũ"
                    defaultValue={data.pld_old_name}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_name"
                    label="Tên sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_name}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_price === data.pld_new_price ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_price"
                    label="Giá sản phẩm cũ"
                    defaultValue={data.pld_old_price}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                      inputComponent: CurrencyFormatCustom,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_price"
                    label="Giá sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_price}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                      inputComponent: CurrencyFormatCustom,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_color === data.pld_new_color ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_color"
                    label="Màu sản phẩm cũ"
                    defaultValue={data.pld_old_color}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_color"
                    label="Màu sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_color}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_size === data.pld_new_size ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_size"
                    label="Size sản phẩm cũ"
                    defaultValue={data.pld_old_size}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_size"
                    label="Size sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_size}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_material === data.pld_new_material ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_material"
                    label="Chất liệu sản phẩm cũ"
                    defaultValue={data.pld_old_material}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_material"
                    label="Chất liệu sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_material}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_lining === data.pld_new_lining ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_lining"
                    label="Lớp lót sản phẩm cũ"
                    defaultValue={data.pld_old_lining}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_lining"
                    label="Lớp lót sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_lining}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_thickness === data.pld_new_thickness ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_thickness"
                    label="Độ dày sản phẩm cũ"
                    defaultValue={data.pld_old_thickness}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_thickness"
                    label="Độ dày sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_thickness}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_softness === data.pld_new_softness ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_softness"
                    label="Độ mềm sản phẩm cũ"
                    defaultValue={data.pld_old_softness}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_softness"
                    label="Độ mềm sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_softness}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_elasticity === data.pld_new_elasticity ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_elasticity"
                    label="Độ co giãn sản phẩm cũ"
                    defaultValue={data.pld_old_elasticity}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_elasticity"
                    label="Độ co giãn sản phẩm mới"
                    color="success"
                    defaultValue={data.pld_new_elasticity}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_introduction1 ===
              data.pld_new_introduction1 ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_introduction1"
                    label="Giới thiệu sản phẩm 1 cũ"
                    defaultValue={data.pld_old_introduction1}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_introduction1"
                    label="Giới thiệu sản phẩm 1 mới"
                    color="success"
                    defaultValue={data.pld_new_introduction1}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_introduction2 ===
              data.pld_new_introduction2 ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_introduction2"
                    label="Giới thiệu sản phẩm 2 cũ"
                    defaultValue={data.pld_old_introduction2}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_introduction2"
                    label="Giới thiệu sản phẩm 2 mới"
                    color="success"
                    defaultValue={data.pld_new_introduction2}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_introduction3 ===
              data.pld_new_introduction3 ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_introduction3"
                    label="Giới thiệu sản phẩm 3 cũ"
                    defaultValue={data.pld_old_introduction3}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_introduction3"
                    label="Giới thiệu sản phẩm 3 mới"
                    color="success"
                    defaultValue={data.pld_new_introduction3}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_introduction4 ===
              data.pld_new_introduction4 ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_introduction4"
                    label="Giới thiệu sản phẩm 4 cũ"
                    defaultValue={data.pld_old_introduction4}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_introduction4"
                    label="Giới thiệu sản phẩm 4 mới"
                    color="success"
                    defaultValue={data.pld_new_introduction4}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_introduction5 ===
              data.pld_new_introduction5 ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_introduction5"
                    label="Giới thiệu sản phẩm 5 cũ"
                    defaultValue={data.pld_old_introduction5}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_introduction5"
                    label="Giới thiệu sản phẩm 5 mới"
                    color="success"
                    defaultValue={data.pld_new_introduction5}
                    margin="normal"
                    size="small"
                    focused
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                    }}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <ButtonGroup className={classes.btngroup}>
                  <Button variant="outlined" color="error" onClick={onClose}>
                    Đóng
                  </Button>
                </ButtonGroup>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
}
