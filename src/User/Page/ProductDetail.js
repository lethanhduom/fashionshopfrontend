import React from "react";
import Header from "../Component/Header";
import ProductDetail from "../Component/ProductDetail";
import "../Css/ProductDetailPage.css"
import Footer from "../Component/Footer";
const ProductDetailPage=()=>{
    return (
    <>
            <Header/>
                <div className="product-detail-space">
            <ProductDetail/>
                 <Footer/>
        </div>
        </>
    )
}
export default ProductDetailPage;