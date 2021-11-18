import React, { Component, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminOrder from "../../../components/adminOrder";
import AdminProducts from "../../../components/adminProducts";
import AdminLayout from "../../../components/layout/AdminLayout";

export default function Home() {
  return (
    <AdminLayout>
      <Switch>
        <Route
          path="/admin/profile"
          exact={true}
          component={lazy(() => import("../../../components/adminProfile"))}
        ></Route>
        <Route
          path="/admin/orders"
          exact={true}
          component={lazy(() => import("../../../components/adminOrder"))}
        ></Route>
        <Route
          path="/admin/cloth"
          component={lazy(() => import("../../../components/adminCloth"))}
        ></Route>
        <Route
          path="/admin/products"
          component={lazy(() => import("../../../components/adminProducts"))}
        ></Route>
        <Route
          path="/admin/customer"
          component={lazy(() => import("../../../components/adminCustomer"))}
        ></Route>
        <Route
          path="/admin/staff"
          component={lazy(() => import("../../../components/adminStaff"))}
        ></Route>
        <Route
          path="/admin/dashboard"
          component={lazy(() => import("../../../components/adminDashboard"))}
        ></Route>
        <Route
          path="/admin/statistic"
          component={lazy(() => import("../../../components/adminOrderReport"))}
        ></Route>
      </Switch>
    </AdminLayout>
  );
}
