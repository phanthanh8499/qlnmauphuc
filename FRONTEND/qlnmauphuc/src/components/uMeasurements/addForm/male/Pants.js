import { Button, Divider, TextField } from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMeasurements, getMeasurementsData } from "../../../../redux/Action";

export default function Pants() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
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
  const { userid } = JSON.parse(localStorage.getItem("userInfo")).userInfo;
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", 1);
    formData.append("m_userid", userid);
    formData.append("m_neckline", 0);
    formData.append("m_bust", 0);
    formData.append("m_waist", waist);
    formData.append("m_buttock", buttock);
    formData.append("m_shoulderwidth", 0);
    formData.append("m_armpitcircumference", 0);
    formData.append("m_biceps", 0);
    formData.append("m_wristaround", 0);
    formData.append("m_sleevelength", 0);
    formData.append("m_shirtlength", 0);
    formData.append("m_crotchlength", crotchlength);
    formData.append("m_thighcircumference", thighcircumference);
    formData.append("m_dresslength", 0);
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
      dispatch(addMeasurements(formData));
      dispatch(getMeasurementsData(userid));
      enqueueSnackbar("Chỉnh sửa thông tin thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }  
  };
  return (
    <>
      <TextField
        id="waist"
        label="Vòng eo"
        placeholder="Đo vòng quanh eo"
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
        label="Vòng mông"
        placeholder="Đo vòng quanh mông, chỗ nở nhất"
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
        id="thighcircumference"
        label="Vòng đùi"
        placeholder="Đo vòng quang đùi chỗ nở nhất"
        margin="normal"
        defaultValue=""
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
        defaultValue=""
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
        defaultValue=""
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
        Thêm số đo
      </Button>
    </>
  );
}
