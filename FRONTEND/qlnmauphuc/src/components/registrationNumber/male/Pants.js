import { TextField } from "@mui/material";
import React from "react";

export default function Pants() {
  return (
    <>
      <TextField
        id="lastname"
        label="Vòng eo"
        placeholder="Đo vòng quanh eo"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="lastname"
        label="Vòng mông"
        placeholder="Đo vòng quanh mông, chỗ nở nhất"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="lastname"
        label="Vòng đùi"
        placeholder="Đo vòng quang đùi chỗ nở nhất"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="lastname"
        label="Vòng đáy"
        placeholder="Từ eo trướng vòng qua eo sau"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <TextField
        id="lastname"
        label="Dài quần"
        placeholder="Đo từ eo đến chấm gót chân"
        margin="normal"
        defaultValue=""
        fullWidth
        size="small"
        InputLabelProps={{
          shrink: true,
        }}
      />
    </>
  );
}
