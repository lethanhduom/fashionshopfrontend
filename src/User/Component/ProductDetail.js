import React, { useEffect, useState } from "react";
import { getDetailProduct } from "../../Service/ProductService";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import QuantitySelector from "./Quantity";
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import LocalMallOutlinedIcon from '@mui/icons-material/LocalMallOutlined';
import Swal from 'sweetalert2';
import { use } from "react";
import { getIdCart, getInforUser } from "../../Service/AuthenService";
import { addCart } from "../../Service/CartService";
import avatar from "../../Image/avatar.jpg"
import { getComment } from "../../Service/CommentService";
import Chat from "../Page/Chat";
import { Navigate } from "react-router-dom";
import { Annoyed,Angry,Smile  } from 'lucide-react';
import ChatModal from "./ChatAIModal";
const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [colorMap, setColorMap] = useState({});
  const [sizeMap, setSizeMap] = useState({});
  const [quantity, setQuantity] = useState(1);


  const [commentData, setCommentData] = useState({ content: [], totalPages: 0, number: 0 });
  const [page, setPage] = useState(0);
  const pageSize = 5;
  const navigate=useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDetailProduct(id);
       
        setProduct(response.data);
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sản phẩm:", error);
      }
    };
    fetchData();
    fetchComment(page);
  }, [id,page]);
  
  const fetchComment= async(pageNumber)=>{
      const res=await getComment(id,pageNumber,pageSize);
      setCommentData(res.data);

  }
  const handleClickChat= async()=>{
    const user = JSON.parse(localStorage.getItem('user'));
    const res=await getInforUser(user.sub);
    const res1=await getInforUser("admin");
    const receiveUserObj = {
      id: res1.data.id,
      role: "admin"
    };
    const currentUserObj = {
      id: res.data.id,
      role: "user"
    };

    if(receiveUserObj!==null && currentUserObj!==null){
      navigate("/chat",{
        state: {
      currentUser:currentUserObj,
      receiveUser:receiveUserObj,
      idProduct:id
  }
      })
    }
   
  }
  useEffect(() => {
    if (product?.productDetailResponses?.length > 0) {
      const first = product.productDetailResponses[0];
      setSelectedDetail(first);
      setSelectedColor(first.id_color);
      setSelectedSize(first.id_size);

      const uniqueColorIds = [
        ...new Set(product.productDetailResponses.map((d) => d.id_color)),
      ];

      const uniqueSizeIds = [
        ...new Set(product.productDetailResponses.map((d) => d.id_size)),
      ];

      // Get color info
      Promise.all(
        uniqueColorIds.map((colorId) =>
          axios
            .get(`http://localhost:8082/identity/api/color/get-color?id=${colorId}`)
            .then((res) => ({
              id: colorId,
              name: res.data.name,
              hexCode: res.data.codeColor,
            }))
            .catch(() => null)
        )
      ).then((colors) => {
        const map = {};
        colors.forEach((color) => {
          if (color) map[color.id] = color;
        });
        setColorMap(map);
      });

      // Get size info
      Promise.all(
        uniqueSizeIds.map((sizeId) =>
          axios
            .get(`http://localhost:8082/identity/api/size/get-size?id=${sizeId}`)
            .then((res) => ({
              id: sizeId,
              name: res.data.nameSize,
            }))
            .catch(() => null)
        )
      ).then((sizes) => {
        const map = {};
        sizes.forEach((size) => {
          if (size) map[size.id] = size.name;
        });
        setSizeMap(map);
      });
    }
  }, [product]);

  if (!product || !selectedDetail) return <p>Đang tải sản phẩm...</p>;

  const getAvailableColors = () => {
    const colors = new Set(product.productDetailResponses.map((d) => d.id_color));
    return [...colors];
  };

  const getAvailableSizes = () => {
    if (selectedColor === null) return [];
    const sizes = new Set(
      product.productDetailResponses
        .filter((d) => d.id_color === selectedColor)
        .map((d) => d.id_size)
    );
    return [...sizes];
  };

  const handleSelectDetail = (size, color) => {
    const detail = product.productDetailResponses.find(
      (d) => d.id_size === size && d.id_color === color
    );
    if (detail) setSelectedDetail(detail);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {"★".repeat(fullStars)}
        {halfStar && "⯪"}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  const handleAddToCart =async () => {
    

    const user = JSON.parse(localStorage.getItem('user'));
    if(user===null){
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please Login Before Add To Cart",
        
      });
    }else{
      const id=(await getIdCart(user.sub)).data
      const addItem={
        "quantity": quantity,
        "cart_id": parseInt(id),
        "id_product_detail": selectedDetail.id_product_detail
      }
    
      const response = await addCart(addItem);
      if(response.status===200){
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          }
        });
        Toast.fire({
          icon: "success",
          title: "Add to Cart Successfuly"
        });
      }
    }
  };

  const handleChat = () => {
    alert("Bắt đầu trò chuyện với shop!");
  };

  return (
    <div style={{ background: "#fff6f1", padding: 30, fontFamily: "sans-serif", color: "#2d2d2d" }}>
      <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <img
            src={selectedDetail.image_url}
            alt="main"
            style={{ width: "100%", borderRadius: 10 }}
          />
          <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
            {product.productDetailResponses.map((detail) => (
              <img
                key={detail.id_product_detail}
                src={detail.image_url}
                alt={`thumb-${detail.id_product_detail}`}
                style={{
                  width: 70,
                  height: 70,
                  objectFit: "cover",
                  borderRadius: 5,
                  border:
                    selectedDetail.id_product_detail === detail.id_product_detail
                      ? "2px solid #f97316"
                      : "1px solid #ddd",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setSelectedDetail(detail);
                  setSelectedColor(detail.id_color);
                  setSelectedSize(detail.id_size);
                }}
              />
            ))}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 300 }}>
          <h2>{product.nameProduct}</h2>
          <p style={{ fontSize: 24, color: "#dc2626", fontWeight: "bold" }}>
            ₫{product.price.toLocaleString()}
          </p>
          <div style={{ margin: "10px 0", color: "#f59e0b" }}>{renderStars(product.rate)}</div>

          {/* Màu */}
          <div style={{ marginTop: 20, textAlign: "left" }}>
            <strong>Select color</strong>
            <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
              {getAvailableColors().map((colorId) => {
                const color = colorMap[colorId];
                return (
                  <div
                    key={colorId}
                    onClick={() => {
                      setSelectedColor(colorId);
                      setSelectedSize(null);
                    }}
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: "50%",
                      backgroundColor: color?.hexCode || "#ccc",
                      border: selectedColor === colorId ? "2px solid #f97316" : "1px solid #888",
                      cursor: "pointer",
                    }}
                    title={color?.name || `Màu ${colorId}`}
                  />
                );
              })}
            </div>
          </div>

          {/* Size */}
          {selectedColor !== null && (
            <div style={{ marginTop: 20, textAlign: "left" }}>
              <strong>Select Size:</strong>
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                {getAvailableSizes().map((sizeId) => (
                  <button
                    key={sizeId}
                    onClick={() => {
                      setSelectedSize(sizeId);
                      handleSelectDetail(sizeId, selectedColor);
                    }}
                    style={{
                      padding: "6px 12px",
                      background: selectedSize === sizeId ? "#f97316" : "#ddd",
                      color: selectedSize === sizeId ? "#fff" : "#000",
                      border: "none",
                      borderRadius: 5,
                      cursor: "pointer",
                    }}
                  >
                    {sizeMap[sizeId] || `Size ${sizeId}`}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={{ marginTop: 20, textAlign: "left" }}>
       
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
            max={selectedDetail.stock}
          />
          </div>
          

          <p style={{ marginTop: 20 }}>
            <strong>Remaining:</strong> {selectedDetail.stock} products
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 30 }}>
  <button
    onClick={handleAddToCart}
    style={{
      padding: "10px 20px",
      background: "#fff",
      color: "#f97316",
      border: "2px solid #f97316",
      borderRadius: 8,
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    <LocalMallOutlinedIcon />
    Add To Cart
  </button>

  <button
    onClick={()=>handleClickChat()}
    style={{
      padding: "10px 20px",
      background: "#fff",
      color: "#3b82f6",
      border: "2px solid #3b82f6",
      borderRadius: 8,
      fontWeight: "bold",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    <MessageOutlinedIcon />
    Chat
  </button>
</div>

        </div>
      </div>

      {/* Bình luận */}
      
       <div style={{ marginTop: 60 }}>
      <h3 style={{ fontSize: 20, marginBottom: 20 }}>
        Bình luận ({commentData.totalElements})
      </h3>

    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
  {commentData.content.map((cmt, index) => (
    <div
      key={index}
      style={{
        width: "100%",
        maxWidth: 600,
        background: "#fff",
        padding: 15,
        borderRadius: 10,
        boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <img
          src={avatar}
          alt="avatar"
          style={{ width: 40, height: 40, borderRadius: "50%" }}
        />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <strong>{cmt.username}</strong>
            {cmt.emotion === 1 && (
              <span style={{ color: "green" }}><Smile/></span> // Icon positive
            )}
            {cmt.emotion === 0 && (
              <span style={{ color: "red" }}><Angry/></span> // Icon negative
            )}
            {cmt.emotion === 2 && (
              <span style={{ color: "gray" }}><Annoyed/></span> // Icon neutral
            )}
          </div>
          <div style={{ color: "#f59e0b", fontSize: 14 }}>{renderStars(cmt.rate)}</div>
          <p style={{ color: "#cdcdcd", fontSize: 10 }}>
            {cmt.date}, {cmt.size}, {cmt.color}
          </p>
        </div>
      </div>
      <p style={{ marginTop: 10 }}>{cmt.review}</p>
    </div>
  ))}
</div>

      {/* Pagination */}
      <div style={{ marginTop: 30, display: "flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
  <button onClick={() => setPage((prev) => Math.max(prev - 1, 0))} disabled={page === 0}>
    &lt;
  </button>

  <span>
    Trang {page + 1} / {commentData.totalPages}
  </span>

  <button
    onClick={() => setPage((prev) =>
      prev + 1 < commentData.totalPages ? prev + 1 : prev
    )}
    disabled={page + 1 >= commentData.totalPages}
  >
    &gt;
  </button>
</div>


    </div>
   
    <ChatModal/>
    </div>
  );
};

export default ProductDetail;
