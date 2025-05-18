import axios from "axios";
const REST_API_PRODUCT_BASE_URL="http://localhost:8082/identity/api/product"
export const createProduct=async(product)=>{
    return await axios.post(REST_API_PRODUCT_BASE_URL+"/create",product,
        {
           headers: {
    "Content-Type": "multipart/form-data",
        }
    }
    );
}
export const displayProduct=async(page,size=12,keyword)=>{
    return await axios.get(REST_API_PRODUCT_BASE_URL+"/display"+"?page="+page+"&size="+size+"&keyword="+keyword);
}
export const getDetailProduct=async(id)=>{
    return await axios.get(REST_API_PRODUCT_BASE_URL+"/detail/"+id);
}
export const displayProductFollowCategory=async(id,page,size=12)=>{
    return await axios.get(REST_API_PRODUCT_BASE_URL+"/category-product?id_category="+id+"&page="+page+"&size="+size);
}
export const displayProductAdmin=async(page,size=10,keyword)=>{
    return await axios.get(REST_API_PRODUCT_BASE_URL+"/display-admin?page="+page+"&size="+size+"&keyword="+keyword);
}
export const actionProduct=async(id)=>{
    return await axios.put(REST_API_PRODUCT_BASE_URL+"/action?id="+id);
}
export const updateProduct =async(data)=>{
    return await axios.put(REST_API_PRODUCT_BASE_URL+"/update-product",data);
}
export const updateDetailProduct=async(data)=>{
    return await axios.put(REST_API_PRODUCT_BASE_URL+"/update-detail",data);
}
export const displayProductFollowProductFo=async(page,size,key)=>{
    return await axios.get(REST_API_PRODUCT_BASE_URL+"/display-productfor?page="+page+"&size="+size+"&key="+key);
}

    