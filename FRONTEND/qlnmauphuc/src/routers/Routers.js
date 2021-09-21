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
    path: "/admin",
    exact: true,
    component: lazy(() => import("./../pages/admin/home/Home")),
  },
  {
    path: "/admin/products",
    exact: true,
    component: lazy(() => import("./../pages/admin/product/Product")),
  },
];
