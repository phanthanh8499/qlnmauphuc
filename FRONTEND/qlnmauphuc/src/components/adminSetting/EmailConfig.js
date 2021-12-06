import { Button, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { MyTextField } from "../utility/Utility";
import { useSnackbar } from "notistack";
import axios from "axios";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
  boxShadow: "none",
  borderRadius: "12px",
  border: "1px solid rgba(144, 202, 249, 0.46)",
  "&:hover": {
    boxShadow: "rgb(32 40 45 / 8%) 0px 2px 14px 0px",
  },
}));

export default function EmailConfig() {
  const { enqueueSnackbar } = useSnackbar();
  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("id", userInfo.id);
    if (!currentPass || !newPass || !confirmPass) {
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    if (newPass !== confirmPass) {
      enqueueSnackbar("Mật khẩu không khớp", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    formData.append("currentpass", currentPass);
    formData.append("newpass", newPass);
    const { data } = await axios.post(`/changePassword`, formData);
    if (data === "ERROR") {
      enqueueSnackbar("Cập nhật mật khẩu thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    } else {
      enqueueSnackbar("Cập nhật mật khẩu thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };

  const [email, setEmail] = useState();

  return (
    <Grid container spacing={1} sx={{ height: 406 }}>
      <Grid item xs={12}>
        <Item>
          <Box sx={{ padding: "10px" }}>
            <Typography sx={{ fontWeight: 600 }}>Cấu hình gửi thư</Typography>
          </Box>
          <Divider
            sx={{
              borderColor: "rgba(144, 202, 249, 0.46)",
              marginBottom: "10px",
            }}
          />
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <MyTextField
                id="email"
                label="Email"
                placeholder="Nhập email"
                margin="normal"
                defaultValue={setEmail}
                fullWidth
                onChange={(e) => setEmail(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <MyTextField
                id="currentpass"
                label="Mật khẩu"
                placeholder="Nhập mật khẩu"
                margin="normal"
                defaultValue={currentPass}
                fullWidth
                type="password"
                onChange={(e) => setCurrentPass(e.target.value)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} align="right">
              <Button variant="outlined" color="primary" onClick={handleSubmit}>
                Lưu thay đổi
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
}
