import React from 'react'
import Content from '../../../components/containers/content/Content'
import Product from '../../../components/containers/products/Product'
import SlideShow from '../../../components/containers/slideshow/SlideShow'
import Layout from '../../../components/layout/Layout'

export default function Home () {
    return (
      <Layout>
        <SlideShow></SlideShow>
        <Product></Product>
        <Content></Content>
      </Layout>
    )
}
