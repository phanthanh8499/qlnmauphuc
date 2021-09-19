import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from 'react'
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../../../redux/Action';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: "20px 0px 20px 0px !important",
    padding: "10px !important",
    position: "relative",
    border: "1px solid #d3d3d3",
  },
  box: {
    width: "20%",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  boxItem: {
    "&:hover": {
      boxShadow: "0 2px 8px #000000",
    },
    transition: "box-shadow 0.5s ease-in-out !important",
  },
  media: {
    height: 215,
    width: 215,
    margin: "0px auto !important",
  },
  navigateBeforeIcon: {
    position: "absolute !important",
    zIndex: "999",
    top: "40%",
    left: "-17px",
    opacity: 0.5,
    boxShadow: "0 2px 8px #000000",
    "&:hover": {
      boxShadow: "0 2px 8px #000000",
      opacity: 1,
    },
  },
  navigateNextIcon: {
    position: "absolute !important",
    zIndex: "999",
    top: "40%",
    right: -17,
    opacity: 0.5,
    boxShadow: "0 2px 8px #000000",
    "&:hover": {
      boxShadow: "0 2px 8px #000000",
      opacity: 1,
    },
  },
  title: {
    color: "#555",
    fontSize: "21px !important",
    fontWeight: "300px !important",
    fontFamily: `'Times New Roman', Times !important`,
  },
  iconbtn: {
    outline: "none",
    border: "none",
  },
  title: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    fontSize: '18px !important',
  }
}));

export default function SameProduct (props) {
  const classes = useStyles();
  const {data, id} = props;
    const renderData = data.filter((data) => data.id !== parseInt(id));

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(6);
  const onPreClick = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };
  const onNextClick = () => {
    const temp = renderData.length / rowsPerPage;
    if (page < temp - 1) {
      setPage(page + 1);
    }
  };
  const covertURL = (str) => {
    str = str.toLowerCase();
    str = str.replace(/(à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ)/g, "a");
    str = str.replace(/(è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ)/g, "e");
    str = str.replace(/(ì|í|ị|ỉ|ĩ)/g, "i");
    str = str.replace(/(ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ)/g, "o");
    str = str.replace(/(ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ)/g, "u");
    str = str.replace(/(ỳ|ý|ỵ|ỷ|ỹ)/g, "y");
    str = str.replace(/(đ)/g, "d");
    str = str.replace(/([^0-9a-z-\s])/g, "");
    str = str.replace(/(\s+)/g, "-");
    str = str.replace(/^-+/g, "");
    str = str.replace(/-+$/g, "");
    return str;
  };
  const renderItems = () => {
    return (
        rowsPerPage > 0
          ? renderData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : renderData
      ).map((value, key) => (
      <Grid item className={classes.box} key={key}>
        <Link
          to={"/" + covertURL(value.product_name) + "." + value.id + ".html"}
        >
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image={value.product_image1}
                title="Contemplative Reptile"
              />
              <CardContent>
                <Grid container xs={12}>
                  <Grid item xs={12}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="h2"
                      align="center"
                      className={classes.title}
                    >
                      {value.product_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      {value.product_price.toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} className={classes.center}>
                    <Button variant="outlined" className={classes.button}>
                      Xem chi tiết
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      </Grid>
    ));
  }
    return (
      <Grid
        container
        xs={12}
        component={Paper}
        spacing={1}
        className={classes.root}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={12}>
          <Typography className={classes.title}>SẢN PHẨM TƯƠNG TỰ</Typography>
        </Grid>
        <IconButton className={classes.navigateBeforeIcon} size="large">
          <NavigateBeforeIcon
            className={classes.iconbtn}
            onClick={onPreClick}
          ></NavigateBeforeIcon>
        </IconButton>
        <IconButton
          className={classes.navigateNextIcon}
          size="large"
          onClick={onNextClick}
        >
          <NavigateNextIcon></NavigateNextIcon>
        </IconButton>

        {renderItems()}
      </Grid>
    );
}
