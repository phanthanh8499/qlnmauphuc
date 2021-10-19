import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Dialog,
  Box,
  Container,
  CssBaseline,
  Grid,
  Button,
  TextField,
  Typography,
  Link,
  CircularProgress,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../../redux/Action";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
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


function SignUp(props) {
  const classes = useStyles();
  const { open, onClose } = props;
  const { enqueueSnackbar } = useSnackbar();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [tel, setTel] = useState("");
  const [check1, setCheck1] = useState([]);
  const [check2, setCheck2] = useState([]);
 
  const getUsernameParams = (event) => {
    setUsername(event.target.value);
    setCheck1(userData.filter(
      (userData) => userData.user_username === event.target.value
    ));
  };
  const getPasswordParams = (event) => {
    setPassword(event.target.value);
  };
  const getRePasswordParams = (event) => {
    setRePassword(event.target.value);
  };
  const getTelParams = (event) => {
    setTel(event.target.value);
    setCheck2(
      userData.filter(
        (userData) => userData.user_tel === event.target.value
      )
    );
  };
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getUserData () {
      const { data } = await axios.get(`/getUserData`);
      setUserData(data);
      setLoading(false);
    }
    getUserData()
  }, []);
  

  const handleSubmit = () => {
    if (!username || !password || !rePassword || !tel) {
      enqueueSnackbar("Vui lòng nhập đầy đủ thông tin", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    } else if (check1.length >= 1) {
      enqueueSnackbar("Tài khoản đã tồn tại", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    } else if (check2.length >= 1) {
      enqueueSnackbar("Số điện thoại đã tồn tại", {
        variant: "warning",
        autoHideDuration: 2000,
      });
    } else if (password !== rePassword) {
      enqueueSnackbar("Mật khẩu không khớp", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar("Đăng ký thành công", {
        variant: "success",
        autoHideDuration: 2000,
      });
      axios.post(`/signup`, { username, password, tel });
      onClose();
    }
  };

  return (
      <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
        <Container component="main" maxWidth="xs" className={classes.mainform}>
          <CssBaseline />
          {loading ? (
            <Box sx={{height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
              <CircularProgress/>
            </Box>
          ):(
          <>
          <div className={classes.paper}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Đăng ký
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
                autoComplete="username"
                autoFocus
                onChange={getUsernameParams}
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="tel"
                label="Số điện thoại"
                id="tel"
                autoComplete="current-password"
                onChange={getTelParams}
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
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="repassword"
                label="Xác nhận mật khẩu"
                type="password"
                id="repassword"
                autoComplete="current-password"
                onChange={getRePasswordParams}
              />
              <Button
                // type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={handleSubmit}
              >
                Đăng ký
              </Button>
              <Grid container>
                <Grid item xs></Grid>
                <Grid item>
                  <Link href="#" variant="body2">
                    {"Bạn đã có tài khoản? Đăng nhập"}
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

export default SignUp;
