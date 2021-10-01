import { Button, Divider, TextField } from '@mui/material';
import React, { useState } from 'react'
import {useDispatch} from 'react-redux';
import { addMeasurements } from '../../../redux/Action';

export default function Shirt () {
  const dispatch = useDispatch();
  const [neckline, setNeckline] = useState("");
  const [bust, setBust] = useState("");
  const [waist, setWaist] = useState("");
  const [buttock, setButtock] = useState("");
  const [shoulderwidth, setShoulderwidth] = useState("");
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
  const getParamsWristarround = (event) => {
    setWristarround(event.target.value);
  };
  const getParamsSleevelength = (event) => {
    setSleevelength(event.target.value);
  };
  const getParamsShirtlength = (event) => {
    setShirtlength(event.target.value);
  };
  const handleSubmit = () => {
    const formData = new FormData();
    formData.append("id", 1);
    formData.append("m_userid", 1);
    formData.append("m_neckline", neckline);
    formData.append("m_bust", bust);
    formData.append("m_waist", waist);
    formData.append("m_buttock", buttock);
    formData.append("m_shoulderwidth", shoulderwidth);
    formData.append("m_wristaround", wristarround);
    formData.append("m_sleevelength", sleevelength);
    formData.append("m_shirtlength", shirtlength);
    formData.append("m_gender", "male");
    dispatch(addMeasurements(formData));
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
        <Divider />
        <Button
          variant="outlined"
          color="primary"
          fullWidth
          sx={{ margin: "5px 0px 0px 0px" }}
          onClick={handleSubmit}
        >
          Lưu thay đổi
        </Button>
      </>
    );
}