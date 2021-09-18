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
import makeStyles from '@mui/styles/makeStyles';
import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: "0px 0px 0px 10px",
  },
  gridroot: {
    position: "relative",
    marginTop: 30,
    padding: '0px 10px',
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
    margin: "10px 0px 0px 0px",
    width: "100%",
  },
  navigateBeforeIcon: {
    position: "absolute",
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
    position: "absolute",
    zIndex: "999",
    top: 195,
    right: 0,
    opacity: 0.5,
    right: 2,
    boxShadow: "0 2px 8px #000000",
    "&:hover": {
      boxShadow: "0 2px 8px #000000",
      opacity: 1,
    },
  },
}));

export default function Items() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container className={classes.gridroot} spacing={2} xs={12}>
        <IconButton className={classes.navigateBeforeIcon} size="large">
          <NavigateBeforeIcon></NavigateBeforeIcon>
        </IconButton>
        <IconButton className={classes.navigateNextIcon} size="large">
          <NavigateNextIcon></NavigateNextIcon>
        </IconButton>
        <Grid item xs={3}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
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
                <Button variant="outlined" className={classes.button}>
                  Xem chi tiết
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
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
                <Button variant="outlined" className={classes.button}>
                  Xem chi tiết
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
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
                <Button variant="outlined" className={classes.button}>
                  Xem chi tiết
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={3}>
          <Card className={classes.boxItem}>
            <CardActionArea>
              <CardMedia
                className={classes.media}
                image="./images/VEST/vd193.jpg"
                title="Contemplative Reptile"
              />
              <CardContent>
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
                <Button variant="outlined" className={classes.button}>
                  Xem chi tiết
                </Button>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}
