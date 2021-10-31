import React, { useEffect } from "react";
import Vest from "./vest/Vest";
import VestNu from "./vestnu/VestNu";
import { useSelector, useDispatch } from "react-redux";
import { getProductData } from "../../../redux/Action";

export default function Product() {
  const products = useSelector((state) => state.products);
  const { loading, error } = products;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProductData());
  }, [dispatch]);
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : error ? (
        <div>error</div>
      ) : (
        <>
          <Vest></Vest>
          <VestNu></VestNu>
        </>
      )}
    </>
  );
}
