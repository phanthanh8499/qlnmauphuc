import React from 'react'
import Header from './../header/Header'
import Footer from './../footer/Footer'

export default function Layout (props) {
    return (
      <>
        <Header></Header>
        <div>{props.children}</div>
        <Footer></Footer>
      </>
    );
}
