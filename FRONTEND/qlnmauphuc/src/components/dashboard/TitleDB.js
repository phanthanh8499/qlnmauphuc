import { Typography } from "@mui/material";
import React from "react";

function DBTitle(props) {
  return (
    <Typography
      component="h1"
      variant="h6"
      color="inherit"
      noWrap
      sx={{ flexGrow: 1 }}
    >
      {props.dbtitle}
    </Typography>
  );
}

export default DBTitle;
