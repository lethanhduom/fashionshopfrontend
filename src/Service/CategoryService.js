import axios from "axios";
const REST_API_CATEGORY_BASE_URL="http://localhost:8082/identity/api/category"
export const getListCategory=async(isDelete)=>{
    return await axios.get(REST_API_CATEGORY_BASE_URL+"/list?isDelete="+isDelete)
}
export const getPageCategory=async(page,size,keyword)=>{
    return await axios.get(REST_API_CATEGORY_BASE_URL+"/page"+"?page="+page+"&size"+size+"&keyword="+keyword);
}
export const createCategory=async(data)=>{
    return await axios.post(REST_API_CATEGORY_BASE_URL+"/create",data)
}
export const actionCategory=async(id)=>{
    return await axios.put(REST_API_CATEGORY_BASE_URL+"/action?id="+id);
}
export const getCategory=async(id)=>{
    return await axios.get(REST_API_CATEGORY_BASE_URL+"/get-category?id="+id);
}
export const updateCategory=async(data)=>{
    return await axios.put(REST_API_CATEGORY_BASE_URL+"/update-admin",data);
}