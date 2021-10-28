import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Dialog,
  FormControlLabel,
  Box,
  Container,
  CssBaseline,
  Avatar,
  Grid,
  Button,
  TextField,
  Checkbox,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSnackbar } from "notistack";
import axios from "axios";
import { DANG_NHAP_THANH_CONG } from "../../constants/Constants";

const useStyles = makeStyles((theme) => ({
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#3f51b5",
  },
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  mainform: {
    backgroundColor: "#ffffff",
    position: "fixed",
    zIndex: 9999,
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    boxShadow: "0px 0px 10px #3f51b5",
  },
  title: {
    color: "#3f51b5",
    fontWeight: 800,
  },
}));

function SignIn(props) {
  const classes = useStyles();
  const { open, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [check, setCheck] = useState([]);
  const getUsernameParams = (e) => {
    setUsername(e.target.value);
    setCheck(
      userData.filter(
        (userData) =>
          userData.user_username === e.target.value &&
          userData.user_status === "block"
      )
    );
  };

  const getPasswordParams = (e) => {
    setPassword(e.target.value);
  };

  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      const { data } = await axios.get(`/getUserData`);
      setUserData(data);
      setLoading(false);
    }
    getUserData();
  }, [open]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      enqueueSnackbar("Thông tin không chính xác", {
        variant: "error",
        autoHideDuration: 1000,
      });
    } else if (check.length >= 1) {
      enqueueSnackbar("Tài khoản của bạn đã bị khóa", {
        variant: "error",
        autoHideDuration: 1000,
      });
    } else {
      const { data } = await axios.post("/signin", { username, password });
      if (data === "ERROR") {
        enqueueSnackbar("Sai tên đăng nhập hoặc mật khẩu", {
          variant: "error",
          autoHideDuration: 1000,
        });
      } else {
        dispatch({ type: DANG_NHAP_THANH_CONG, payload: data });
        localStorage.setItem("userInfo", JSON.stringify({ userInfo: data }));
        enqueueSnackbar("Đăng nhập thành công", {
          variant: "success",
          autoHideDuration: 1000,
        });
        onClose();
      }
    }
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <Container component="main" maxWidth="xs" className={classes.mainform}>
        {loading ? (
          <Box
            sx={{
              height: "500px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <CssBaseline />
            <div className={classes.paper}>
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5" className={classes.title}>
                Đăng nhập
              </Typography>
              <form className={classes.form} noValidate>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Nhập tên tài khoản"
                  name="username"
                  onChange={getUsernameParams}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Nhập mật khẩu"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={getPasswordParams}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Ghi nhớ"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}
                  onClick={handleSubmit}
                >
                  Đăng nhập
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Quên mật khẩu?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Bạn chưa có tài khoản? Đăng ký"}
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </div>
            <Box mt={8}></Box>
          </>
        )}
      </Container>
    </Dialog>
  );
}

export default SignIn;
