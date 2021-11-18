import {
  Button,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";
import { Box } from "@mui/system";
import { MyTextField } from "../utility/Utility";

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

export default function ChangePassForm() {

  const [currentPass, setCurrentPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();

  return (
    <Grid container spacing={1} sx={{height: 406}}>
      <Grid item xs={12}>
        <Item>
          <Box sx={{ padding: "10px" }}>
            <Typography sx={{ fontWeight: 600 }}>Thay đổi mật khẩu</Typography>
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
                id="currentpass"
                label="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu hiện tại"
                margin="normal"
                defaultValue={currentPass}
                fullWidth
                type="password"
                onChange={(e) => setCurrentPass(e.target.vale)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={6}>
              <MyTextField
                id="newpass"
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu cần đổi"
                margin="normal"
                defaultValue={newPass}
                fullWidth
                type="password"
                onChange={(e) => setNewPass(e.target.vale)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MyTextField
                id="confirmpass"
                label="Xác nhận lai mật khẩu"
                placeholder="Nhập lại mật khẩu cần đổi"
                margin="normal"
                defaultValue={confirmPass}
                fullWidth
                type="password"
                onChange={(e) => setConfirmPass(e.target.vale)}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>

            <Grid item xs={12} align="right">
              <Button variant="outlined" color="primary">
                Lưu thay đổi
              </Button>
            </Grid>
          </Grid>
        </Item>
      </Grid>
    </Grid>
  );
}
