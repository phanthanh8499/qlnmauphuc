import { Button, Container, Grid, Typography } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import { Link } from "react-router-dom";
import ContentBtn from "./ContentBtn";

const useStyles = makeStyles((theme) => ({
  bg: {
    backgroundColor: "#000000",
  },
  fontcolor: {
    color: "#ffffff",
    "& a": {
      color: "#ffffff",
    },
  },
  inputCustom: {
    padding: "10px 10px !important",
    width: "70%",
    borderRadius: "10px 0px 0px 10px !important",
    "&:focus": {
      borderRadius: "5px !important",
    },
  },
  btn: {
    backgroundColor: "#000 !important",
    border: "1px solid #fff !important",
    color: "#fff !important",
    transition: "all 0.5s",
    margin: "0px 5px 0px 0px",
    borderRadius: "0px 10px 10px 0px !important",
    "&:hover": {
      backgroundColor: "#fff !important",
      color: "#000 !important",
    },
  },
}));

function Footer() {
  const classes = useStyles();
  return (
    <div className={classes.bg}>
      <Container>
        <ContentBtn></ContentBtn>
        <Grid container xs={12} className={classes.fontcolor}>
          <Grid item xs={4}>
            <Typography variant="h5">Nhà may âu phục Thành Phan</Typography>
            <Typography>
              <i className="fas fa-home mr-3" /> 999/9, Nguyễn Văn Linh, Ninh
              Kiều, Cần Thơ
            </Typography>
            <Typography>
              <i className="fas fa-envelope mr-3" />
              <Link href="mailto:thanhauphuc@gmail.com">
                thanhauphuc@gmail.com
              </Link>
            </Typography>
            <Typography>
              <i className="fas fa-phone mr-3" /> (+84)91 551 80 13
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography variant="h5">Chính sách công ty</Typography>
            <ul className="pl-0">
              <li>
                <Link to="/policies">Chính sách giao nhận</Link>
              </li>
              <li>
                <Link to="/policies">Chính sách đổi trả hàng</Link>
              </li>
              <li>
                <Link to="/policies">Chế độ bảo hành</Link>
              </li>
              <li>
                <Link to="/paymethod">Phương thức thanh toán</Link>
              </li>
            </ul>
          </Grid>
          <Grid item xs={5}>
            <Typography variant="h5">Thông tin khuyến mãi</Typography>
            <Grid item xs={12}>
              <input
                type="email"
                className="form-control"
                id="advertising-news"
                placeholder="Nhập email của bạn để đăng ký"
                className={classes.inputCustom}
              />
              <Button className={classes.btn}>Submit</Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid container xs={12} justifyContent="center">
          <Typography className={classes.copyright}>
            © 2020 Copyright: AuPhuc
          </Typography>
        </Grid>
      </Container>
    </div>
  );
}

export default Footer;
