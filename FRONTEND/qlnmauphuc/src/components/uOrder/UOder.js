import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Badge, Grid, Tab } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrderData } from "../../redux/Action";
import All from "./All";
import { styled } from "@mui/material/styles";

const MyBadge = styled(Badge)`
  .MuiBadge-badge {
    right: -10px;
  }
`;

export default function UOder() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const order = useSelector((state) => state.order);
  const { orderData } = order;
  const [all, setAll] = useState();
  const [processing, setProcessing] = useState();
  const [sewing, setSewing] = useState();
  const [transport, setTransport] = useState();
  const [complete, setComplete] = useState();
  const [cancel, setCancel] = useState();
  const [value, setValue] = useState("1");
  const { userInfo } = JSON.parse(localStorage.getItem("userInfo"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    dispatch(getOrderData({ id: userInfo.id }));
  }, []);

  useEffect(() => {
    setLoading(true);
    setAll(orderData);
    setProcessing(
      orderData.filter((orderData) => orderData.order_statusid === 0)
    );
    setSewing(
      orderData.filter(
        (orderData) =>
          orderData.order_statusid === 1 ||
          orderData.order_statusid === 2 ||
          orderData.order_statusid === 3 ||
          orderData.order_statusid === 4
      )
    );
    setTransport(
      orderData.filter((orderData) => orderData.order_statusid === 5)
    );
    setComplete(
      orderData.filter((orderData) => orderData.order_statusid === 6)
    );
    setCancel(orderData.filter((orderData) => orderData.order_statusid === 10));
    setLoading(false);
  }, [orderData]);
  return (
    <Grid container>
      {loading ? (
        <div>loading....</div>
      ) : (
        <>
          <Grid item xs={12}>
            <TabContext value={value}>
              <Box sx={{ border: 1, borderColor: "divider" }}>
                <TabList
                  onChange={handleChange}
                  aria-label="lab API tabs example"
                  variant="fullWidth"
                >
                  <Tab
                    label={
                      <MyBadge badgeContent={all.length} color="primary">
                        Tất cả
                      </MyBadge>
                    }
                    value="1"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={processing.length} color="primary">
                        Chờ xác nhận
                      </MyBadge>
                    }
                    value="2"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={sewing.length} color="primary">
                        Đang may
                      </MyBadge>
                    }
                    value="3"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={transport.length} color="primary">
                        Đang giao
                      </MyBadge>
                    }
                    value="4"
                  />
                  {/* <Tab
                label={
                  <MyBadge badgeContent="2" color="primary">
                    Đã giao
                  </MyBadge>
                }
                value="5"
              /> */}
                  <Tab
                    label={
                      <MyBadge badgeContent={complete.length} color="primary">
                        Hoàn tất
                      </MyBadge>
                    }
                    value="6"
                  />
                  <Tab
                    label={
                      <MyBadge badgeContent={cancel.length} color="primary">
                        Đã huỷ
                      </MyBadge>
                    }
                    value="7"
                  />
                </TabList>
              </Box>
              <TabPanel value="1">
                <All userid={userInfo.id} data={all} />
              </TabPanel>
              <TabPanel value="2">
                <All data={processing} />
              </TabPanel>
              <TabPanel value="3">
                <All data={sewing} />
              </TabPanel>
              <TabPanel value="4">
                <All data={transport} />
              </TabPanel>
              <TabPanel value="5">Item Two</TabPanel>
              <TabPanel value="6">
                <All data={complete} />
              </TabPanel>
              <TabPanel value="7">
                <All data={cancel} />
              </TabPanel>
            </TabContext>
          </Grid>
          <Grid item xs={12}></Grid>
        </>
      )}
    </Grid>
  );
}
