import React, { useEffect, useState } from "react";
import { useSelector, useDispatch} from "react-redux";
import { deleteProduct, getProductData } from "../../../redux/Action";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useSnackbar } from "notistack";
import { DataGrid } from "@mui/x-data-grid";
import Detail from "./Detail";
import AddForm from "./addForm/AddForm";
import DetailForm from "./detailForm/DetailForm";
import DeleteForm from "./deleteForm/DeteleForm";
import { Button, ButtonGroup, Grid, IconButton, Paper } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: '0px 0px 5px 0px !important',
  },
}));

export default function Products() {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const products = useSelector((state) => state.products);
  const { loading, productData, error } = products;
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch])
  const rows = productData;
  const [productid, setProductid] = useState("");
  
  const [addForm, setAddForm] = useState(false);
  const [detailForm, setDetailForm] = useState(false);
  const [deleteForm, setDeleteForm] = useState(false);

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

  const renderForm = () => {
    if(addForm){
      return (
        <AddForm
          open={addForm}
          onClose={closeAddForm}
          id={parseInt(productData[Object.keys(productData).sort().pop()].id)}
        ></AddForm>
      );
    }
    if(detailForm){
      return <DetailForm open={detailForm} onClose={closeDetailForm} id={parseInt(productid)}></DetailForm>
    }
    if(deleteForm){
      return <DeleteForm open={deleteForm} onClose={closeDeleteForm} id={parseInt(productid)}></DeleteForm>
    }
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "product_code", headerName: "Mã SP", width: 120 },
    { field: "product_name", headerName: "Tên sản phẩm", width: 250 },
    { field: "product_price", headerName: "Giá", width: 100, type: "number" },
    {
      field: "product_old_price",
      headerName: "Giá cũ",
      width: 130,
      type: "number",
    },
    { field: "product_color", headerName: "Màu sắc", width: 200 },
    { field: "product_material", headerName: "Chất liệu", width: 130 },
    { field: "product_lining", headerName: "Lớp lót", width: 130 },
    { field: "product_thickness", headerName: "Độ dày", width: 130 },
    { field: "product_softness", headerName: "Độ mềm", width: 130 },
    { field: "product_elasticity", headerName: "Độ dày", width: 130 },
    {
      field: "Hành động",
      headerName: "Hành động",
      sortable: false,
      width: 100,
      disableClickEventBubbling: true,
      renderCell: (params) => {
        const handleClickEdit = () => {
          openDetailForm();
        };

        const handleClickDelete = () => {
          openDeleteForm();
        };

        return (
          <ButtonGroup>
            <IconButton onClick={handleClickEdit} size="large">
              <VisibilityIcon />
            </IconButton>
            <IconButton onClick={handleClickDelete} size="large">
              <DeleteOutlineIcon color="error"/>
            </IconButton>
          </ButtonGroup>
        );
      },
    },
  ];

  return (
    <>
      {loading ? (
        <div>Loading....</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <Grid container >
          <Grid item xs={12} className={classes.topBar} component={Paper}>
            <Button variant="outlined" color="primary" onClick={openAddForm}>
              Thêm sản phẩm
            </Button>
          </Grid>
          <Grid item xs={12} style={{ height: 515, width: "100%", 'background-color': '#ffffff' }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={8}
              onSelectionModelChange={(row) => setProductid(row.toString())}
            />
          </Grid>
          {renderForm()}
        </Grid>
      )}
    </>
  );
}
