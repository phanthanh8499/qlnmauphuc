import {
  Button,
  ButtonGroup,
  CircularProgress,
  Dialog,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import makeStyles from "@mui/styles/makeStyles";
import { MyTextField } from "../../utility/Utility";
import axios from "axios";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 20,
  },
  btngroup: {
    float: "right",
  },
  avatarItem: {
    justifyItems: "center",
    alignItems: "center",
    display: "flex",
  },
  input: {
    display: "none",
  },
  title: {
    fontSize: "20px !important",
    fontWeight: "500 !important",
    color: "#1976d2",
  },
  subTitle: {
    fontSize: "14px !important",
    color: "#1976d2",
    fontStyle: "italic",
  },
}));


function DetailForm(props) {
  const classes = useStyle();
  const { enqueueSnackbar } = useSnackbar();
  const { open, onClose, id } = props;

  const [dataRender, setDataRender] = useState([
    { cloth_name: "123123123213213123" },
  ]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const { data } = await axios.get(`/getOrderHaveCloth.${id}`);
      setDataRender(data);
      setLoading(false);
    }
    getData();
  }, []);

  const handleClickCopy = (id) => {
    navigator.clipboard.writeText(id);
    enqueueSnackbar(`Đã sao chép mã hoá đơn: ${id}`, {
      variant: "success",
      autoHideDuration: 2000,
    });
  };
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="xs"
    >
      <Grid container className={classes.root} spacing={1}>
        {loading ? (
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "250px",
              width: "450px",
            }}
          >
            <CircularProgress></CircularProgress>
          </Grid>
        ) : (
          <>
            <Grid item xs={12} align="center">
              <Typography className={classes.title}>
                Chi tiết loại{" "}
                {dataRender[0].cloth_name.substring(
                  0,
                  dataRender[0].cloth_name.lastIndexOf("gửi ngày")
                )}
              </Typography>
              <Typography className={classes.subTitle}>
                (
                {dataRender[0].cloth_name.substring(
                  dataRender[0].cloth_name.lastIndexOf("gửi ngày")
                )}
                )
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 0.5, mb: 1 }} />
            </Grid>
            <Grid item xs={12}>
              {dataRender.map((value, key) => {
                var temp = "Mã đơn hàng thứ " + (key + 1);
                return (
                  <>
                    <MyTextField
                      id={key}
                      label={temp}
                      margin="normal"
                      fullWidth
                      value={value.od_orderid}
                      size="small"
                      InputProps={{
                        readOnly: true,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => handleClickCopy(value.od_orderid)}
                              color="primary"
                            >
                              <ContentCopyIcon />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </>
                );
              })}

              <Divider sx={{ mt: 0.5, mb: 0.5 }} />
            </Grid>
            <Grid item xs={12} sx={{ mt: 1 }}>
              <ButtonGroup className={classes.btngroup}>
                <Button variant="outlined" color="error" onClick={onClose}>
                  Hủy bỏ
                </Button>
              </ButtonGroup>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
}

export default DetailForm;
