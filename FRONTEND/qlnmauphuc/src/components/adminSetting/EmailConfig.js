import { Button, CircularProgress, Divider, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { Box } from "@mui/system";
import { MyTextField } from "../utility/Utility";
import { useSnackbar } from "notistack";
import axios from "axios";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

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
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [currentPass, setCurrentPass] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const handleSubmit = async () => {
    const formData = new FormData();
    if (!currentPass || !email ){
      enqueueSnackbar("Vui lòng điền đầy đủ thông tin", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    formData.append("email", email);
    formData.append("password", currentPass);
    const { data } = await axios.post(`/admin/emailConfig/update`, formData);
    if (data === "ERROR") {
      enqueueSnackbar("Cập nhật cấu hình gửi thư thất bại", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    } else {
      enqueueSnackbar("Cập nhật cấu hình gửi thư thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    async function getData(){
      const { data } = await axios.get(`/admin/emailConfig/getData`);
      setEmail(data.e_email)
      setCurrentPass(data.e_password);
      setLoading(false)
    }
    getData()
  },[])
  

  return (
    <Grid container spacing={1} sx={{ height: 406 }}>
      {loading ? (
        <Grid item xs={12}>
          <Item sx={{ height: 237, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CircularProgress />
          </Item>
        </Grid>
      ) : (
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
                  value={email}
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
                  value={currentPass}
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setCurrentPass(e.target.value)}
                  size="small"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? (
                            <VisibilityIcon />
                          ) : (
                            <VisibilityOffIcon />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} align="right">
                <Divider
                  sx={{
                    borderColor: "rgba(144, 202, 249, 0.46)",
                    marginBottom: "10px",
                  }}
                />
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Lưu thay đổi
                </Button>
              </Grid>
            </Grid>
          </Item>
        </Grid>
      )}
    </Grid>
  );
}
