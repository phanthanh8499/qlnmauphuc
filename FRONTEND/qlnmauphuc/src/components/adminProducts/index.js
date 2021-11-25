import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Badge,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Tab,
} from "@mui/material";
import { getProductData } from "../../redux/Action";
import { makeStyles } from "@mui/styles";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import TabList from "@mui/lab/TabList";
import TabContext from "@mui/lab/TabContext";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";
import { BACKGROUNDADM } from "../../constants/Constants";

const MyBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: "-10px",
  },
}));

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  padding: "12px 21px",
}));

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px -5px 0px !important",
  },
  img: {
    height: 100,
    width: 100,
  },
  root: {
    color: "rgb(97, 97, 97)",
    transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    boxShadow: "none",
    overflow: "hidden",
    borderRadius: "12px",
    border: "1px solid rgba(144, 202, 249, 0.46)",
    height: 637,
    padding: "10px",
    backgroundImage: `url("${BACKGROUNDADM}")`,
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
  },
}));

export default function AdminProducts() {
  const classes = useStyles();
  const products = useSelector((state) => state.products);
  const { productData, error } = products;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductData());
  }, []);

  const [all, setAll] = useState();
  const [blazer, setBlazer] = useState();
  const [suit, setSuit] = useState();
  const [gile, setGile] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setAll(productData);
    setBlazer(
      productData.filter(
        (productData) =>
          productData.product_typeid === "BFM" ||
          productData.product_typeid === "VFF"
      )
    );
    setSuit(
      productData.filter(
        (productData) =>
          productData.product_typeid === "SFM" ||
          productData.product_typeid === "SFF"
      )
    );
    setGile(
      productData.filter(
        (productData) =>
          productData.product_typeid === "GFM" ||
          productData.product_typeid === "GFF"
      )
    );
    setLoading(false);
  }, [productData]);

  const [value, setValue] = useState("1");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container className={classes.root}>
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
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          <TabContext value={value}>
            <Grid item xs={12} className={classes.topBar}>
              <Grid container>
                <Grid item xs={12}>
                  <Box sx={{ borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <MyTab
                        label={
                          <MyBadge
                            badgeContent={productData.length}
                            color="primary"
                          >
                            Tất cả
                          </MyBadge>
                        }
                        value="1"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={blazer.length} color="primary">
                            Blazer
                          </MyBadge>
                        }
                        value="2"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={suit.length} color="primary">
                            Suit
                          </MyBadge>
                        }
                        value="3"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={gile.length} color="primary">
                            Gile
                          </MyBadge>
                        }
                        value="4"
                      />
                    </TabList>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ margin: "0px 0px -5px 0px" }} />
            </Grid>

            <Grid item xs={12}>
              <TabPanel value="1" sx={{ padding: 0 }}>
                <Data data={all} />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={blazer} />
              </TabPanel>
              <TabPanel value="3" sx={{ padding: 0 }}>
                <Data data={suit} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: 0 }}>
                <Data data={gile} />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
