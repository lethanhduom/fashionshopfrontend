import axios from "axios";
const REST_API_SIZE_BASE_URL="http://localhost:8082/identity/api/size"
export const getListDisplaySize=async(page,size)=>{
    const response=await axios.get(REST_API_SIZE_BASE_URL+"/display"+"?page="+page+"&size="+size);
    return response.data;
}

export const createSize = async(size)=>{
    return await axios.post(REST_API_SIZE_BASE_URL+"/create",size)
}

export const getListSize=async()=>{
    return await axios.get(REST_API_SIZE_BASE_URL+"/list");
}