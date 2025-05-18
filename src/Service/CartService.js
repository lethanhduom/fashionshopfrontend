import axios from "axios";
const   REST_API_AUTHEN_BASE_URL="http://localhost:8082/identity/api/cart";
export const addCart=async(item)=>{
    return await axios.post(REST_API_AUTHEN_BASE_URL+"/add-item",item);
}
export const listCart=async(id)=>{
    return await axios.get(REST_API_AUTHEN_BASE_URL+"/list?id="+id);
}
export const deleteCartItem=async(id)=>{
    return await axios.delete(REST_API_AUTHEN_BASE_URL+"/delete/"+id);
}