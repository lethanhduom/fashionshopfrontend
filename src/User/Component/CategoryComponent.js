import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CategoryCard from './CategoryCard';
import '../Css/CategoryComponent.css'; // nhớ tạo file CSS
import { getListCategory } from '../../Service/CategoryService';
import { useNavigate } from "react-router-dom";


// Nút trái
const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-prev" onClick={onClick}>
      &#10094;
    </div>
  );
};

// Nút phải
const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="custom-arrow custom-next" onClick={onClick}>
      &#10095;
    </div>
  );
};  


const CategoryComponent = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
  };
  const navigate = useNavigate();

  const handleViewMoreClick=(id_category)=>{
    navigate(`/category-product/${id_category}`);
  }

  const [products,setProducts]=useState([]);
  useEffect(()=>{
    const loadData=async ()=>{
      const response= await getListCategory(parseInt(0));
      setProducts(response.data);
    }
    loadData();
  },[])
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">Welcome To My Store's Category</h2>
      <Slider {...settings}>
        {products.map((item) => (
          <div key={item.id_category} className="product-card">
            <CategoryCard
             onClick={()=>handleViewMoreClick(item.id_category)}
              image={item.imageUrl}
              title={item.nameCategory}
              description={item.productFor}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CategoryComponent;
