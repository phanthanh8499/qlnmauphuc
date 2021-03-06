import React, { useEffect, useRef, useState } from "react";
import { useSnackbar } from "notistack";
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarExport,
} from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  IconButton,
  MenuItem,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  InputLabel,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import BlockIcon from "@mui/icons-material/Block";
import CancelIcon from "@mui/icons-material/Cancel";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PrintIcon from "@mui/icons-material/Print";
import {
  Copyright,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../utility/Utility";
import CancelForm from "./cancelForm/cancelForm";
import XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import { format } from "date-fns";
import {
  CustomNoRowsOverlay,
  useStylesAntDesign,
} from "../utility/DataGridTheme";
import { useReactToPrint } from "react-to-print";
import { INFO } from "../../constants/Constants";
import { useSelector, useDispatch } from "react-redux";
import { getUserData } from "../../redux/Action";
import { MyFormControl } from "../utility/Utility";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport variant="outlined" utf8WithBom={true} />
      {/* <Button variant="outlined" color="primary">
      </Button> */}
    </GridToolbarContainer>
  );
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px 5px 0px !important",
  },
}));

const MyButton = styled(Button)`
  text-transform: none;
  border-radius: 25px;
`;

export default function Data(props) {
  const classes = useStyles();
  const antDesignClasses = useStylesAntDesign();
  const { data, startD, endD } = props;
  const [dataRender, setDataRender] = useState([]);
  const [loading, setLoading] = useState(true);
  const users = useSelector((state) => state.users);
  const { loadingPermissions, permissionData } = users;
  // const dispatch = useDispatch()
  // const { userData } = users;
    
  useEffect(() => {
    setDataRender(data);
    setDataBackup(data);
    setLoading(false);
  }, [data]);

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/??/g, "d")
      .replace(/??/g, "D");
  };

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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [orderId, setOrderId] = useState("");
  const [orderIdList, setOrderIdList] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [cancelForm, setCancelForm] = useState(false);

  const closeAddForm = () => {
    setAddForm(false);
  };

  const openDetailForm = () => {
    setDetailForm(true);
  };
  const closeDetailForm = () => {
    setDetailForm(false);
  };

  const openDeleteForm = () => {
    setDeleteForm(true);
  };
  const closeDeleteForm = () => {
    setDeleteForm(false);
  };

  const openCancelForm = () => {
    setCancelForm(true);
  };
  const closeCancelForm = () => {
    setCancelForm(false);
  };

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const handleClickEdit = () => {
    setAnchorEl(null);
  };
  const handleClickCancel = () => {
    setAnchorEl(null);
    if (orderIdList.length === 0) {
      enqueueSnackbar("Vui l??ng ch???n ????n h??ng c???n hu???", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      openCancelForm();
    }
  };
  const handleClickDelete = () => {
    setAnchorEl(null);
    if (orderIdList.length === 0) {
      enqueueSnackbar("Vui l??ng ch???n ????n h??ng c???n xo??", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      openDeleteForm();
    }
  };

  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));

  const renderForm = () => {
    if (addForm) {
      return (
        <AddForm
          open={addForm}
          onClose={closeAddForm}
          id={parseInt(dataRender[Object.keys(dataRender).sort().pop()].id)}
          userid={userInfo.id}
        ></AddForm>
      );
    }
    if (detailForm) {
      return (
        <DetailForm
          open={detailForm}
          onClose={closeDetailForm}
          id={orderId}
          userid={userInfo.id}
        ></DetailForm>
      );
    }
    if (deleteForm) {
      return (
        <DeleteForm
          open={deleteForm}
          onClose={closeDeleteForm}
          id={orderId}
          listId={orderIdList}
          userid={userInfo.id}
          orderStatus={orderStatus}
        ></DeleteForm>
      );
    }
    if (cancelForm) {
      return (
        <CancelForm
          open={cancelForm}
          onClose={closeCancelForm}
          id={orderId}
          listId={orderIdList}
          userid={userInfo.id}
        ></CancelForm>
      );
    }
  };

  const [orderStatus, setOrderStatus] = useState();
  const columns = [
    { field: "od_orderid", headerName: "M?? ????n h??ng", width: 350 },
    { field: "product_name", headerName: "T??n s???n ph???m", width: 400 },
    {
      field: "order_startdate",
      headerName: "Ng??y t???o",
      width: 150,
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    {
      field: "order_enddate",
      headerName: "Ng??y ho??n t???t",
      width: 200,
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
    { field: "order_customername", headerName: "T??n kh??ch h??ng", width: 200 },
    {
      field: "order_customerphone",
      headerName: "S??? ??i???n tho???i",
      width: 150,
    },
    { field: "order_customeraddress", headerName: "?????a ch???", width: 500 },
    { field: "tailor_name", headerName: "Ng?????i may", width: 250 },
    // { field: "tailor_tel", headerName: "S??? ??i???n tho???i ng?????i may", width: 250 },
    { field: "osm_name", headerName: "Ph????ng th???c v???n chuy???n", width: 250 },
    { field: "opm_name", headerName: "Ph????ng th???c thanh to??n", width: 300 },
    {
      field: "os_name",
      headerName: "Tr???ng th??i",
      width: 200,
      renderCell: (params) => {
        return params.value === "??ang ?????i x??? l??" ? (
          <MyButton variant="outlined" color="warning" fullWidth>
            ??ang ?????i x??? l??
          </MyButton>
        ) : params.value === "?????i th??? may" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            ?????i th??? may
          </MyButton>
        ) : params.value === "??ang l???y v???i" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            ??ang l???y v???i
          </MyButton>
        ) : params.value === "??ang may" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            ??ang may
          </MyButton>
        ) : params.value === "???? may xong" ? (
          <MyButton variant="outlined" color="primary" fullWidth>
            ???? may xong
          </MyButton>
        ) : params.value === "??ang v???n chuy???n" ? (
          <MyButton variant="outlined" color="secondary" fullWidth>
            ??ang v???n chuy???n
          </MyButton>
        ) : params.value === "Ho??n t???t" ? (
          <MyButton variant="outlined" color="success" fullWidth>
            Ho??n t???t
          </MyButton>
        ) : (
          <MyButton variant="outlined" color="error" fullWidth>
            ???? hu???
          </MyButton>
        );
      },
    },
    {
      field: "order_total",
      headerName: "T???ng ti??n",
      width: 150,
      type: "number",
    },

    {
      field: "id",
      headerName: "H??nh ?????ng",
      sortable: false,
      width: 110,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
          setOrderId(
            dataRender.filter((item) => item.id === params.value)[0].od_orderid
          );
        };

        const handleClickDelete = () => {
          openDeleteForm();
          setOrderId(
            dataRender.filter((item) => item.id === params.value)[0].od_orderid
          );
          setOrderStatus(
            dataRender.filter((item) => item.id === params.value)[0]
              .order_statusid
          );
        };

        return (
          <ButtonGroup variant="outlined">
            <IconButton onClick={handleClickEdit} size="large">
              <VisibilityIcon />
            </IconButton>
            {permissionData[0].user_typeid === "NV" ? null : (
              <IconButton onClick={handleClickDelete} size="large">
                <DeleteOutlineIcon color="error" />
              </IconButton>
            )}
          </ButtonGroup>
        );
      },
    },
  ];

  const exportFile = () => {
    var list = [];
    for(let i=0; i<dataRender.length; i++){
      list.push({
        STT: i + 1,
        "M?? ????n h??ng": dataRender[i].od_orderid,
        "T??n m???u may": dataRender[i].product_name,
        "Ng?????i ?????t may": dataRender[i].order_customername,
        "S??? ??i???n tho???i": dataRender[i].order_customerphone,
        "?????a ch???": dataRender[i].order_customeraddress,
        Email: dataRender[i].order_customeremail,
        "Ng??y t???o": formatDate(dataRender[i].order_startdate),
        "Ng??y ho??n t???t": formatDate(dataRender[i].order_enddate),
        "Ng?????i may": dataRender[i].tailor_name,
        "S??? ??i???n tho???i ng?????i may": dataRender[i].tailor_tel,
        "Ph????ng th???c v???n chuy???n": dataRender[i].osm_name,
        "Ph????ng th???c thanh to??n": dataRender[i].opm_name,
        "Tr???ng th??i ho?? ????n": dataRender[i].os_name,
        "T???ng ti???n": dataRender[i].order_total,
      });
    }
    const ws = XLSX.utils.json_to_sheet(list);
    var now = new Date();
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "DSDonHang " + now + ".xlsx");
  };


  const [dataBackup, setDataBackup] = useState();
  
  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          data.od_orderid.includes(string.toLowerCase()) ||
          removeAccents(data.order_customername)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.product_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.os_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.order_customername)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.order_customeraddress)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.tailor_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.osm_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.opm_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          formatDate(data.order_startdate).includes(string) ||
          formatDate(data.order_enddate).includes(string) ||
          data.order_customerphone.toString().includes(string) ||
          data.tailor_tel.toString().includes(string) ||
          data.order_total.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(dataBackup);
    }
  };

  const componentRef = useRef();
  const subtotal = (items) => {
    return items.map((item) => item.order_total).reduce((sum, i) => sum + i, 0);
  };
  const total = subtotal(dataRender);
  const now = new Date();
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
    documentTitle: "BaoCaoDonHang" + "_Ngay_" + format(now, "dd-MM/yyyy"),
    pageStyle: pageStyle,
  });

  // const [tailor, setTailor] = useState(0);
  // const handleChangeTailor = (e) => {
  //   console.log(e.target.value)
  //   var string = e.target.value;
  //   setTailor(e.target.value);
  //   if (string !== 0) {
  //     console.log("???")
  //     console.log(dataBackup.filter((data) => (data.order_tailorid === parseInt(string))));
  //     let filtered = dataBackup.filter(
  //       (data) => data.order_tailorid === parseInt(string)
  //     );
  //     setDataRender(filtered);
  //   } else {
  //     console.log("?????");
  //     setDataRender(dataBackup);
  //   }
  // };

  // const renderMenuTailor = () => {
  //   return userData
  //     .filter((item) => item.user_typeid === "NV")
  //     .map((value, key) => {
  //       return (
  //         <MenuItem value={value.id} key={key}>
  //           {value.user_lastname + " " + value.user_firstname}
  //         </MenuItem>
  //       );
  //     });
  // };

  return (
    <Grid container>
      {loading || loadingPermissions ? (
        <Grid
          item
          xs={12}
          sx={{
            width: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "570px",
            backgroundColor: "rgb(0 0 0 / 2%);",
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        <>
          <Grid item xs={12} sx={{ marginBottom: "5px" }}>
            <Grid container>
              <Grid item xs={6}>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={exportFile}
                  sx={{ ml: 0.5 }}
                >
                  <SaveAltIcon sx={{ mr: 0.5 }} /> Xu???t Excel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePrint()}
                  sx={{ ml: 0.5 }}
                >
                  <PrintIcon sx={{ mr: 0.5 }} /> T???o b???n in
                </Button>
                <Button
                  id="demo-customized-button"
                  aria-controls="demo-customized-menu"
                  aria-haspopup="true"
                  aria-expanded={openMenu ? "true" : undefined}
                  variant="contained"
                  disableElevation
                  onClick={handleClickMenu}
                  endIcon={<KeyboardArrowDownIcon />}
                  sx={{ ml: 0.5 }}
                >
                  H??nh ?????ng
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    "aria-labelledby": "demo-customized-button",
                  }}
                  anchorEl={anchorEl}
                  open={openMenu}
                  onClose={handleCloseMenu}
                >
                  <MenuItem onClick={handleClickCancel} disableRipple>
                    <BlockIcon />
                    Hu???
                  </MenuItem>
                  <MenuItem onClick={handleClickDelete} disableRipple>
                    <CancelIcon />
                    Xo??
                  </MenuItem>
                </StyledMenu>
              </Grid>
              <Grid item xs={3}>
                {/* <MyFormControl fullWidth>
                  <InputLabel id="tailor-label">Th??? may</InputLabel>
                  <Select
                    labelId="tailor-label"
                    id="demo-simple-select"
                    value={tailor}
                    label="Th??? may"
                    onChange={handleChangeTailor}
                  >
                    <MenuItem value={0}>T???t c???</MenuItem>
                    {renderMenuTailor()}
                  </Select>
                </MyFormControl> */}
                
              </Grid>
              <Grid item xs={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search???"
                    inputProps={{ "aria-label": "search" }}
                    onChange={liveSearch}
                  />
                </Search>
              </Grid>
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            style={{
              height: 445,
              width: "100%",
              "background-color": "#ffffff",
            }}
          >
            <DataGrid
              rows={dataRender}
              columns={columns}
              pageSize={6}
              className={antDesignClasses.root}
              checkboxSelection
              disableSelectionOnClick
              components={{
                NoRowsOverlay: CustomNoRowsOverlay,
              }}
              onSelectionModelChange={(ids) => {
                const selectedIDs = new Set(ids);
                const selectedRowData = dataRender.filter((row) =>
                  selectedIDs.has(row.id)
                );
                setOrderIdList(selectedRowData);
              }}
            />
            {Copyright()}
          </Grid>

          {renderForm()}
          <Grid container sx={{ display: "none" }}>
            <div ref={componentRef}>
              <Grid container>
                <Grid item xs={6} sx={{ textAlign: "left" }}>
                  <Typography sx={{ fontWeight: 600 }}>{INFO.name}</Typography>
                </Grid>
                <Grid item xs={6} sx={{ textAlign: "right" }}>
                  <Typography sx={{ fontWeight: 600 }}>M???u in: B111</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ng??y in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">
                    B??o c??o k???t qu??? th???ng k?? ????n h??ng
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                    {`(T??? ng??y: ${format(
                      startD,
                      "dd-MM-yyyy"
                    )} --- ?????n ng??y: ${format(endD, "dd-MM-yyyy")})`}
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>M?? ????n h??ng</TableCell>
                      <TableCell align="center">Ng??y t???o</TableCell>
                      <TableCell align="center">Ng??y ho??n t???t</TableCell>
                      <TableCell align="center">Tr???ng th??i</TableCell>
                      <TableCell align="center">T??n kh??ch h??ng</TableCell>
                      <TableCell align="center">?????a ch???</TableCell>
                      <TableCell align="center">T??n s???n ph???m</TableCell>
                      <TableCell align="center">T???ng ti???n</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row, key) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell>{key + 1}</TableCell>
                          <TableCell component="th" scope="row">
                            {row.od_orderid}
                          </TableCell>
                          <TableCell align="center">
                            {formatDate(row.order_startdate)}
                          </TableCell>
                          <TableCell align="center">
                            {formatDate(row.order_enddate)}
                          </TableCell>
                          <TableCell align="left">{row.os_name}</TableCell>
                          <TableCell align="left">
                            {row.order_customername}
                          </TableCell>
                          <TableCell align="left">
                            {row.order_customeraddress}
                          </TableCell>
                          <TableCell align="left">{row.product_name}</TableCell>
                          <TableCell align="right">
                            {row.order_total.toLocaleString("it-IT", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={7}></TableCell>
                      <TableCell>
                        <Typography sx={{ fontWeight: 500 }}>
                          T???ng c???ng:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {total.toLocaleString("it-IT", {
                          style: "currency",
                          currency: "VND",
                        })}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </Grid>
        </>
      )}
    </Grid>
  );
}
