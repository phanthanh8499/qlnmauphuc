import {
  CircularProgress,
  Dialog,
  Grid,
  Typography,
} from "@mui/material";
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

const useStyle = makeStyles((theme) => ({
  root: {
    padding: 20,
    // width: "1200px !important",
  },
  title: {
    fontSize: "14px !important",
    color: "#666666",
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
  const { open, onClose, id, data } = props;
  const [loading, setLoading] = useState(true);
  const [dataRender, setDataRender] = useState([]);
  useEffect(() => {
    setDataRender(data);
    setLoading(false);
  }, [data]);

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
          <Typography className={classes.title}>
            <SpanButton>Mã đơn hàng</SpanButton>
            {dataRender.od_orderid}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <AccessAlarmIcon />
            <Typography className={classes.title}>
              <MySpan>Ngày đặt hàng:</MySpan>
              {formatDate(dataRender.order_startdate)}
            </Typography>
          </MyTitle>
          <MyTitle>
            <AccessAlarmIcon />
            <Typography className={classes.title}>
              <MySpan>Ngày hoàn thành (dự kiến):</MySpan>
              {formatDate(dataRender.order_enddate)}
            </Typography>
          </MyTitle>
          <MyTitle>
            <LocalShippingIcon />
            <Typography className={classes.title}>
              <MySpan>P. Thức vận chuyển:</MySpan>
              {dataRender.osm_name}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PaymentOutlinedIcon />
            <Typography className={classes.title}>
              <MySpan>P. Thức thanh toán:</MySpan>
              {dataRender.opm_name}
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
          <SpanButton>Thông tin người nhận</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Người nhận:</MySpan> {dataRender.order_customername}
            </Typography>
          </MyTitle>
          <MyTitle>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>Địa chỉ:</MySpan> {dataRender.order_customeraddress}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>Số điện thoại:</MySpan> {dataRender.order_customerphone}
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>
    );
  };

  const tailorInfo = () => {
    return (
      dataRender.order_statusid >= 2 ? (<Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <SpanButton>Thông tin người may</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Người may:</MySpan>Nguyễn Văn B
            </Typography>
          </MyTitle>
          <MyTitle>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>Địa chỉ:</MySpan>300, Nguyễn Văn Linh, Ninh Kiều, Cần Thơ
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>Số điện thoại:</MySpan>0915518099
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>) : (<Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <SpanButton>Thông tin người may</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Người may:</MySpan>...
            </Typography>
          </MyTitle>
          <MyTitle>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>Địa chỉ:</MySpan>...
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>Số điện thoại:</MySpan>...
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>)
      
    );
  };

  const clothInfo = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <SpanButton>Thông tin vải</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <Grid container>
            <Grid item xs={12}>
              <ImageMagnify
                image={LOCAL_PATH + dataRender.cloth_image.substring(2)}
              ></ImageMagnify>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title}>
                <MySpan>Tên vải: </MySpan>
                {dataRender.cloth_name}
              </Typography>
              <Typography className={classes.title}>
                <MySpan>Chất liệu: </MySpan>
                {dataRender.cloth_material}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }

  const measurementInfo = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <SpanButton>Thông tin số đo</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <Grid container>
            <Grid item xs={6}>
              {dataRender.od_neckline === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng cổ: </MySpan>
                  {dataRender.od_neckline}
                </Typography>
              )}
              {dataRender.od_bust === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng ngực: </MySpan>
                  {dataRender.od_bust}
                </Typography>
              )}
              {dataRender.od_shoulderwidth === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Rộng vai: </MySpan>
                  {dataRender.od_shoulderwidth}
                </Typography>
              )}
              {dataRender.od_wristaround === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Cửa tay: </MySpan>
                  {dataRender.od_wristaround}
                </Typography>
              )}
              {dataRender.od_sleevelength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài tay: </MySpan>
                  {dataRender.od_sleevelength}
                </Typography>
              )}
              {dataRender.od_shirtlength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài áo: </MySpan>
                  {dataRender.od_shirtlength}
                </Typography>
              )}
              {dataRender.od_armpitcircumference === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng nách: </MySpan>
                  {dataRender.od_armpitcircumference}
                </Typography>
              )}
              {dataRender.od_biceps === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Bắp tay: </MySpan>
                  {dataRender.od_biceps}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {dataRender.od_waist === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng eo: </MySpan>
                  {dataRender.od_waist}
                </Typography>
              )}
              {dataRender.od_buttock === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng mông: </MySpan>
                  {dataRender.od_buttock}
                </Typography>
              )}
              {dataRender.od_thighcircumference === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng đùi: </MySpan>
                  {dataRender.od_thighcircumference}
                </Typography>
              )}
              {dataRender.od_crotchlength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng dáy: </MySpan>
                  {dataRender.od_crotchlength}
                </Typography>
              )}
              {dataRender.od_dresslength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài váy: </MySpan>
                  {dataRender.od_dresslength}
                </Typography>
              )}
              {dataRender.od_pantslength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài quần: </MySpan>
                  {dataRender.od_pantslength}
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
        <img
          className={classes.img}
          src={LOCAL_PATH + dataRender.product_image1.substring(2)}
          alt={dataRender.product_name}
        ></img>
      </>
    );
  }
  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="lg"
    >
      <Grid container className={classes.root}>
        {loading ? (
          <Grid item xs={12} sx={{ width: 1200, height: 416, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  <CustomizedSteppers activeId={data.order_statusid} />
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
