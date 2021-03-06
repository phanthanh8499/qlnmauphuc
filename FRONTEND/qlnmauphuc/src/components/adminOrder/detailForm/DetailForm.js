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
      enqueueSnackbar("Ch??a ch???n th??? may", {
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
              <InputLabel id="tailor-label">Th??? may</InputLabel>
              <Select
                labelId="tailor-label"
                id="demo-simple-select"
                value={tailor}
                label="Th??? may"
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
              {detailData[0].cloth_typeid === "VCKH" ? null : (
                <Typography className={classes.title}>
                  <MySpan>S??? l?????ng c??n l???i: </MySpan>
                  {detailData[0].cloth_quantity} (m??t)
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

  const now = new Date();
  var DAYS = ["Ch??? nh???t", "Th??? hai", "Th??? ba", "Th??? t??", "Th??? n??m", "Th??? s??u", "Th??? b???y"]
  console.log(now.getDay());
  console.log(now.getMonth());
  console.log(now.getFullYear());
  console.log(now.getDate());
  const formatDateVn = (now) => {
    var day = now.getDay();
    var date = now.getDate();
    var month = now.getMonth() +1;
    var year = now.getFullYear();
    return (DAYS[day] + ", ng??y " + date + " th??ng " + month + " n??m " + year)
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
                      PHI???U ?????T MAY
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography>
                      M?? ????n h??ng: {detailData[0].od_orderid}
                    </Typography>
                  </Grid>
                  <Grid item xs={8}>
                    <Typography>
                      Kh??ch h??ng: {detailData[0].order_customername}
                    </Typography>
                    <Typography>
                      ?????a ch???: {detailData[0].order_customeraddress}
                    </Typography>
                    <Typography>
                      S??? ??i???n tho???i: {detailData[0].order_customerphone}
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      Ng??y in: {format(now, "dd/MM/yyyy HH:mm:ss")}
                    </Typography>
                    <Typography>
                      Ng??y h???n tr??? (d??? ki???n):{" "}
                      {format(
                        new Date(detailData[0].order_enddate),
                        "dd/MM/yyyy"
                      )}
                    </Typography>
                    <Typography>
                      H.T thanh to??n: {detailData[0].opm_name}
                    </Typography>
                    <Typography>
                      P.T v???n chuy???n: {detailData[0].osm_name}
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
                            <TableCell>M?? h??ng</TableCell>
                            <TableCell align="center">T??n h??ng</TableCell>
                            <TableCell align="center">????n gi??</TableCell>
                            <TableCell align="center">Chi???t kh???u</TableCell>
                            <TableCell align="center">Thu???</TableCell>
                            <TableCell align="center">Th??nh ti???n</TableCell>
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
                    T???ng ti???n h??ng:
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
                    Ti???n thu??? GTGT:
                  </Grid>
                  <Grid item xs={2} align="right" sx={{ pr: "16px" }}>
                    0
                  </Grid>
                  <Grid item xs={10} align="right">
                    Ph?? v???n chuy???n:
                  </Grid>
                  <Grid item xs={2} align="right" sx={{ pr: "16px" }}>
                    0
                  </Grid>
                  <Grid item xs={12} align="right">
                    <Divider sx={{ width: "30%" }} />
                  </Grid>
                  <Grid item xs={10} align="right" sx={{ fontWeight: 600 }}>
                    T???ng ti???n:
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
