import { lazy } from "react";

export const routes = [
  {
    path: "/",
    exact: true,
    component: lazy(() => import("./../pages/users/home/Home")),
  },
  {
    path: "/:slug.:id.html",
    exact: false,
    component: lazy(() => import("./../pages/users/product/Product")),
  },
  {
    path: "/account",
    exact: true,
    component: lazy(() => import("./../pages/users/account/Account")),
  },
  {
    path: "/account/profile",
    exact: true,
    component: lazy(() => import("./../pages/users/profile/Profile")),
  },
  {
    path: "/account/measurements",
    exact: true,
    component: lazy(() => import("./../pages/users/measurements/Measurements")),
  },
  {
    path: "/account/orders",
    exact: true,
    component: lazy(() => import("./../pages/users/order/Order")),
  },
  {
    path: "/account/measurements-edit-:id",
    exact: true,
    component: lazy(() => import("./../pages/users/measurementsEdit/MeasurementsEdit")),
  },
  {
    path: "/account/measurements-add",
    exact: true,
    component: lazy(() => import("./../pages/users/measurementsAdd/MeasurementsAdd")),
  },
  {
    path: "/admin",
    exact: true,
    component: lazy(() => import("./../pages/admin/home/Home")),
  },
  {
    path: "/admin/products",
    exact: true,
    component: lazy(() => import("./../pages/admin/product/Product")),
  },
  {
    path: "/admin/cloth",
    exact: true,
    component: lazy(() => import("./../pages/admin/cloth/Cloth")),
  },
];
