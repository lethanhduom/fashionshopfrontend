import React from "react";
import Header from "../Component/Header";
import DilysCard from "../Component/Card";
import "../Css/ProductPage.css"
import CategoryProduct from "../Component/CategoryProduct";
const CategoryProductPage =()=>{
    return(
      <>
            <Header/>
              <div className="product-space">
            <CategoryProduct/>
        </div>
        </>
    )
}
export default CategoryProductPage;