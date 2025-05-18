

import React, { useEffect, useState } from 'react';
import ProductCard from "../Component/UiCard";
import "../Css/Product.css";
import "../Css/ProductPage.css";
import { displayProduct, displayProductFollowCategory } from '../../Service/ProductService';
import { useNavigate, useParams } from "react-router-dom";

const CategoryProduct = () => {
  const [productData,setProductData]=useState([])
  const [page,setPage]=useState(0);
  const [change,setChange]=useState();
  const navigate = useNavigate();
  const { id_category } = useParams()
  useEffect(()=>{
    const Data=async()=>{
      const result=await displayProductFollowCategory(id_category,page);
      setProductData(result.data.content);
    }
    Data()
  },[change])
  const handleProductClick=(id)=>{
    navigate(`/product-detail/${id}`);
  }
  return (
    <div className="product-list">
      {productData.map((product, index) => (
        <div key={index} onClick={() => handleProductClick(product.id_product)}>
           
         
        <ProductCard key={index} product={product} />
        </div>
      ))}
    </div>
  );
};

export default CategoryProduct;

