import { TextField } from "@mui/material";
import React, { useState } from "react";

export default function Shirt() {
  const [neckline, setNeckline] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [buttock, setButtock] = useState("");
  const [shoulderwidth, setShoulderwidth] = useState("");
  const [armpitcircumference, setArmpitcircumference] = useState("");
  const [biceps, setBiceps] = useState("");
  const [wristarround, setWristarround] = useState("");
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
  const getParamsArmpitcircumference = (event) => {
    setArmpitcircumference(event.target.value);
  };
  const getParamsBiceps = (event) => {
    setBiceps(event.target.value);
  };
  const getParamsWristarround = (event) => {
    setWristarround(event.target.value);
  };
  const getParamsSleevelength = (event) => {
    setSleevelength(event.target.value);
  };
  const getParamsShirtlength = (event) => {
    setShirtlength(event.target.value);
  };
  return (
    <>
      <TextField
        id="neckline"
        label="Vòng cổ"
        placeholder="Đo vòng quanh chân cổ"
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
        label="Vòng ngực"
        placeholder="Đo vòng quanh ngực, chỗ nở nhất"
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
        id="shoulderwidth"
        label="Rộng vai"
        placeholder="Từ đầu vai trái sang đầu vai phải"
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
        label="Cửa tay"
        placeholder="Đo vòng quanh nắm tay"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsWristarround}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="sleevelength"
        label="Dài tay"
        placeholder="Từ đầu vai đến qua khỏi mắt cá tay"
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
        label="Dài áo"
        placeholder="Từ đốt xương cổ thứ 7 đến ngang mông"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsShirtlength}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="armpitcircumference"
        label="Vòng nách"
        placeholder="Chống tay lên hông, đo sát vòng nách"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsArmpitcircumference}
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="biceps"
        label="Bắp tay"
        placeholder="Đo vòng sát bắp tay"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        onChange={getParamsBiceps}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}
