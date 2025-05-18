import axios from "axios";
const REST_API_ORDER_BASE_URL="http://localhost:8082/identity/api/order"
export const add_order=async(order)=>{
    return await axios.post(REST_API_ORDER_BASE_URL+"/create-order",order);
}
export const calculate_fee=async(addressTo)=>{
    return await axios.get(REST_API_ORDER_BASE_URL+"/calculate?address="+addressTo);
}
export const getlinkVNPay=async(amount)=>{
    return await axios.post(REST_API_ORDER_BASE_URL+"/pay-vnpay?amount="+amount);
}
export const displayPageAdmin=async(page,size)=>{
    return await axios.get(REST_API_ORDER_BASE_URL+"/admin-page?page="+page+"&size="+size);
}
export const getDetailOrder=async(id)=>{
    return await axios.get(REST_API_ORDER_BASE_URL+"/order-detail?id="+id);
}

export const updateStatusOrder=async(id,status)=>{
    return await axios.put(REST_API_ORDER_BASE_URL+"/update-status?id="+id+"&status="+status);
}

export const getPurchaseByUser=async(id_user)=>{
    return await axios.get(REST_API_ORDER_BASE_URL+"/get-order?id="+id_user);
}

export const handleReturnOrder=async(id,status,reason,description)=>{
    return await axios.put(REST_API_ORDER_BASE_URL+"/handle-return?id="+id+"&status="+status+"&reason="+reason+"&description="+description);
}
export const getRevenueByYear=async(year)=>{
    return await axios.get(REST_API_ORDER_BASE_URL+"/revenue/monthly?year="+year);
}
export const getRevenueByMonth=async(month)=>{
    return await axios.get(REST_API_ORDER_BASE_URL+"/revenue/daily?month="+month);
}