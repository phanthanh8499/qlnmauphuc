import { Button, Divider, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  editMeasurements,
  getDetailMeasurements,
} from "../../../../redux/Action";

export default function Pants() {
  const dispatch = useDispatch();
  const measurements = useSelector((state) => state.measurements);
  const { enqueueSnackbar } = useSnackbar();
  const { detailData } = measurements;
  const [waist, setWaist] = useState("");
  const [buttock, setButtock] = useState("");
  const [pantslength, setPantslength] = useState("");
  const [thighcircumference, setThighcircumference] = useState("");
  const [crotchlength, setCrotchlength] = useState("");

  const getParamsWaist = (event) => {
    setWaist(event.target.value);
  };
  const getParamsButtock = (event) => {
    setButtock(event.target.value);
  };
  const getParamsPantslength = (event) => {
    setPantslength(event.target.value);
  };
  const getParamsThighcircumference = (event) => {
    setThighcircumference(event.target.value);
  };
  const getParamsCrotchlength = (event) => {
    setCrotchlength(event.target.value);
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
      detailData[0].m_crotchlength === 0
        ? setCrotchlength("")
        : setCrotchlength(detailData[0].m_crotchlength);
      setLoading(false);
    }
    getDetail();
  }, []);
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", parseInt(detailData[0].id));
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
    formData.append("m_crotchlength", crotchlength);
    formData.append("m_thighcircumference", thighcircumference);
    formData.append("m_dresslength", detailData[0].m_dresslength);
    formData.append("m_pantslength", pantslength);
    formData.append("m_gender", "male");
    if (
      !waist ||
      !buttock ||
      !crotchlength ||
      !thighcircumference ||
      !pantslength
    ) {
      enqueueSnackbar("Hãy điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      dispatch(editMeasurements(formData));
      dispatch(getDetailMeasurements(parseInt(detailData[0].id)));
      enqueueSnackbar("Chỉnh sửa thông tin thành công", {
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
            label="Vòng eo"
            placeholder="Đo vòng quanh eo"
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
            label="Vòng mông"
            placeholder="Đo vòng quanh mông, chỗ nở nhất"
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
            label="Vòng đùi"
            placeholder="Đo vòng quang đùi chỗ nở nhất"
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
            id="crotchlength"
            label="Vòng đáy"
            placeholder="Từ eo trướng vòng qua eo sau"
            margin="normal"
            defaultValue={crotchlength}
            fullWidth
            size="small"
            onChange={getParamsCrotchlength}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            id="pantslength"
            label="Dài quần"
            placeholder="Đo từ eo đến chấm gót chân"
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
            onClick={handleSubmit}
            fullWidth
            sx={{ margin: "5px 0px 0px 0px" }}
          >
            Lưu thay đổi
          </Button>
        </>
      )}
    </>
  );
}
