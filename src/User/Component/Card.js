import React, { useEffect, useState } from 'react';
import ProductCard from "../Component/UiCard";
import "../Css/Product.css";
import "../Css/ProductPage.css";
import { displayProduct } from '../../Service/ProductService';
import { useNavigate } from "react-router-dom";
import { IconButton, Stack, Typography, Paper, InputBase } from "@mui/material";
import { ArrowBackIos, ArrowForwardIos, Search as SearchIcon } from "@mui/icons-material";
import ProductSearch from './Searchbar';
import axios from 'axios';

const DilysCard = () => {
  const [productData, setProductData] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [searchQuery, setSearchQuery] = useState(""); 
  const [size, setSize] = useState(12);
  const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const result = await displayProduct(page, size, searchQuery); 
      setProductData(result.data.content);
      setTotalPages(result.data.totalPages);
    };
    fetchData();
  }, [page, searchQuery]);

  const handleTextSearch = (query) => {
       setSearchQuery(query)
  
  };
   const handleImageSearch = async (file) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("http://localhost:8082/identity/api/product/search-product-image", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      setProductData(res.data);
    } catch (error) {
      console.error("Lỗi tìm kiếm bằng hình ảnh:", error);
    } finally {
      setLoading(false);
    }
   }
  const handleProductClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  const handlePreviousPage = () => {
    if (page > 0) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  return (
    <div className="product-wrapper">
   
      {/* <Stack direction="row" justifyContent="center" mt={3} mb={3}>
        <Paper
          component="form"
          sx={{
            p: '2px 10px',
            display: 'flex',
            alignItems: 'center',
            width: 400,
            borderRadius: 4,
            boxShadow: 3,
            backgroundColor: '#f5f5f5'
          }}
        >
          <SearchIcon color="action" />
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Tìm kiếm sản phẩm..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setPage(0);
            }}
          />
        </Paper>
      </Stack> */}
         <ProductSearch 
        onTextSearch={handleTextSearch}
        onImageSearch={handleImageSearch}
      />

      {/* Danh sách sản phẩm */}
      <div className="product-list">
        {productData.map((product, index) => (
          <div key={index} onClick={() => handleProductClick(product.id_product)}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {/* Pagination với icon */}
      <Stack direction="row" justifyContent="center" alignItems="center" spacing={2} mt={3}>
        <IconButton
          onClick={handlePreviousPage}
          disabled={page === 0}
          color="primary"
        >
          <ArrowBackIos />
        </IconButton>

        <Typography variant="body1">
          Trang {page + 1} / {totalPages}
        </Typography>

        <IconButton
          onClick={handleNextPage}
          disabled={page === totalPages - 1}
          color="primary"
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
    </div>
  );
};

export default DilysCard;
