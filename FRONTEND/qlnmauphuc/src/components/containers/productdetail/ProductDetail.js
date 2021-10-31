import { Container } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getProductData } from '../../../redux/Action';
import AdditionalDetails from './AdditionalDetails';
import MainDetail from './MainDetail'
import SameProduct from './SameProduct';


export default function ProductDetail (props){
  let { id } = useParams();
  const [data, setData] = useState([])
  const [loadingPage, setLoadingPage] = useState(true)
  const products = useSelector(state => state.products);
  const {loading } = products
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
        </>
      )}
    </Container>
  );
}
