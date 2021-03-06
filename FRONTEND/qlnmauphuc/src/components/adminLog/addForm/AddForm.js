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
import { NumberFormatCustom } from "../../utility/Utility";

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

function DetailForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose, id, dataReq } = props;
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [productTypeList, setProductTypeList] = useState([])
  console.log(dataReq);
  useEffect(() => {
    async function getProductLogDetail() {
      const { data } = await axios.get(`/getProductLogDetail.${dataReq.id}`);
      console.log(data);
      setData(data);
    }
    async function getClothLogDetail() {
      const { data } = await axios.get(`/getClothLogDetail.${dataReq.id}`);
      console.log(data);
      setData(data);
    }
    if (dataReq.eventtypeid === "EPF") {
      getProductLogDetail();
    } else {
      getClothLogDetail();
    }
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
                  Chi ti???t ch???nh s???a s???n ph???m {dataReq.productid}
                </Typography>
                <Divider />
              </Grid>
              {data.pld_old_typeid === data.pld_new_typeid ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_typeid"
                    label="Lo???i s???n ph???m c??"
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
                    label="Lo???i s???n ph???m m???i"
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
                    label="T??n s???n ph???m c??"
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
                    label="T??n s???n ph???m m???i"
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
                    label="Gi?? s???n ph???m c??"
                    defaultValue={data.pld_old_price}
                    margin="normal"
                    size="small"
                    error
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      readOnly: true,
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                  <ArrowForwardIcon color="primary" />
                  <TextField
                    id="pld_new_price"
                    label="Gi?? s???n ph???m m???i"
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
                      inputComponent: NumberFormatCustom,
                    }}
                  />
                </Grid>
              )}
              {data.pld_old_color === data.pld_new_color ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="pld_old_color"
                    label="M??u s???n ph???m c??"
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
                    label="M??u s???n ph???m m???i"
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
                    label="Size s???n ph???m c??"
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
                    label="Size s???n ph???m m???i"
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
                    label="Ch???t li???u s???n ph???m c??"
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
                    label="Ch???t li???u s???n ph???m m???i"
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
                    label="L???p l??t s???n ph???m c??"
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
                    label="L???p l??t s???n ph???m m???i"
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
                    label="????? d??y s???n ph???m c??"
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
                    label="????? d??y s???n ph???m m???i"
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
                    label="????? m???m s???n ph???m c??"
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
                    label="????? m???m s???n ph???m m???i"
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
                    label="????? co gi??n s???n ph???m c??"
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
                    label="????? co gi??n s???n ph???m m???i"
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
                    label="Gi???i thi???u s???n ph???m 1 c??"
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
                    label="Gi???i thi???u s???n ph???m 1 m???i"
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
                    label="Gi???i thi???u s???n ph???m 2 c??"
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
                    label="Gi???i thi???u s???n ph???m 2 m???i"
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
                    label="Gi???i thi???u s???n ph???m 3 c??"
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
                    label="Gi???i thi???u s???n ph???m 3 m???i"
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
                    label="Gi???i thi???u s???n ph???m 4 c??"
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
                    label="Gi???i thi???u s???n ph???m 4 m???i"
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
                    label="Gi???i thi???u s???n ph???m 5 c??"
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
                    label="Gi???i thi???u s???n ph???m 5 m???i"
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
            </Grid>
            <Grid item xs={12}>
              <ButtonGroup className={classes.btngroup}>
                <Button variant="outlined" color="error" onClick={onClose}>
                  ????ng
                </Button>
              </ButtonGroup>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
}

export default DetailForm;
