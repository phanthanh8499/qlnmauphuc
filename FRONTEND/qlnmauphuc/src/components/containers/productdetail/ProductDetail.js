import { Container } from '@mui/material'
import React from 'react'
import AdditionalDetails from './AdditionalDetails';
import MainDetail from './MainDetail'
import SameProduct from './SameProduct';


export default function ProductDetail (){
  return (
    <Container>
      <MainDetail></MainDetail>
      <AdditionalDetails></AdditionalDetails>
      <SameProduct></SameProduct>
    </Container>
  )
}
