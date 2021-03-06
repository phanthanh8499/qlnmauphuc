import {
  CircularProgress,
  Dialog,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import React, { useEffect, useRef, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { INFO, LOCAL_PATH } from "../../../constants/Constants";
import CustomizedSteppers from "./CustomizedSteppers";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import PaymentOutlinedIcon from "@mui/icons-material/PaymentOutlined";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import HomeIcon from "@mui/icons-material/Home";
import ImageMagnify from "./ImageMagnify";
import { useDispatch, useSelector } from "react-redux";
import {
  getDetailOrder,
  getUserData,
  processingOrder,
} from "../../../redux/Action";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useSnackbar } from "notistack";
import { format } from "date-fns";
import { useReactToPrint } from "react-to-print";
import EmailIcon from "@mui/icons-material/Email";

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
  const { onClose, id, userid } = props;
  const users = useSelector((state) => state.users);
  const { loadingPermissions, permissionData } = users;
  const [isEdit, setIsEdit] = useState(true);

  const order = useSelector((state) => state.order);
  const { loadingDetail, detailData } = order;
  useEffect(() => {
    dispatch(getDetailOrder(id));
  }, [id]);
  const { loading, userData } = users;

  useEffect(() => {
    dispatch(getUserData());
  }, []);

  const [tailorSelected, setTailorSelected] = useState();

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
    setIsEdit(!isEdit);
  };

  const [tailor, setTailor] = useState();
  const handleChangeEdit = () => {
    if (!tailor) {
      enqueueSnackbar("Chưa chọn thợ may", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    } else {
      enqueueSnackbar("OK", {
        variant: "success",
        autoHideDuration: 2000,
      });
      setIsEdit(!isEdit);
    }
    const today = new Date();
    dispatch(
      processingOrder({
        order_statusid: 2,
        od_orderid: id,
        date: format(today, "yyyy-MM-dd HH:mm:ss"),
        tailorid: parseInt(tailor),
        order_tailorid: tailorSelected[0].id,
        tailor_firstname: tailorSelected[0].user_firstname,
        tailor_lastname: tailorSelected[0].user_lastname,
        tailor_address: tailorSelected[0].user_address,
        tailor_tel: tailorSelected[0].user_tel,
      })
    );
  };

  const handleChangeTailor = (e) => {
    setTailor(e.target.value);
    setTailorSelected(
      userData.filter((item) => item.id === parseInt(e.target.value))
    );
  };

  const renderMenuTailor = () => {
    return userData
      .filter((item) => item.user_typeid === "NV")
      .map((value, key) => {
        return (
          <MenuItem value={value.id} key={key}>
            {value.user_lastname + " " + value.user_firstname}
          </MenuItem>
        );
      });
  };

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
            {parseInt(detailData[0].order_statusid) === 6 ? (
              <Typography className={classes.title}>
                <MySpan>Ngày hoàn thành:</MySpan>
                {formatDate(detailData[0].order_enddate)}
              </Typography>
            ) : (
              <Typography className={classes.title}>
                <MySpan>Ngày hoàn thành (dự kiến):</MySpan>
                {formatDate(detailData[0].order_enddate)}
              </Typography>
            )}
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
          <MyTitle sx={{ flexFlow: "nowrap" }}>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>Địa chỉ:</MySpan> {detailData[0].order_customeraddress}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>Số điện thoại:</MySpan>{" "}
              {detailData[0].order_customerphone}
            </Typography>
          </MyTitle>
          <MyTitle>
            <EmailIcon />
            <Typography className={classes.title}>
              <MySpan>Email:</MySpan>{" "}
              {detailData[0].order_customeremail}
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>
    );
  };

  const tailorInfo = () => {
    return detailData[0].order_statusid >= 2 &&
      detailData[0].order_statusid <= 6 ? (
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <SpanButton>Thông tin người may</SpanButton>
        </Grid>
        <Grid item xs={12} className={classes.infoBox}>
          <MyTitle>
            <PersonIcon />
            <Typography className={classes.title}>
              <MySpan>Người may:</MySpan>
              {detailData[0].tailor_lastname +
                " " +
                detailData[0].tailor_firstname}
            </Typography>
          </MyTitle>
          <MyTitle sx={{ flexFlow: "nowrap" }}>
            <HomeIcon />
            <Typography className={classes.title}>
              <MySpan>Địa chỉ:</MySpan>
              {detailData[0].tailor_address}
            </Typography>
          </MyTitle>
          <MyTitle>
            <PhoneIcon />
            <Typography className={classes.title}>
              <MySpan>Số điện thoại:</MySpan>
              {detailData[0].tailor_tel}
            </Typography>
          </MyTitle>
        </Grid>
      </Grid>
    ) : (
      <Grid container sx={{ mt: 1 }}>
        <Grid item xs={12}>
          <SpanButton>Thông tin người may</SpanButton>
          {detailData[0].order_statusid === 1 && permissionData[0].user_typeid !== "NV" ? (
            isEdit ? (
              <IconButton size="small" onClick={setEdit} color="primary">
                <EditIcon />
              </IconButton>
            ) : (
              <>
                <IconButton
                  size="small"
                  onClick={handleChangeEdit}
                  color="success"
                >
                  <CheckIcon />
                </IconButton>
                <IconButton size="small" onClick={setEdit} color="error">
                  <CloseIcon />
                </IconButton>
              </>
            )
          ) : (
            <></>
          )}
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
                {renderMenuTailor()}
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
              {detailData[0].cloth_typeid === "VCKH" ? null : (
                <Typography className={classes.title}>
                  <MySpan>Số lượng còn lại: </MySpan>
                  {detailData[0].cloth_quantity} (mét)
                </Typography>
              )}
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
                      <MySpan>Còn lại: </MySpan>
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

  const now = new Date();
  var DAYS = ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"]
  console.log(now.getDay());
  console.log(now.getMonth());
  console.log(now.getFullYear());
  console.log(now.getDate());
  const formatDateVn = (now) => {
    var day = now.getDay();
    var date = now.getDate();
    var month = now.getMonth() +1;
    var year = now.getFullYear();
    return (DAYS[day] + ", ngày " + date + " tháng " + month + " năm " + year)
  }

  const componentRef = useRef();
  const pageStyle = `
   @page {margin: 10px; size: 1240px 700px}
   @media print {
    html, body {
      height: initial !important;
      overflow: initial !important;
      -webkit-print-color-adjust: exact;
    }
  }
  @page {
    size: auto;
    margin: 20mm;
  }
`;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "PhieuDatMay" + "_Ngay_" + format(now, "dd-MM/yyyy"),
    pageStyle: pageStyle,
  });

  return (
    <Dialog
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={true}
      maxWidth="lg"
    >
      <Grid container className={classes.root}>
        {loading || loadingDetail || loadingPermissions ? (
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
                    data={detailData[0]}
                    handlePrint={() => handlePrint()}
                    userid={userid}
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
            <Grid container sx={{ display: "none" }}>
              <div ref={componentRef}>
                <Grid container>
                  <Grid item xs={8} align="left">
                    <Typography sx={{ fontWeight: 600, fontSize: 18 }}>
                      {INFO.name}
                    </Typography>
                    <Typography>{INFO.address}</Typography>
                    <Typography>
                      Email: {INFO.email}/Hotline: {INFO.tel}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} align="right">
                    {/* <img src="http://a-dong.com.vn/upload/news/2019/11/07/logo_msmv.jpg"/> */}
                    <Typography>{formatDateVn(now)}</Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                    <Typography sx={{ fontWeight: 600, fontSize: 25 }}>
                      PHIẾU ĐẶT MAY
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      Mã đơn hàng: {detailData[0].od_orderid}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>
                      Khách hàng: {detailData[0].order_customername}
                    </Typography>
                    <Typography>
                      Địa chỉ: {detailData[0].order_customeraddress}
                    </Typography>
                    <Typography>
                      Số điện thoại: {detailData[0].order_customerphone}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      Ngày in: {format(now, "dd/MM/yyyy HH:mm:ss")}
                    </Typography>
                    <Typography>
                      Ngày hẹn trả (dự kiến):{" "}
                      {format(
                        new Date(detailData[0].order_enddate),
                        "dd/MM/yyyy"
                      )}
                    </Typography>
                    <Typography>
                      H.T thanh toán: {detailData[0].opm_name}
                    </Typography>
                    <Typography>
                      P.T vận chuyển: {detailData[0].osm_name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table
                        sx={{ minWidth: 700 }}
                        aria-label="customized table"
                      >
                        <TableHead>
                          <TableRow>
                            <TableCell>Mã hàng</TableCell>
                            <TableCell align="center">Tên hàng</TableCell>
                            <TableCell align="center">Đơn giá</TableCell>
                            <TableCell align="center">Chiết khấu</TableCell>
                            <TableCell align="center">Thuế</TableCell>
                            <TableCell align="center">Thành tiền</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          <TableRow>
                            <TableCell component="th" scope="row">
                              {detailData[0].product_code}
                            </TableCell>
                            <TableCell align="left">
                              {detailData[0].product_name}
                            </TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat().format(
                                detailData[0].product_price
                              )}
                            </TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="left"></TableCell>
                            <TableCell align="right">
                              {new Intl.NumberFormat().format(
                                detailData[0].product_price
                              )}
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </Grid>
                  <Grid item xs={10} align="right" sx={{ fontWeight: 600 }}>
                    Tổng tiền hàng:
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    align="right"
                    sx={{ pr: "16px", fontWeight: 600 }}
                  >
                    {new Intl.NumberFormat().format(
                      detailData[0].product_price
                    )}
                  </Grid>
                  <Grid item xs={10} align="right">
                    Tiền thuế GTGT:
                  </Grid>
                  <Grid item xs={2} align="right" sx={{ pr: "16px" }}>
                    0
                  </Grid>
                  <Grid item xs={10} align="right">
                    Phí vận chuyển:
                  </Grid>
                  <Grid item xs={2} align="right" sx={{ pr: "16px" }}>
                    0
                  </Grid>
                  <Grid item xs={12} align="right">
                    <Divider sx={{ width: "30%" }} />
                  </Grid>
                  <Grid item xs={10} align="right" sx={{ fontWeight: 600 }}>
                    Tổng tiền:
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    align="right"
                    sx={{ pr: "16px", fontWeight: 600 }}
                  >
                    {new Intl.NumberFormat().format(
                      detailData[0].product_price
                    )}
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </>
        )}
      </Grid>
    </Dialog>
  );
}

export default DetailForm;
