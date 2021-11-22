import React, { useEffect, useRef, useState } from "react";
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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { INFO, LOCAL_PATH } from "../../constants/Constants";
import { styled } from "@mui/material/styles";
import {
  Copyright,
  MyFormControl,
  Search,
  SearchIconWrapper,
  StyledInputBase,
  StyledMenu,
} from "../utility/Utility";
import SearchIcon from "@mui/icons-material/Search";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import XLSX from "xlsx";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import PrintIcon from "@mui/icons-material/Print";
import { useTheme } from "@mui/material/styles";
import { format } from "date-fns";
import {
  CustomNoRowsOverlay,
  useStylesAntDesign,
} from "../utility/DataGridTheme";
import { useReactToPrint } from "react-to-print";

const MyButton = styled(Button)(({ theme }) => ({
  textTransform: "none",
  borderRadius: 25,
}));

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
    margin: "0px 0px -5px 0px !important",
  },
  img: {
    height: 100,
    width: 100,
  },
}));

export default function Data(props) {
  const classes = useStyles();
  const antDesignClasses = useStylesAntDesign();
  const { enqueueSnackbar } = useSnackbar();
  const { data } = props;
  const [dataRender, setDataRender] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setDataRender(data);
    setDataBackup(data);
    setLoading(false);
  }, [data]);

  const rows = dataRender;

  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);
  const [productIdList, setProductIdList] = useState([]);
  const [productId, setProductId] = useState(0);
  const openAddForm = () => {
    setAddForm(true);
  };
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

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
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
    if (productIdList.length === 0) {
      enqueueSnackbar("Vui lòng chọn sản phẩm cần xoá", {
        variant: "error",
        autoHideDuration: 2000,
      });
      return false;
    }
    openDeleteForm();
  };

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
          id={parseInt(productId)}
        ></DetailForm>
      );
    }
    if (deleteForm) {
      return (
        <DeleteForm
          open={deleteForm}
          onClose={closeDeleteForm}
          id={parseInt(productId)}
          listId={productIdList}
          userid={userInfo.id}
        ></DeleteForm>
      );
    }
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

  const columns = [
    {
      field: "stt",
      headerName: "STT",
      resizable: true,
      width: 105,
      align: "center",
    },
    // { field: "id", headerName: "id", width: 120 },
    {
      field: "user_username",
      headerName: "Nhân viên",
      width: 160,
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
    {
      field: "ft_name",
      headerName: "Chức năng",
      width: 200,
      renderCell: (params) => {
        if (params.value === "Quản lý sản phẩm") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Quản lý vải") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Quản lý đơn hàng") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Quản lý tài khoản người dùng") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Quản lý tài khoản nhân viên") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
      },
    },
    {
      field: "et_name",
      headerName: "Thao tác",
      width: 150,
      renderCell: (params) => {
        if (params.value === "Thêm mới") {
          return (
            <MyButton variant="outlined" color="success" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Chỉnh sửa") {
          return (
            <MyButton variant="outlined" color="primary" fullWidth>
              {params.value}
            </MyButton>
          );
        }
        if (params.value === "Xoá") {
          return (
            <MyButton variant="outlined" color="error" fullWidth>
              {params.value}
            </MyButton>
          );
        }
      },
    },
    {
      field: "log_description",
      headerName: "Nội dung",
      width: 400,
    },
    {
      field: "log_date",
      headerName: "Thời gian",
      width: 200,
      renderCell: (params) => {
        return formatDate(params.value);
      },
    },
  ];

  const exportFile = () => {
    var now = new Date();
    var list = [];
    for (let i = 0; i < dataRender.length; i++) {
      list.push({
        STT: dataRender[i].stt,
        "Nhân viên": dataRender[i].user_username,
        "Chức năng": dataRender[i].ft_name,
        "Thao tác": dataRender[i].et_name,
        "Nội dung": dataRender[i].log_description,
        "Thời gian": formatDate(dataRender[i].log_date),
      });
    }
    now = format(now, "yyyy-MM-dd HH:mm:ss");
    const ws = XLSX.utils.json_to_sheet(list);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "data");
    XLSX.writeFile(wb, "NhatKyHoatDong " + now + ".xlsx");
  };

  const theme = useTheme();
  const [colorSelected, setColorSelected] = React.useState([]);

  const names = [
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

  const handleChangeColor = (event) => {
    const {
      target: { value },
    } = event;
    setColorSelected(
      // On autofill we get a the stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const [dataBackup, setDataBackup] = useState([]);
  const handleClickSearch = () => {
    let temp = [...data];
    if (colorSelected.length >= 1) {
      for (let i = 0; i < colorSelected.length; i++) {
        temp = temp.filter((data) => {
          return removeAccents(data.product_color)
            .toLowerCase()
            .includes(removeAccents(colorSelected[i]).toLowerCase());
        });
      }
    }
    if (thicknessSelected) {
      temp = temp.filter(
        (data) => data.product_thickness === thicknessSelected
      );
    }
    if (softnessSelected) {
      temp = temp.filter((data) => data.product_softness === softnessSelected);
    }
    if (elasticitySelected) {
      temp = temp.filter(
        (data) => data.product_elasticity === elasticitySelected
      );
    }
    setDataRender(temp);
    setDataBackup(temp);
  };

  const liveSearch = (event) => {
    let string = event.target.value;
    event.preventDefault();
    if (string) {
      let filtered = dataBackup.filter((data) => {
        return (
          data.stt === parseInt(string) ||
          data.user_username.toLowerCase().includes(string.toLowerCase()) ||
          removeAccents(data.log_description)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.ft_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          removeAccents(data.et_name)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase()) ||
          formatDate(data.log_date)
            .toLowerCase()
            .includes(removeAccents(string).toLowerCase())
          // data.product_old_price.toString().includes(string)
        );
      });
      setDataRender(filtered);
    } else {
      setDataRender(dataBackup);
    }
  };

  const [thicknessSelected, setThicknessSelected] = useState("");
  const [softnessSelected, setSoftnessSelected] = useState("");
  const [elasticitySelected, setElasticitySelected] = useState("");
  const renderSearchForm = () => {
    return (
      <Grid container spacing={1}>
        <Grid item xs={3}>
          <MyFormControl sx={{ ml: 0.5, width: "100%" }}>
            <InputLabel id="select-color-label">Màu sắc</InputLabel>
            <Select
              multiple
              displayEmpty
              value={colorSelected}
              onChange={handleChangeColor}
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
              {names.map((name) => (
                <MenuItem
                  key={name}
                  value={name}
                  style={getStyles(name, colorSelected, theme)}
                >
                  {name}
                </MenuItem>
              ))}
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          <MyFormControl fullWidth>
            <InputLabel id="thickess-select-label">Độ dày</InputLabel>
            <Select
              labelId="thickess-select-label"
              id="thickess-select"
              value={thicknessSelected}
              displayEmpty
              label="Độ dày"
              onChange={(e) => setThicknessSelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value="Mỏng">Mỏng</MenuItem>
              <MenuItem value="Vừa">Vừa</MenuItem>
              <MenuItem value="Dày">Dày</MenuItem>
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          <MyFormControl fullWidth>
            <InputLabel id="softness-select-label">Độ dày</InputLabel>
            <Select
              labelId="softness-select-label"
              id="softness-select"
              value={softnessSelected}
              displayEmpty
              label="Độ dày"
              onChange={(e) => setSoftnessSelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value="Mềm">Mềm</MenuItem>
              <MenuItem value="Vừa">Vừa</MenuItem>
              <MenuItem value="Cứng">Cứng</MenuItem>
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={1}>
          <MyFormControl fullWidth>
            <InputLabel id="elasticity-select-label">Độ co giãn</InputLabel>
            <Select
              labelId="elasticity-select-label"
              id="elasticity-select"
              value={elasticitySelected}
              displayEmpty
              label="Độ co giãn"
              onChange={(e) => setElasticitySelected(e.target.value)}
              inputProps={{ "aria-label": "Without label" }}
            >
              <MenuItem value="">
                <em>Tất cả</em>
              </MenuItem>
              <MenuItem value="Không">Không</MenuItem>
              <MenuItem value="Vừa">Vừa</MenuItem>
              <MenuItem value="Có">Có</MenuItem>
            </Select>
          </MyFormControl>
        </Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickSearch}
            sx={{ float: "right", mr: 0.5 }}
          >
            Tìm kiếm
          </Button>
        </Grid>
      </Grid>
    );
  };

  const componentRef = useRef();

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
    documentTitle: "BaoCaoSanPham" + "_Ngay_" + format(now, "dd-MM/yyyy"),
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
          <Grid item xs={12} sx={{ mb: 0.5 }}>
            <Grid container>
              <Grid item xs={12}>
                {renderSearchForm()}
                <Divider sx={{ mt: 0.5, mb: 0.5 }} />
              </Grid>
              <Grid item xs={9}>
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
              height: 525,
              width: "100%",
              "background-color": "#ffffff",
            }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
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
                setProductIdList(selectedRowData);
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
                  <Typography sx={{ fontWeight: 600 }}>Mẫu in: B111</Typography>
                  <Typography sx={{ fontWeight: 600 }}>
                    Ngày in: {format(now, "dd/MM/yyyy")}
                  </Typography>
                </Grid>
                <Grid item xs={12} sx={{ textAlign: "center" }}>
                  <Typography variant="h5">Nhật ký hoạt động</Typography>
                </Grid>
              </Grid>
              <TableContainer>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell align="center">Nhân viên</TableCell>
                      <TableCell align="center">Chức năng</TableCell>
                      <TableCell align="center">Thao tác</TableCell>
                      <TableCell align="center">Nội dung</TableCell>
                      <TableCell align="center">Thời gian</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataRender.map((row) => {
                      return (
                        <TableRow key={row.name}>
                          <TableCell component="th" scope="row">
                            {row.stt}
                          </TableCell>
                          <TableCell align="center">
                            {row.user_username}
                          </TableCell>
                          <TableCell align="center">{row.ft_name}</TableCell>
                          <TableCell align="center">{row.et_name}</TableCell>
                          <TableCell align="left">
                            {row.log_description}
                          </TableCell>
                          <TableCell align="left">
                            {formatDate(row.log_date)}
                          </TableCell>
                        </TableRow>
                      );
                    })}
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
