import {
  Button,
  ButtonGroup,
  Dialog,
  Grid,
  TextField,
  Divider,
  CircularProgress,
  Typography,
  FormControlLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { IOSSwitch, NumberFormatCustom } from "../../utility/Utility";

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

export function UserLog(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { onClose, id, dataReq } = props;
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [clothTypeList, setClothTypeList] = useState([]);
  useEffect(() => {
    async function getUserLogDetail() {
      const { data } = await axios.get(`/getUserLogDetail.${dataReq.id}`);
      console.log(data)
      setData(data);
      setLoading(false);
    }
    getUserLogDetail();
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
                  Chi tiết chỉnh sửa tài khoản
                </Typography>
                <Typography
                  sx={{ color: "#1976d2", fontSize: 16, fontWeight: 600 }}
                >
                  {dataReq.description.substring(
                    dataReq.description.lastIndexOf("tài khoản") + 10
                  )}
                </Typography>
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              {data.uld_new_lastname === data.uld_old_lastname ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="uld_old_lastname"
                    label="Họ cũ"
                    defaultValue={data.uld_old_lastname}
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
                    id="uld_new_lastname"
                    label="Họ mới"
                    color="success"
                    defaultValue={data.uld_new_lastname}
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
              {data.uld_old_firstname === data.uld_new_firstname ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="uld_old_firstname"
                    label="Tên cũ"
                    defaultValue={data.uld_old_firstname}
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
                    id="uld_new_firstname"
                    label="Tên mới"
                    color="success"
                    defaultValue={data.uld_new_firstname}
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
              {data.uld_old_tel === data.uld_new_tel ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="uld_old_tel"
                    label="Số điện thoại cũ"
                    defaultValue={data.uld_old_tel}
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
                    id="uld_new_tel"
                    label="Số điện thoại mới"
                    color="success"
                    defaultValue={data.uld_new_tel}
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
              {data.uld_old_email === data.uld_new_email ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="uld_old_email"
                    label="Email cũ"
                    defaultValue={data.uld_old_email}
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
                    id="uld_new_email"
                    label="Email mới"
                    color="success"
                    defaultValue={data.uld_new_email}
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
              {data.uld_old_address === data.uld_new_address ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="uld_old_address"
                    label="Địa chỉ cũ"
                    defaultValue={data.uld_old_address}
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
                    id="uld_new_address"
                    label="Địa chỉ mới"
                    color="success"
                    defaultValue={data.uld_new_address}
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
              {data.uld_old_status === data.uld_new_status ? null : (
                <Grid item xs={12} sx={center}>
                  <TextField
                    id="uld_old_status"
                    label="Trạng thái cũ"
                    defaultValue={
                      data.uld_old_status === "block" ? "Đã khóa" : "Hoạt động"
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
                    id="uld_new_status"
                    label="Trạng thái mới"
                    color="success"
                    defaultValue={
                      data.uld_new_status === "block" ? "Đã khóa" : "Hoạt động"
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

