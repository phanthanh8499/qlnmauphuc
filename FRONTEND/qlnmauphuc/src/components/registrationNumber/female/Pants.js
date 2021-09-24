import { TextField } from "@mui/material";
import React, { useState } from "react";

export default function Pants() {
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
        id="dresslength"
        label="Dài váy"
        placeholder="Đo từ eo đến gối"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsDresslength}
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
    </>
  );
}
