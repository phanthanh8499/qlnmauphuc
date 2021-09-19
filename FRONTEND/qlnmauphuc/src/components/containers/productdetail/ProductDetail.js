import { Container } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getProductData } from '../../../redux/Action';
import Product from '../products/Product';
import AdditionalDetails from './AdditionalDetails';
import MainDetail from './MainDetail'
import SameProduct from './SameProduct';


export default function ProductDetail (props){
  const id = props.match.params.id;
  const [data, setData] = useState([])
  const [loadingPage, setLoadingPage] = useState(true)
  const products = useSelector(state => state.products);
  const {loading, error} = products
  const dispatch = useDispatch();
   useEffect(() => {
     dispatch(getProductData());
     async function getDetailProduct() {
       const temp = await axios.get(`/getDetailProduct.${id}`);
       setData(temp.data);
       setLoadingPage(false);
     }
     getDetailProduct();
   }, [dispatch, id]);
   const renderSameProduct = () => {
     if(data[0].product_typeid === "BFM"){
       return <SameProduct data={products.BFM} id={id}></SameProduct>;
     }
     if(data[0].product_typeid === "TFM"){
       return <SameProduct data={products.TFM} id={id}></SameProduct>;
     }
     if(data[0].product_typeid === "SFM"){
       return <SameProduct data={products.SFM} id={id}></SameProduct>;
     }
   }
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
          {renderSameProduct()}
        </>
      )}
    </Container>
  );
}
