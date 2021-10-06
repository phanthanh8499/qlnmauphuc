import { ButtonGroup, CircularProgress, Dialog, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, Typography } from "@mui/material";
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
import { getDetailOrder, processingOrder } from "../../../redux/Action";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";

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
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { open, onClose, id, data } = props;
  const [loading, setLoading] = useState(true);
  const [isEdit, setIsEdit] = useState(true);

  const order = useSelector((state) => state.order);
  const { loadingDetail, detailData } = order;
  useEffect(() => {
    dispatch(getDetailOrder(id));
  }, [id]);


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

  const setEdit = () => {
    setIsEdit(!isEdit)
  }

  const [tailor, setTailor] = useState();
  const handleChangeEdit = () => {
    if (!tailor) {
      enqueueSnackbar("Chưa chọn thợ may", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      enqueueSnackbar("OK", {
        variant: "success",
        autoHideDuration: 2000,
      });
       setIsEdit(!isEdit);
    }
    dispatch(processingOrder({order_statusid: 2, od_orderid: id}));
  }
  const handleChangeTailor = (e) => {
    
    setTailor(e.target.value);
  }
  const orderInfo = () => {
    return (
      <Grid container>
        <Grid item xs={12}>
          <Typography className={classes.orderid}>
            <SpanButton>Mã đơn hàng</SpanButton>
            {detailData[0].od_orderid}
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <AccessAlarmIcon />
            <Typography className={classes.title}>
              <MySpan>Ngày đặt hàng:</MySpan>
              {formatDate(detailData[0].order_startdate)}
            </Typography>
          </MyTitle>
          <MyTitle>
            <AccessAlarmIcon />
            <Typography className={classes.title}>
              <MySpan>Ngày hoàn thành (dự kiến):</MySpan>
              {formatDate(detailData[0].order_enddate)}
            </Typography>
          </MyTitle>
          <MyTitle>
            <LocalShippingIcon />
            <Typography className={classes.title}>
              <MySpan>P. Thức vận chuyển:</MySpan>
              {detailData[0].osm_name}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PaymentOutlinedIcon />
            <Typography className={classes.title}>
              <MySpan>P. Thức thanh toán:</MySpan>
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
          <SpanButton>Thông tin người nhận</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Người nhận:</MySpan> {detailData[0].order_customername}
            </Typography>
          </MyTitle>
          <MyTitle>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>Địa chỉ:</MySpan> {detailData[0].order_customeraddress}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>Số điện thoại:</MySpan> {detailData[0].order_customerphone}
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
      </Grid>
    ) : (
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <SpanButton>Thông tin người may</SpanButton>
          {detailData[0].order_statusid === 1 ? (isEdit ? (
            <IconButton size="small" onClick={setEdit} color="primary">
              <EditIcon />
            </IconButton>
          ) : (
            <>
              <IconButton size="small" onClick={handleChangeEdit} color="success">
                <CheckIcon />
              </IconButton>
              <IconButton size="small" onClick={setEdit} color="error">
                <CloseIcon />
              </IconButton>
            </>
          )) : (<></>)}
          
        </Grid>

        <Grid item xs={12} className={classes.infoBox}>
          {!isEdit ? (
            <FormControl fullWidth>
              <InputLabel id="tailor-label">Thợ may</InputLabel>
              <Select
                labelId="tailor-label"
                id="demo-simple-select"
                value={tailor}
                label="Thợ may"
                onChange={handleChangeTailor}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          ) : (
            <>
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
            </>
          )}
        </Grid>
      </Grid>
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
                image={LOCAL_PATH + detailData[0].cloth_image.substring(2)}
              ></ImageMagnify>
            </Grid>
            <Grid item xs={12}>
              <Typography className={classes.title}>
                <MySpan>Tên vải: </MySpan>
                {detailData[0].cloth_name}
              </Typography>
              <Typography className={classes.title}>
                <MySpan>Chất liệu: </MySpan>
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
          <SpanButton>Thông tin số đo</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <Grid container>
            <Grid item xs={6}>
              {detailData[0].od_neckline === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng cổ: </MySpan>
                  {detailData[0].od_neckline}
                </Typography>
              )}
              {detailData[0].od_bust === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng ngực: </MySpan>
                  {detailData[0].od_bust}
                </Typography>
              )}
              {detailData[0].od_shoulderwidth === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Rộng vai: </MySpan>
                  {detailData[0].od_shoulderwidth}
                </Typography>
              )}
              {detailData[0].od_wristaround === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Cửa tay: </MySpan>
                  {detailData[0].od_wristaround}
                </Typography>
              )}
              {detailData[0].od_sleevelength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài tay: </MySpan>
                  {detailData[0].od_sleevelength}
                </Typography>
              )}
              {detailData[0].od_shirtlength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài áo: </MySpan>
                  {detailData[0].od_shirtlength}
                </Typography>
              )}
              {detailData[0].od_armpitcircumference === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng nách: </MySpan>
                  {detailData[0].od_armpitcircumference}
                </Typography>
              )}
              {detailData[0].od_biceps === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Bắp tay: </MySpan>
                  {detailData[0].od_biceps}
                </Typography>
              )}
            </Grid>
            <Grid item xs={6}>
              {detailData[0].od_waist === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng eo: </MySpan>
                  {detailData[0].od_waist}
                </Typography>
              )}
              {detailData[0].od_buttock === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng mông: </MySpan>
                  {detailData[0].od_buttock}
                </Typography>
              )}
              {detailData[0].od_thighcircumference === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng đùi: </MySpan>
                  {detailData[0].od_thighcircumference}
                </Typography>
              )}
              {detailData[0].od_crotchlength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Vòng dáy: </MySpan>
                  {detailData[0].od_crotchlength}
                </Typography>
              )}
              {detailData[0].od_dresslength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài váy: </MySpan>
                  {detailData[0].od_dresslength}
                </Typography>
              )}
              {detailData[0].od_pantslength === 0 ? null : (
                <Typography className={classes.title}>
                  <MySpan>Dài quần: </MySpan>
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
            <SpanButton>Thông tin sản phẩm</SpanButton>
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
                  <MySpan>Tổng tiền: </MySpan>
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
                      <MySpan>Đã trả: </MySpan>
                      {(detailData[0].order_total * 0.5).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.title}>
                      <MySpan>Còn lại: </MySpan>
                      {(detailData[0].order_total * 0.5).toLocaleString("it-IT", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </Typography>
                  </Grid>{" "}
                </>
              ) : (
                <>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.title}>
                      <MySpan>Đã trả: </MySpan>
                      ...
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={center}>
                    <Typography className={classes.title}>
                      <MySpan>Còn lại: </MySpan>
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
        {loadingDetail ? (
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
                    id={id}
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
