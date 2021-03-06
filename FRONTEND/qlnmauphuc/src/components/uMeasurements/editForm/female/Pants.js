import { Button, Divider, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  editMeasurements,
  getDetailMeasurements,
} from "../../../../redux/Action";

export default function Pants() {
  let { id } = useParams();
  const measurements = useSelector((state) => state.measurements);
  const { detailData } = measurements;
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [waist, setWaist] = useState("");
  const [buttock, setButtock] = useState("");
  const [dresslength, setDresslength] = useState("");
  const [pantslength, setPantslength] = useState("");
  const [thighcircumference, setThighcircumference] = useState("");
  const getParamsWaist = (event) => {
    setWaist(event.target.value);
  };
  const getParamsButtock = (event) => {
    setButtock(event.target.value);
  };
  const getParamsDresslength = (event) => {
    setDresslength(event.target.value);
  };
  const getParamsPantslength = (event) => {
    setPantslength(event.target.value);
  };
  const getParamsThighcircumference = (event) => {
    setThighcircumference(event.target.value);
  };
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getDetail() {
      detailData[0].m_waist === 0
        ? setWaist("")
        : setWaist(detailData[0].m_waist);
      detailData[0].m_buttock === 0
        ? setButtock("")
        : setButtock(detailData[0].m_buttock);
      detailData[0].m_pantslength === 0
        ? setPantslength("")
        : setPantslength(detailData[0].m_pantslength);
      detailData[0].m_thighcircumference === 0
        ? setThighcircumference("")
        : setThighcircumference(detailData[0].m_thighcircumference);
      detailData[0].m_dresslength === 0
        ? setDresslength("")
        : setDresslength(detailData[0].m_dresslength);
      setLoading(false);
    }
    getDetail();
  }, []);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", detailData[0].id);
    formData.append("m_userid", detailData[0].m_userid);
    formData.append("m_neckline", detailData[0].m_neckline);
    formData.append("m_bust", detailData[0].m_bust);
    formData.append("m_waist", waist);
    formData.append("m_buttock", buttock);
    formData.append("m_shoulderwidth", detailData[0].m_shoulderwidth);
    formData.append(
      "m_armpitcircumference",
      detailData[0].m_armpitcircumference
    );
    formData.append("m_biceps", detailData[0].m_biceps);
    formData.append("m_wristaround", detailData[0].m_wristaround);
    formData.append("m_sleevelength", detailData[0].m_sleevelength);
    formData.append("m_shirtlength", detailData[0].m_shirtlength);
    formData.append("m_crotchlength", detailData[0].m_crotchlength);
    formData.append("m_thighcircumference", thighcircumference);
    formData.append("m_dresslength", dresslength);
    formData.append("m_pantslength", pantslength);
    formData.append("m_gender", "female");
    if (
      !waist ||
      !buttock ||
      !dresslength ||
      !thighcircumference ||
      !pantslength
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
        <div>loading...</div>
      ) : (
        <>
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
            id="thighcircumference"
            label="V??ng ????i"
            placeholder="??o v??ng quang ????i ch??? n??? nh???t"
            margin="normal"
            defaultValue={thighcircumference}
            fullWidth
            size="small"
            onChange={getParamsThighcircumference}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="dresslength"
            label="D??i v??y"
            placeholder="??o t??? eo ?????n g???i"
            margin="normal"
            defaultValue={dresslength}
            fullWidth
            size="small"
            onChange={getParamsDresslength}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="pantslength"
            label="D??i qu???n"
            placeholder="??o t??? eo ?????n ch???m g??t ch??n"
            margin="normal"
            defaultValue={pantslength}
            fullWidth
            size="small"
            onChange={getParamsPantslength}
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
