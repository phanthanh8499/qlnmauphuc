import { Button, Divider, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addMeasurements } from "../../../redux/Action";

export default function Pants() {
  const dispatch = useDispatch();
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
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("m_userid", 1);
    formData.append("m_waist", waist);
    formData.append("m_buttock", buttock);
    formData.append("m_crotchlength", crotchlength);
    formData.append("m_thighcircumference", thighcircumference);
    formData.append("m_pantslength", pantslength);
    formData.append("m_gender", "male");
    dispatch(addMeasurements(formData));
  }
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
        onClick={handleSubmit}
        fullWidth
        sx={{ margin: "5px 0px 0px 0px" }}
      >
        Lưu thay đổi
      </Button>
    </>
  );
}
