import { Button, Divider, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMeasurements, getMeasurementsData } from "../../../../redux/Action";

export default function Shirt() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [neckline, setNeckline] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [buttock, setButtock] = useState("");
  const [shoulderwidth, setShoulderwidth] = useState("");
  const [wristaround, setWristaround] = useState("");
  const [sleevelength, setSleevelength] = useState("");
  const [shirtlength, setShirtlength] = useState("");
  const getParamsNeckline = (event) => {
    setNeckline(event.target.value);
  };
  const getParamsBust = (event) => {
    setBust(event.target.value);
  };
  const getParamsWaist = (event) => {
    setWaist(event.target.value);
  };
  const getParamsButtock = (event) => {
    setButtock(event.target.value);
  };
  const getParamsShoulderwidth = (event) => {
    setShoulderwidth(event.target.value);
  };
  const getParamsWristaround = (event) => {
    setWristaround(event.target.value);
  };
  const getParamsSleevelength = (event) => {
    setSleevelength(event.target.value);
  };
  const getParamsShirtlength = (event) => {
    setShirtlength(event.target.value);
  };
  const { id } = JSON.parse(localStorage.getItem("userInfo")).userInfo;
  console.log(id);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", 1);
    formData.append("m_userid", id);
    formData.append("m_neckline", neckline);
    formData.append("m_bust", bust);
    formData.append("m_waist", waist);
    formData.append("m_buttock", buttock);
    formData.append("m_shoulderwidth", shoulderwidth);
    formData.append("m_armpitcircumference", 0);
    formData.append("m_biceps", 0);
    formData.append("m_wristaround", wristaround);
    formData.append("m_sleevelength", sleevelength);
    formData.append("m_shirtlength", shirtlength);
    formData.append("m_crotchlength", 0);
    formData.append("m_thighcircumference", 0);
    formData.append("m_dresslength", 0);
    formData.append("m_pantslength", 0);
    formData.append("m_gender", "male");
    if (
      !neckline ||
      !bust ||
      !waist ||
      !buttock ||
      !shoulderwidth ||
      !wristaround ||
      !sleevelength ||
      !shirtlength
    ) {
      enqueueSnackbar("H??y ??i???n ?????y ????? th??ng tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      dispatch(addMeasurements(formData));
      dispatch(getMeasurementsData(id));
      enqueueSnackbar("Th??m s??? ??o th??nh c??ng", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <>
      <TextField
        id="neckline"
        label="V??ng c???"
        placeholder="??o v??ng quanh ch??n c???"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsNeckline}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="bust"
        label="V??ng ng???c"
        placeholder="??o v??ng quanh ng???c, ch??? n??? nh???t"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsBust}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="waist"
        label="V??ng eo"
        placeholder="??o v??ng quanh eo"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsWaist}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="buttock"
        label="V??ng m??ng"
        placeholder="??o v??ng quanh m??ng, ch??? n??? nh???t"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsButtock}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="shoulderwidth"
        label="R???ng vai"
        placeholder="T??? ?????u vai tr??i sang ?????u vai ph???i"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsShoulderwidth}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="wristaround"
        label="C???a tay"
        placeholder="??o v??ng quanh n???m tay"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsWristaround}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="sleevelength"
        label="D??i tay"
        placeholder="T??? ?????u vai ?????n qua kh???i m???t c?? tay"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsSleevelength}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="shirtlength"
        label="D??i ??o"
        placeholder="T??? ?????t x????ng c??? th??? 7 ?????n ngang m??ng"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsShirtlength}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Divider />
      <Button
        variant="outlined"
        color="primary"
        fullWidth
        sx={{ margin: "5px 0px 0px 0px" }}
        onClick={handleSubmit}
      >
        Th??m s??? ??o
      </Button>
    </>
  );
}
