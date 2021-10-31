import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Badge, CircularProgress, Divider, Grid, Paper } from "@mui/material";
import { getClothData } from "../../redux/Action";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Data from "./Data";

const MyBadge = styled(Badge)`
  .MuiBadge-badge {
    right: -10px;
  }
`;

const MyTab = styled(Tab)(({ theme }) => ({
  textTransform: "none",
  padding: "12px 21px",
}));

const useStyles = makeStyles((theme) => ({
  topBar: {
    padding: 5,
    margin: "0px 0px -5px 0px !important",
  },
}));

export default function AdminCloth() {
  const classes = useStyles();
  const cloth = useSelector((state) => state.cloth);
  const { loading, clothData } = cloth;
  const [loadingState, setLoadingState] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getClothData());
  }, [dispatch]);

  const [all, setAll] = useState([]);
  const [caro, setCaro] = useState([]);
  const [hthh, setHthh] = useState([]);
  const [vckh, setVckh] = useState([]);
  const [vkso, setVkso] = useState([]);
  const [vpol, setVpol] = useState([]);

  useEffect(() => {
    setAll(clothData);
    setCaro(clothData.filter((item) => item.cloth_typeid === "CARO"));
    setHthh(clothData.filter((item) => item.cloth_typeid === "HTHH"));
    setVckh(clothData.filter((item) => item.cloth_typeid === "VCKH"));
    setVkso(clothData.filter((item) => item.cloth_typeid === "VKSO"));
    setVpol(clothData.filter((item) => item.cloth_typeid === "VPOL"));
    setLoadingState(false);
  }, [clothData]);
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Grid container component={Paper}>
      {loading || loadingState ? (
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
          <TabContext value={value}>
            <Grid item xs={12} className={classes.topBar}>
              <Grid container>
                <Grid item xs={9}>
                  <Box sx={{ borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      aria-label="lab API tabs example"
                    >
                      <MyTab
                        label={
                          <MyBadge badgeContent={all.length} color="primary">
                            Tất cả
                          </MyBadge>
                        }
                        value="1"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={caro.length} color="primary">
                            Vải caro
                          </MyBadge>
                        }
                        value="2"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={hthh.length} color="primary">
                            Vải hoạ tiết hình học
                          </MyBadge>
                        }
                        value="3"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={vkso.length} color="primary">
                            Vải kẻ sọc
                          </MyBadge>
                        }
                        value="4"
                      />

                      <MyTab
                        label={
                          <MyBadge badgeContent={vpol.length} color="primary">
                            Vải polyester
                          </MyBadge>
                        }
                        value="5"
                      />
                      <MyTab
                        label={
                          <MyBadge badgeContent={vckh.length} color="primary">
                            Vải khách hàng gửi
                          </MyBadge>
                        }
                        value="6"
                      />
                    </TabList>
                  </Box>
                </Grid>
                <Grid item xs={3}></Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ margin: "0px 0px 5px 0px" }} />
            </Grid>
            <Grid item xs={12}>
              <TabPanel value="1" sx={{ padding: 0 }}>
                <Data data={all} />
              </TabPanel>
              <TabPanel value="2" sx={{ padding: 0 }}>
                <Data data={caro} />
              </TabPanel>
              <TabPanel value="3" sx={{ padding: 0 }}>
                <Data data={hthh} />
              </TabPanel>
              <TabPanel value="4" sx={{ padding: 0 }}>
                <Data data={vkso} />
              </TabPanel>
              <TabPanel value="5" sx={{ padding: 0 }}>
                <Data data={vpol} />
              </TabPanel>
              <TabPanel value="6" sx={{ padding: 0 }}>
                <Data data={vckh} isKH />
              </TabPanel>
            </Grid>
          </TabContext>
        </>
      )}
    </Grid>
  );
}
