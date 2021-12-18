import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { INFO, XOA_HINH_ANH } from "../../constants/Constants";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import {
  Copyright,
  MyFormControl,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../utility/Utility";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import XLSX from "xlsx";
import AddIcon from "@mui/icons-material/Add";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PrintIcon from "@mui/icons-material/Print";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import { CustomNoRowsOverlay, useStylesAntDesign } from "../utility/DataGridTheme";
import { useReactToPrint } from "react-to-print";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px 5px 0px !important",
  },
}));

// const MyButton = styled(Button)`
//   text-transform: none;
//   border-radius: 25px;
// `;

const MyButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 25,
}));

export default function Data(props) {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const antDesignClasses = useStylesAntDesign();
  const dispatch = useDispatch();
  const [dataRender, setDataRender] = useState();
  const { data, isKH } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setDataRender(data);
    setDataBackup(data);
    setLoading(false);
  }, [data]);

  const rows = dataRender;
  const [clothId, setClothId] = useState(0);
  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [clothIdList, setClothIdList] = useState([]);
  const openAddForm = () => {
    setAddForm(true);
  };
  const closeAddForm = () => {
    setAddForm(false);
    dispatch({ type: XOA_HINH_ANH });
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

  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickEdit = () => {
    setAnchorEl(null);
  };

  const handleClickDelete = () => {
    setAnchorEl(null);
    if (clothIdList.length === 0) {
      enqueueSnackbar("Vui lòng chọn đơn hàng cần xoá", {
        variant: "error",
        autoHideDuration: 2000,
      });
    } else {
      openDeleteForm();
    }
  };

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const removeAccents = (str) => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));

  const renderForm = () => {
    if (addForm) {
      return (
        <AddForm
          open={addForm}
          onClose={closeAddForm}
          id={parseInt(
            dataRender[
              Object.keys(dataRender)
                .sort(function (a, b) {
                  if (a.id >= b.id) return a;
                })
                .pop()
            ].id
          )}
          userid={userInfo.id}
        ></AddForm>
      );
    }
    if (detailForm) {
      return (
        <DetailForm
          open={detailForm}
          onClose={closeDetailForm}
          id={parseInt(clothId)}
          userid={userInfo.id}
        ></DetailForm>
      );
    }
    if (deleteForm) {
      return (
        <DeleteForm
          open={deleteForm}
          onClose={closeDeleteForm}
          id={parseInt(clothId)}
          listId={clothIdList}
          userid={userInfo.id}
        ></DeleteForm>
      );
    }
  };

  const columns = [
    { field: "cloth_material", headerName: "Thành phần", width: 300 },
    { field: "cloth_name", headerName: "Tên vải", width: 350 },
    {
      field: "cloth_quantity",
      headerName: "Số lượng (mét)",
      width: 200,
      type: "number",
    },
    {
      field: "user_username",
      headerName: "Chủ sở hữu",
      width: 150,
      renderCell: (params) => {
        if (params.value === "admin") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              {params.value}
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
      },
    },
    { field: "ct_name", headerName: "Loại vải", width: 200 },
    {
      field: "id",
      headerName: "Hành động",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      align: 'center',
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
          setClothId(params.value);
        };

        const handleClickDelete = () => {
          openDeleteForm();
          setClothId(params.value);
        };

        return (
          <ButtonGroup>
            <IconButton onClick={handleClickEdit} size="large">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={handleClickDelete} size="large">
              <DeleteOutlineIcon color="error" />
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  const columns2 = [
    { field: "cloth_material", headerName: "Thành phần", width: 300 },
    { field: "cloth_name", headerName: "Tên vải", width: 500 },
    {
      field: "user_username",
      headerName: "Chủ sở hữu",
      width: 150,
      renderCell: (params) => {
        if (params.value === "admin") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              {params.value}
            </MyButton>
          );
        } else {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
      },
    },
    { field: "ct_name", headerName: "Loại vải", width: 250 },
    {
      field: "id",
      headerName: "Hành động",
      sortable: false,
      width: 150,
      disableClickEventBubbling: true,
      align: 'center',
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
          setClothId(params.value);
        };

        const handleClickDelete = () => {
          openDeleteForm();
          setClothId(params.value);
        };

        return (
          <ButtonGroup>
            <IconButton onClick={handleClickEdit} size="large">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={handleClickDelete} size="large">
              <DeleteOutlineIcon color="error" />
            </IconButton>
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
        "Mã vải": dataRender[i].id,
        "Chất liệu": dataRender[i].cloth_material,
        Tên: dataRender[i].cloth_name,
        "Số lượng (mét)": dataRender[i].cloth_quantity,
        "Loại vải": dataRender[i].ct_name,
        "Chủ sở hữu": dataRender[i].user_username,
      });
    }
    var now = new Date();
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "DSVai " + now + ".xlsx");
  };

  const [count, setCount] = useState(0)
  const handleClickSearch = () => {
    let temp = [...data]
    if(materialSelected.length >= 1){
      for(let i=0; i<materialSelected.length; i++){
        temp = temp.filter((data) => {
          return removeAccents(data.cloth_material)
            .toLowerCase()
            .includes(removeAccents(materialSelected[i]).toLowerCase());
        })
      }
    }
    if(colorSelected){
      temp = temp.filter((data) => {
        return removeAccents(data.cloth_name).toLowerCase().includes(removeAccents(colorSelected).toLowerCase())
      })
    }
    setCount(count+1);
    setDataRender(temp);
    setDataBackup(temp);
  };

  const theme = useTheme();
  const [materialSelected, setMaterialSelected] = useState([]);
  const [colorSelected, setColorSelected] = useState("");
  const [dataBackup, setDataBackup] = useState([]);

  const materialNames = [
    "Polyester",
    "Viscose",
    "Spandex",
    "Cotton",
  ];

  const colorNames = [
    "Trắng",
    "Đen",
    "Xám",
    "Xanh",
    "Xanh thanh",
    "Vàng",
    "Vàng nâu",
    "Đỏ",
    "Đỏ rượu",
    "Đỏ nâu",
  ];

  const handleChangeMaterial = (event) => {
    const {
      target: { value },
    } = event;
    setMaterialSelected(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          removeAccents(data.cloth_material)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.cloth_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.user_username)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.ct_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.user_firstname)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.user_lastname)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.user_lastname + " " + data.user_firstname)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          data.cloth_quantity.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(dataBackup);
    }
  };

  const renderSearchForm = () => {
    return (
      <>
        <Grid item xs={3}>
          <MyFormControl sx={{ ml: 0.5, width: "100%" }}>
            <InputLabel id="select-material-label">Thành phần</InputLabel>
            <Select
              multiple
              displayEmpty
              value={materialSelected}
              onChange={handleChangeMaterial}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Tất cả</em>;
                }
                return selected.join(", ");
              }}
              MenuProps={MenuProps}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem disabled value="">
                <em>Tất cả</em>
              </MenuItem>
              {materialNames.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, materialSelected, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          <MyFormControl sx={{ width: "100%" }}>
            <InputLabel id="cloth-color-select-label">Màu sắc</InputLabel>
            <Select
              labelId="cloth-color-select-label"
              id="cloth-color-select"
              value={colorSelected}
              displayEmpty
              label="màu sắc"
              onChange={(e) => setColorSelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              {colorNames.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          {/* <MyTextField
            id="minQuantity"
            label="Min"
            margin="normal"
            fullWidth
            // type="number"
            // onChange={getParamLastName}
            size="small"
            InputLabelProps={{
              shrink: true,
            }}
            type="number"
            sx={{ top: "-5px" }}
          /> */}
        </Grid>
        <Grid item xs={1}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSearch}
            sx={{ float: "right", mr: 0.5, backgroundColor: '#ffffff'}}
          >
            Tìm kiếm
          </Button>
        </Grid>
      </>
    );
  };

  const componentRef = useRef();
  const subtotal = (items) => {
    return items
      .map((item) => item.cloth_quantity)
      .reduce((sum, i) => sum + i, 0);
  };
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
    documentTitle: "BaoCaoVai" + "_Ngay_" + format(now, "dd-MM/yyyy"),
    pageStyle: pageStyle,
  });

  return (
    <Grid container>
      {loading ? (
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
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  {renderSearchForm()}
                </Grid>
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              <Grid item xs={9}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={openAddForm}
                  sx={{ ml: 0.5 }}
                >
                  <AddIcon sx={{ mr: 0.5 }} />
                  Thêm vải
                </Button>
                <Button
                  variant="outlined"
                  color="success"
                  onClick={exportFile}
                  sx={{ ml: 0.5 }}
                >
                  <SaveAltIcon sx={{ mr: 0.5 }} /> Xuất Excel
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => handlePrint()}
                  sx={{ ml: 0.5 }}
                >
                  <PrintIcon sx={{ mr: 0.5 }} /> Tạo bản in
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
                  Hành động
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
                  <MenuItem onClick={handleClickEdit} disableRipple>
                    <EditIcon />
                    Cập nhật trạng thái
                  </MenuItem>

                  <MenuItem onClick={handleClickDelete} disableRipple>
                    <CancelIcon />
                    Xoá
                  </MenuItem>
                </StyledMenu>
              </Grid>
              <Grid item xs={3}>
                <Search>
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
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
              rows={rows}
              columns={isKH ? columns2 : columns}
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
                setClothIdList(selectedRowData);
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
                  <Typography sx={{ fontWeight: 600 }}>Mẫu in: B112</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ngày in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">
                    Báo cáo kết quả thống kê vải
                  </Typography>
                  <Typography sx={{ fontSize: 14, fontStyle: "italic" }}>
                    {/* {count === 0
                      ? `(Từ ngày: ${format(
                          startD,
                          "dd-MM-yyyy"
                        )} --- Đến ngày: 
                    ${format(endD, "dd-MM-yyyy")})`
                      : `(Từ ngày: ${format(
                          startDate,
                          "dd-MM-yyyy"
                        )} --- Đến ngày: 
                    ${format(endDate, "dd-MM-yyyy")})`} */}
                  </Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell>Mã vải</TableCell>
                      <TableCell align="center">Thành phần</TableCell>
                      <TableCell align="center">Tên vải</TableCell>
                      <TableCell align="center">Loại vải</TableCell>
                      <TableCell align="center">Chủ sở hữu</TableCell>
                      <TableCell align="center">Số lượng (mét)</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row, key) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell>
                            {key+1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.id}
                          </TableCell>
                          <TableCell align="left">
                            {row.cloth_material}
                          </TableCell>
                          <TableCell align="left">{row.cloth_name}</TableCell>
                          <TableCell align="left">{row.ct_name}</TableCell>
                          <TableCell align="left">
                            {row.user_username}
                          </TableCell>
                          <TableCell align="right">
                            {new Intl.NumberFormat("de-DE").format(
                              row.cloth_quantity
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    <TableRow>
                      <TableCell colSpan={4}></TableCell>
                      <TableCell colSpan={2} align="right">
                        <Typography sx={{ fontWeight: 500 }}>
                          Tổng cộng:
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        {new Intl.NumberFormat("de-DE").format(
                          subtotal(dataRender)
                        )}
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
