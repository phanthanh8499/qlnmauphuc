import { Button, Divider, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  editMeasurements,
  getDetailMeasurements,
} from "../../../../redux/Action";

export default function Shirt(props) {
  let { id } = useParams();
  const measurements = useSelector((state) => state.measurements);
  const { detailData } = measurements;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDetail() {
      detailData[0].m_neckline === 0
        ? setNeckline("")
        : setNeckline(detailData[0].m_neckline);
      detailData[0].m_bust === 0 ? setBust("") : setBust(detailData[0].m_bust);
      detailData[0].m_waist === 0
        ? setWaist("")
        : setWaist(detailData[0].m_waist);
      detailData[0].m_buttock === 0
        ? setButtock("")
        : setButtock(detailData[0].m_buttock);
      detailData[0].m_shoulderwidth === 0
        ? setShoulderwidth("")
        : setShoulderwidth(detailData[0].m_shoulderwidth);
      detailData[0].m_wristaround === 0
        ? setWristaround("")
        : setWristaround(detailData[0].m_wristaround);
      detailData[0].m_sleevelength === 0
        ? setSleevelength("")
        : setSleevelength(detailData[0].m_sleevelength);
      detailData[0].m_shirtlength === 0
        ? setShirtlength("")
        : setShirtlength(detailData[0].m_shirtlength);
      setLoading(false);
    }
    getDetail();
  }, []);

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", parseInt(detailData[0].id));
    formData.append("m_userid", detailData[0].m_userid);
    formData.append("m_neckline", neckline);
    formData.append("m_bust", bust);
    formData.append("m_waist", waist);
    formData.append("m_buttock", buttock);
    formData.append("m_shoulderwidth", shoulderwidth);
    formData.append(
      "m_armpitcircumference",
      detailData[0].m_armpitcircumference
    );
    formData.append("m_biceps", detailData[0].m_biceps);
    formData.append("m_wristaround", wristaround);
    formData.append("m_sleevelength", sleevelength);
    formData.append("m_shirtlength", shirtlength);
    formData.append("m_crotchlength", detailData[0].m_crotchlength);
    formData.append("m_thighcircumference", detailData[0].m_thighcircumference);
    formData.append("m_dresslength", detailData[0].m_dresslength);
    formData.append("m_pantslength", detailData[0].m_pantslength);
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
      dispatch(editMeasurements(formData));
      dispatch(getDetailMeasurements(id));
      enqueueSnackbar("Ch???nh s???a th??ng tin th??nh c??ng", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };
  return (
    <>
      {loading ? (
        <div>loading ...</div>
      ) : (
        <>
          <TextField
            id="neckline"
            label="V??ng c???"
            placeholder="??o v??ng quanh ch??n c???"
            margin="normal"
            defaultValue={neckline}
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
            defaultValue={bust}
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
            defaultValue={waist}
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
            defaultValue={buttock}
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
            defaultValue={shoulderwidth}
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
            defaultValue={wristaround}
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
            defaultValue={sleevelength}
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
            defaultValue={shirtlength}
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
            L??u thay ?????i
          </Button>
        </>
      )}
    </>
  );
}
