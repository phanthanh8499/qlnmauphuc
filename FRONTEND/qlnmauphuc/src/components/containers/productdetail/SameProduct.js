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
import React from 'react'
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

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
}));

export default function SameProduct () {
  const classes = useStyles();
    return (
      <Grid
        container
        xs={12}
        component={Paper}
        spacing={1}
        className={classes.root}
      >
        <Grid item xs={12}>
          <Typography className={classes.title}>SẢN PHẨM TƯƠNG TỰ</Typography>
        </Grid>
        <IconButton className={classes.navigateBeforeIcon} size="large">
          <NavigateBeforeIcon className={classes.iconbtn}></NavigateBeforeIcon>
        </IconButton>
        <IconButton className={classes.navigateNextIcon} size="large">
          <NavigateNextIcon></NavigateNextIcon>
        </IconButton>
        <Grid item className={classes.box}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
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
                    >
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      1.000.000 đ
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
        </Grid>
        <Grid item className={classes.box}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
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
                    >
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      1.000.000 đ
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
        </Grid>
        <Grid item className={classes.box}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
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
                    >
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      1.000.000 đ
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
        </Grid>
        <Grid item className={classes.box}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
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
                    >
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      1.000.000 đ
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
        </Grid>
        <Grid item className={classes.box}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
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
                    >
                      Lizard
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                      align="center"
                    >
                      1.000.000 đ
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
        </Grid>
      </Grid>
    );
}
