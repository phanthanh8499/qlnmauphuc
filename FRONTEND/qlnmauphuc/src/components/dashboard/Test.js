import {
  Button,
  ButtonBase,
  ButtonGroup,
  Dialog,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { xemChiTietSanPham } from "../../redux/Actions";

const useStyle = makeStyles((theme) => ({
  img: {
    width: 300,
    height: 300,
  },
  btngroup: {
    float: "right",
    marginTop: 20,
  },
  image: {
    margin: "30px 10px 10px 10px",
  },
}));

function Test(props) {
  const classes = useStyle();
  const dispatch = useDispatch();
  const { open, onClose, id } = props;
  const chiTietSanPham = useSelector((state) => state.chiTietSanPham);
  const { loading, chiTietSP, error } = chiTietSanPham;
  const [productType, setProductType] = useState("");
  const [productBrand, setProductBrand] = useState("");
  
  const getParamsProductType = (event) => {
    setProductType(event.target.value);
  };
  const getParamsProductBrand = (event) => {
    setProductBrand(event.target.value);
  };
  const handleSubmit = (event) => {
    console.log("submit ");
  };
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={true}
        maxWidth="md"
      >
        <Grid container>
          <Grid item xs={4}>
            <ButtonBase className={classes.image}>
              <img
                className={classes.img}
                src="./images/SDTNO/sd-sandisk-ultra-80-16gb.jpg"
                alt="./images/SDTNO/sd-sandisk-ultra-80-16gb.jpg"
              ></img>
            </ButtonBase>
          </Grid>
          <Grid item xs={8} style={{ padding: "10px" }}>
            <TextField
              id="product_name"
              label="Tên sản phẩm"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              style={{ width: "80%", "margin-left": "9px" }}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="product_quantity"
              label="Số lượng"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              width={100}
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <TextField
              id="product_quantity"
              label="Số lượng đã bán"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              width={100}
              margin="normal"
              value="2"
              InputLabelProps={{
                readOnly: true,
              }}
            />
            <TextField
              id="product_price"
              label="Giá"
              style={{ margin: 8 }}
              placeholder="Placeholder"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">VNĐ</InputAdornment>
                ),
              }}
            />
            <TextField
              id="product_price"
              label="Chi tiết sản phẩm"
              multiline
              rows={2}
              style={{ margin: 8, width: "80%" }}
              placeholder="Placeholder"
              margin="normal"
              InputLabelProps={{
                shrink: true,
              }}
            />
            <FormControl style={{ width: "30%", "margin-left": "9px" }}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Loại sản phẩm
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={productType}
                onChange={getParamsProductType}
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="HDD25">HDD 2.5 inch</MenuItem>
                <MenuItem value="HDD35">HDD 3.5 inch</MenuItem>
                <MenuItem value="MITNO">MicroSD</MenuItem>
                <MenuItem value="RAMD3">Ram Desktop DDR3</MenuItem>
                <MenuItem value="RAMD4">Ram Desktop DDR4</MenuItem>
                <MenuItem value="RAML3">G.Ram Laptop DDR3</MenuItem>
                <MenuItem value="RAML4">Ram Laptop DDR4</MenuItem>
                <MenuItem value="SDTNO">SD Card</MenuItem>
                <MenuItem value="SSD18">SSD 1.8 inch</MenuItem>
                <MenuItem value="SSD25">SSD 2.5 inch</MenuItem>
                <MenuItem value="SSDM2">SSD M.2 SATA</MenuItem>
                <MenuItem value="USB30">USB 3.0</MenuItem>
                <MenuItem value="USB31">USB 3.1</MenuItem>
              </Select>
            </FormControl>
            <FormControl style={{ width: "30%", "margin-left": "9px" }}>
              <InputLabel
                shrink
                id="demo-simple-select-placeholder-label-label"
              >
                Thương hiệu
              </InputLabel>
              <Select
                labelId="demo-simple-select-placeholder-label-label"
                id="demo-simple-select-placeholder-label"
                value={productBrand}
                onChange={getParamsProductBrand}
                displayEmpty
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="Ada">Adata</MenuItem>
                <MenuItem value="Cor">Corsair</MenuItem>
                <MenuItem value="Cru">Crucial</MenuItem>
                <MenuItem value="Ess">Essencore</MenuItem>
                <MenuItem value="Gig">Gigabyte</MenuItem>
                <MenuItem value="Gki">G.Skill</MenuItem>
                <MenuItem value="Int">Intel</MenuItem>
                <MenuItem value="Kin">Kingston</MenuItem>
                <MenuItem value="Kio">Kioxia</MenuItem>
                <MenuItem value="Sam">Samsung</MenuItem>
                <MenuItem value="San">Sandisk</MenuItem>
                <MenuItem value="Sea">Seagate</MenuItem>
                <MenuItem value="Tos">Toshiba</MenuItem>
                <MenuItem value="Tra">Transcend</MenuItem>
                <MenuItem value="Wes">Western Digital</MenuItem>
              </Select>
            </FormControl>
            <Grid item xs={12}>
              <ButtonGroup className={classes.btngroup}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={handleSubmit}
                >
                  Cập nhật thông tin
                </Button>
                <Button variant="outlined" color="secondary">
                  Hủy bỏ
                </Button>
              </ButtonGroup>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
    </div>
  );
}

export default Test;
