import React from 'react';
import ProductCard from '../Component/UiCard'; // Import component ProductCard
import "../Css/Product.css"
const ProductList = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product, index) => (
        <ProductCard key={index} {...product} />
      ))}
    </div>
  );
};

export default ProductList;