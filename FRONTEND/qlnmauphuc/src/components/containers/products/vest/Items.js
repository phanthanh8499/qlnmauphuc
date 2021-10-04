import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Button,
  IconButton,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import React, { useEffect, useState } from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { LOCAL_PATH } from "../../../../constants/Constants";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0px 0px 0px 10px",
  },
  gridroot: {
    position: "relative",
    marginTop: "30px !important",
    padding: "0px 10px",
  },
  boxItem: {
    height: 430,
    "&:hover": {
      boxShadow: "0 2px 8px #000000",
    },
    transition: "box-shadow 0.5s ease-in-out",
  },
  media: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    margin: "10px 0px 0px 0px !important",
    width: "100%",
  },
  navigateBeforeIcon: {
    position: "absolute !important",
    zIndex: "999",
    top: 195,
    opacity: 0.5,
    left: 0,
    boxShadow: "0 2px 8px #000000",
    "&:hover": {
      boxShadow: "0 2px 8px #000000",
      opacity: 1,
    },
  },
  navigateNextIcon: {
    position: "absolute !important",
    zIndex: "999",
    top: 195,
    opacity: 0.5,
    right: -10,
    boxShadow: "0 2px 8px #000000",
    "&:hover": {
      boxShadow: "0 2px 8px #000000",
      opacity: 1,
    },
  },
  boxTitle: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
}));

const center = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function Items(props) {
  const classes = useStyles();
  const {data} = props;
  const [dataRender, setDataRender] = useState([]);
  
  // const products = useSelector((state) => state.products);
  // const { BFM, TFM, SFM } = products;

  useEffect(() => {setDataRender(data);}, [data]);
  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);
  const onPreClick = () => {
    if (page !== 0) {
      setPage(page - 1);
    }
  };
  const onNextClick = () => {
    const temp = dataRender.length / rowsPerPage;
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
  const printData = () => {
    if (dataRender !== null) {
      return (
        rowsPerPage > 0
          ? dataRender.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          : dataRender
      ).map((value, key) => (
        <Grid item xs={3} key={key}>
          <Link
            to={"/" + covertURL(value.product_name) + "." + value.id + ".html"}
          >
            <Card className={classes.boxItem}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={LOCAL_PATH + value.product_image1.substring(2)}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    align="center"
                    className={classes.boxTitle}
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
                  <Button variant="outlined" className={classes.button}>
                    Xem chi tiết
                  </Button>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      ));
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        className={classes.gridroot}
        spacing={2}
        sx={center}
      >
        <IconButton
          className={classes.navigateBeforeIcon}
          size="large"
          onClick={onPreClick}
        >
          <NavigateBeforeIcon></NavigateBeforeIcon>
        </IconButton>
        <IconButton
          className={classes.navigateNextIcon}
          size="large"
          onClick={onNextClick}
        >
          <NavigateNextIcon></NavigateNextIcon>
        </IconButton>

        {printData()}
      </Grid>
    </div>
  );
}
