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

export function ClothLog(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose, id, dataReq } = props;
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [clothTypeList, setClothTypeList] = useState([]);
  useEffect(() => {
    async function getClothLogDetail() {
      const { data } = await axios.get(`/getClothLogDetail.${dataReq.id}`);
      console.log(data)
      setData(data);
    }
    getClothLogDetail();
    async function getClothType() {
      const { data } = await axios.get("/getClothTypeData");
      console.log(data)
      setClothTypeList(data);
      setLoading(false);
    }
    getClothType();
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
                  Chi tiết chỉnh sửa vải
                </Typography>
                <Typography
                  sx={{ color: "#1976d2", fontSize: 16, fontWeight: 600 }}
                >
                  {dataReq.productid.substring(
                    dataReq.productid.lastIndexOf("(ID")
                  )}
                </Typography>
                <Divider sx={{mt: 0.5, mb: 0.5}}/>
              </Grid>
              {data.cld_old_typeid === data.cld_new_typeid ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="cld_old_typeid"
                    label="Loại vải cũ"
                    defaultValue={
                      clothTypeList.filter(
                        (item) => item.id === data.cld_old_typeid
                      )[0].ct_name
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
                    id="cld_new_typeid"
                    label="Loại vải mới"
                    color="success"
                    defaultValue={
                      clothTypeList.filter(
                        (item) => item.id === data.cld_new_typeid
                      )[0].ct_name
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
              {data.cld_old_name === data.cld_new_name ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="cld_old_name"
                    label="Tên vải cũ"
                    defaultValue={data.cld_old_name}
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
                    id="cld_new_name"
                    label="Tên vải mới"
                    color="success"
                    defaultValue={data.cld_new_name}
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
              {data.cld_old_quantity === data.cld_new_quantity ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="cld_old_quantity"
                    label="Số lượng vải cũ"
                    defaultValue={data.cld_old_quantity}
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
                    id="cld_new_quantity"
                    label="Số lượng vải mới"
                    color="success"
                    defaultValue={data.cld_name_quantity}
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

