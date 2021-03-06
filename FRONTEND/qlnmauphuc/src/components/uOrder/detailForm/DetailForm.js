import { CircularProgress, Dialog, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { LOCAL_PATH } from "../../../constants/Constants";
import CustomizedSteppers from "./CustomizedSteppers";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import ImageMagnify from "./ImageMagnify";
import { useDispatch, useSelector } from "react-redux";
import { getDetailOrder } from "../../../redux/Action";

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 20,
    // width: "1200px !important",
  },
  title: {
    fontSize: "14px !important",
    color: "#666666",
  },
  orderid: {
    fontSize: "14px !important",
    color: "#0008ff",
    fontWeight: "600 !important",
  },
  box: {
    boxShadow: "0 0 0 1px rgb(0 0 0 / 10%) inset",
  },
  img: {
    width: "180px",
  },
  infoBox: {
    boxShadow: "0 0 0 1px #67a4e1",
    borderRadius: "4px",
    padding: "5px",
  },
}));

const MyTitle = styled("div")`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  font-size: 14px;
`;

const MySpan = styled("span")`
  font-weight: 600;
  margin: 0px 2px;
`;

const SpanButton = styled("span")`
  border: 1px solid #67a4e1;
  padding: 3px;
  border-radius: 5px;
  border-bottom: none;
  background-color: #67a4e1;
  color: #ffffff;
`;

const center = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

function DetailForm(props) {
  const classes = useStyle();
  const { onClose, id } = props;
  const [loadingState, setLoadingState] = useState(true);
  const dispatch = useDispatch();

  const order = useSelector((state) => state.order);
  const { loadingDetail, detailData } = order;
  useEffect(() => {
    dispatch(getDetailOrder(id));
  }, [id]);

  useEffect(() => {
    setLoadingState(false);
  }, [detailData]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const orderInfo = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.orderid}>
            <SpanButton>M?? ????n h??ng</SpanButton>
            {detailData[0].od_orderid}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <AccessAlarmIcon />
            <Typography className={classes.title}>
              <MySpan>Ng??y ?????t h??ng:</MySpan>
              {formatDate(detailData[0].order_startdate)}
            </Typography>
          </MyTitle>
          <MyTitle>
            <AccessAlarmIcon />
            {parseInt(detailData[0].order_statusid) === 6 ? (
              <Typography className={classes.title}>
                <MySpan>Ng??y ho??n th??nh:</MySpan>
                {formatDate(detailData[0].order_enddate)}
              </Typography>
            ) : (
              <Typography className={classes.title}>
                <MySpan>Ng??y ho??n th??nh (d??? ki???n):</MySpan>
                {formatDate(detailData[0].order_enddate)}
              </Typography>
            )}
          </MyTitle>
          <MyTitle>
            <LocalShippingIcon />
            <Typography className={classes.title}>
              <MySpan>P. Th???c v???n chuy???n:</MySpan>
              {detailData[0].osm_name}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PaymentOutlinedIcon />
            <Typography className={classes.title}>
              <MySpan>P. Th???c thanh to??n:</MySpan>
              {detailData[0].opm_name}
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>
    );
  };

  const customerInfo = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <SpanButton>Th??ng tin ng?????i nh???n</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Ng?????i nh???n:</MySpan> {detailData[0].order_customername}
            </Typography>
          </MyTitle>
          <MyTitle sx={{ flexFlow: "nowrap" }}>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>?????a ch???:</MySpan> {detailData[0].order_customeraddress}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>S??? ??i???n tho???i:</MySpan>{" "}
              {detailData[0].order_customerphone}
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>
    );
  };

  const tailorInfo = () => {
    return detailData[0].order_statusid >= 2 ? (
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <SpanButton>Th??ng tin ng?????i may</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Ng?????i may:</MySpan>
              {detailData[0].tailor_lastname +
                " " +
                detailData[0].tailor_firstname}
            </Typography>
          </MyTitle>
          <MyTitle sx={{ flexFlow: "nowrap" }}>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>?????a ch???:</MySpan>
              {detailData[0].tailor_address}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>S??? ??i???n tho???i:</MySpan>
              {detailData[0].tailor_tel}
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>
    ) : (
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <SpanButton>Th??ng tin ng?????i may</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Ng?????i may:</MySpan>...
            </Typography>
          </MyTitle>
          <MyTitle>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>?????a ch???:</MySpan>...
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>S??? ??i???n tho???i:</MySpan>...
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>
    );
  };

  const clothInfo = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <SpanButton>Th??ng tin v???i</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <Grid container>
            <Grid item xs={12}>
              <ImageMagnify
                image={LOCAL_PATH + detailData[0].cloth_image.substring(2)}
              ></ImageMagnify>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title}>
                <MySpan>T??n v???i: </MySpan>
                {detailData[0].cloth_name}
              </Typography>
              <Typography className={classes.title}>
                <MySpan>Ch???t li???u: </MySpan>
                {detailData[0].cloth_material}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const measurementInfo = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <SpanButton>Th??ng tin s??? ??o</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <Grid container>
            <Grid item xs={6}>
              {detailData[0].od_neckline === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>V??ng c???: </MySpan>
                  {detailData[0].od_neckline}
                </Typography>
              )}
              {detailData[0].od_bust === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>V??ng ng???c: </MySpan>
                  {detailData[0].od_bust}
                </Typography>
              )}
              {detailData[0].od_shoulderwidth === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>R???ng vai: </MySpan>
                  {detailData[0].od_shoulderwidth}
                </Typography>
              )}
              {detailData[0].od_wristaround === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>C???a tay: </MySpan>
                  {detailData[0].od_wristaround}
                </Typography>
              )}
              {detailData[0].od_sleevelength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>D??i tay: </MySpan>
                  {detailData[0].od_sleevelength}
                </Typography>
              )}
              {detailData[0].od_shirtlength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>D??i ??o: </MySpan>
                  {detailData[0].od_shirtlength}
                </Typography>
              )}
              {detailData[0].od_armpitcircumference === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>V??ng n??ch: </MySpan>
                  {detailData[0].od_armpitcircumference}
                </Typography>
              )}
              {detailData[0].od_biceps === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>B???p tay: </MySpan>
                  {detailData[0].od_biceps}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {detailData[0].od_waist === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>V??ng eo: </MySpan>
                  {detailData[0].od_waist}
                </Typography>
              )}
              {detailData[0].od_buttock === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>V??ng m??ng: </MySpan>
                  {detailData[0].od_buttock}
                </Typography>
              )}
              {detailData[0].od_thighcircumference === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>V??ng ????i: </MySpan>
                  {detailData[0].od_thighcircumference}
                </Typography>
              )}
              {detailData[0].od_crotchlength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>V??ng d??y: </MySpan>
                  {detailData[0].od_crotchlength}
                </Typography>
              )}
              {detailData[0].od_dresslength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>D??i v??y: </MySpan>
                  {detailData[0].od_dresslength}
                </Typography>
              )}
              {detailData[0].od_pantslength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>D??i qu???n: </MySpan>
                  {detailData[0].od_pantslength}
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  const productInfo = () => {
    return (
      <>
        <Grid container>
          <Grid item xs={12}>
            <SpanButton>Th??ng tin s???n ph???m</SpanButton>
          </Grid>
          <Grid item xs={12} className={classes.infoBox}>
            <Grid container>
              <Grid item xs={12} sx={center}>
                <img
                  className={classes.img}
                  src={LOCAL_PATH + detailData[0].product_image1.substring(2)}
                  alt={detailData[0].product_name}
                ></img>
              </Grid>
              <Grid item xs={12} sx={center}>
                <Typography className={classes.title}>
                  <MySpan>T???ng ti???n: </MySpan>
                  {detailData[0].order_total.toLocaleString("it-IT", {
                    style: "currency",
                    currency: "VND",
                  })}
                </Typography>
              </Grid>
              {detailData[0].order_statusid >= 1 ? (
                <>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.title}>
                      <MySpan>???? tr???: </MySpan>
                      {(detailData[0].order_total * 0.5).toLocaleString(
                        "it-IT",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.title}>
                      <MySpan>C??n l???i: </MySpan>
                      {(detailData[0].order_total * 0.5).toLocaleString(
                        "it-IT",
                        {
                          style: "currency",
                          currency: "VND",
                        }
                      )}
                    </Typography>
                  </Grid>{" "}
                </>
              ) : (
                <>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.title}>
                      <MySpan>???? tr???: </MySpan>
                      ...
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.title}>
                      <MySpan>C??n l???i: </MySpan>
                      ...
                    </Typography>
                  </Grid>
                </>
              )}
            </Grid>
          </Grid>
        </Grid>
      </>
    );
  };
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="lg"
    >
      <Grid container className={classes.root}>
        {loadingDetail || loadingState ? (
          <Grid
            item
            xs={12}
            sx={{
              width: 1200,
              height: 416,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <CircularProgress />
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  {orderInfo()}
                </Grid>
                <Grid item xs={8}>
                  <CustomizedSteppers
                    activeId={detailData[0].order_statusid}
                    data={detailData[0]}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sx={{ margin: "10px 0px" }}>
              <Grid container spacing={1}>
                <Grid item xs={4}>
                  {customerInfo()}
                  {tailorInfo()}
                </Grid>
                <Grid item xs={3}>
                  {clothInfo()}
                </Grid>
                <Grid item xs={3}>
                  {measurementInfo()}
                </Grid>
                <Grid item xs={2}>
                  {productInfo()}
                </Grid>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
}

export default DetailForm;
