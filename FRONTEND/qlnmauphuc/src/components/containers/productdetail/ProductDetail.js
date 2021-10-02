import { Container } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProductData } from '../../../redux/Action';
import Product from '../products/Product';
import AdditionalDetails from './AdditionalDetails';
import MainDetail from './MainDetail'
import SameProduct from './SameProduct';


export default function ProductDetail (props){
  let { id } = useParams();
  const [data, setData] = useState([])
  const [loadingPage, setLoadingPage] = useState(true)
  const products = useSelector(state => state.products);
  const {loading, error} = products
  const dispatch = useDispatch();
  // const { productData } = products;
  // const [BFM, setBFM] = useState();
  // const [TFM, setTFM] = useState();
  // const [SFM, setSFM] = useState();
  // const [loading, setLoading] = useState(true);
  // useEffect(() => {
  //   setBFM(
  //     productData.filter((productData) => productData.product_typeid === "BFM")
  //   );
  //   setTFM(
  //     productData.filter((productData) => productData.product_typeid === "TFM")
  //   );
  //   setSFM(
  //     productData.filter((productData) => productData.product_typeid === "SFM")
  //   );
  //   setLoading(false);
  // }, [productData]);

  
   useEffect(() => {
     dispatch(getProductData());
     async function getDetailProduct() {
       const temp = await axios.get(`/getDetailProduct.${id}`);
       setData(temp.data);
       setLoadingPage(false);
     }
     getDetailProduct();
     
   }, [dispatch, id]);

   

  //  const renderSameProduct = () => {
  //    if(data[0].product_typeid === "BFM"){
  //      return <SameProduct data={BFM} id={id}></SameProduct>;
  //    }
  //    if(data[0].product_typeid === "TFM"){
  //      return <SameProduct data={TFM} id={id}></SameProduct>;
  //    }
  //    if(data[0].product_typeid === "SFM"){
  //      return <SameProduct data={SFM} id={id}></SameProduct>;
  //    }
  //  }
   console.log(data)
  return (
    <Container>
      {loading ? (
        <div>loading....</div>
      ) : loadingPage ? (
        <div>loading....</div>
      ) : (
        <>
          <MainDetail data={data}></MainDetail>
          <AdditionalDetails data={data}></AdditionalDetails>
          <SameProduct type={data[0].product_typeid} id={id}></SameProduct>
          {/* {renderSameProduct()} */}
        </>
      )}
    </Container>
  );
}
