import React from "react";
import Header from "../Component/Header";
import DilysCard from "../Component/Card";
import "../Css/ProductPage.css"
import Footer from "../Component/Footer";

const ProductPage =()=>{
    return(
      <>
            <Header/>
          
              <div className="product-space">
            <DilysCard/>
        </div>
        <Footer/>
        </>
    )
}
export default ProductPage;