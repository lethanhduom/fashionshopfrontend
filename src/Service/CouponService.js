import axios from "axios";
const REST_API_COUPON_BASE_URL="http://localhost:8082/identity/api/coupon"
export const getPageCoupon= async(isDelete,page,size)=>{
    return await axios.get(REST_API_COUPON_BASE_URL+"/get-page?isDelete="+isDelete+"&page="+page+"&size="+size)
}
export const getDetailCoupon=async(id)=>{
    return await axios.get(REST_API_COUPON_BASE_URL+"/get-detail?id="+id);
}
export const getListCouponActive=async()=>{
    return await axios.get(REST_API_COUPON_BASE_URL+"/coupon-active");
}
export const createCoupon=async(data)=>{
    return await axios.post(REST_API_COUPON_BASE_URL+"/create",data);
}
export const updateCoupon=async(data)=>{
    return await axios.put(REST_API_COUPON_BASE_URL+"/update-coupon",data);
}