import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Items from "./Items";
import Title from "./Title";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { styled } from "@mui/material/styles";


const MyTab = styled(Tab)`
  text-transform: none;
`;

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "40px !important",
  },
  mainTitle: {
    fontSize: "32px !important",
    fontWeight: "900 !important",
    // fontFamily: `neNikeCurrency,'FuturaW01-ExtraBoldCond 774896',Helvetica,Arial,sans-serif`,
    margin: "10px 0px !important",
    textAlign: "center",
  },
  subTitle: {
    color: "#999",
    fontStyle: "normal",
    letterSpacing: ".03em",
    wordSpacing: "-0.05em",
    fontFamily: `OneNikeCurrency,Helvetica,Arial,sans-serif !important`,
  },
  nav: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&>li": {
      padding: 10,
      display: "inline-block",
    },
  },
  navitem: {
    color: "#888888",
    fontWeight: "bold",
    "&:hover": {
      color: "#000000",
      fontWeight: "bold",
    },
  },
}));

const center = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}
export default function Vest() {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const products = useSelector((state) => state.products);
  const { productData } = products;
  const [BFM, setBFM] = useState();
  const [TFM, setTFM] = useState();
  const [SFM, setSFM] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setBFM(
      productData.filter((productData) => productData.product_typeid === "BFM")
    );
    setTFM(
      productData.filter((productData) => productData.product_typeid === "TFM")
    );
    setSFM(
      productData.filter((productData) => productData.product_typeid === "SFM")
    );
    setLoading(false)
  }, [productData]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      {loading ? (
        <div>loading....</div>
      ) : (
        <Grid container justifyContent="center">
          <Grid item xs={12} className={classes.title}>
            <Grid container>
              <Grid item xs={12} sx={center}>
                <Typography className={classes.mainTitle}>
                  THỜI TRANG NAM
                </Typography>
              </Grid>
              <Grid item xs={12} sx={center}>
                <Typography className={classes.subTitle}>
                  Thiết kế áo vừa vặn, mang theo phong cách hiện đại và năng
                  động,
                  <br />
                  các đường chỉ cắt may chi tiết tỉ mỉ đảm bảo về độ bền và chắc
                  chắn
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box
                sx={{
                  borderColor: "divider",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                >
                  <MyTab label="Blazer" value="1" />
                  <MyTab label="Suit" value="3" />
                  <MyTab label="Tuxedo" value="2" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Items data={BFM}></Items>
              </TabPanel>
              <TabPanel value="2">
                <Items data={TFM}></Items>
              </TabPanel>
              <TabPanel value="3">
                <Items data={SFM}></Items>
              </TabPanel>
            </TabContext>
          </Grid>
        </Grid>
      )}
    </>
  );
}
