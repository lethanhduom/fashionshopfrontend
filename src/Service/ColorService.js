import axios from "axios";
const REST_API_COLOR_BASE_URL="http://localhost:8082/identity/api/color"
export const getListDisPlayColor=async (page,size)=>{
    const response=await axios.get(REST_API_COLOR_BASE_URL+"/display"+"?page="+page+"&size"+size);
    return response.data;
}
export const createColor= async(Color)=>{
    return await axios.post(REST_API_COLOR_BASE_URL+"/create",Color);
}
export const updateColor=async(Color)=>{
    return await axios.put(REST_API_COLOR_BASE_URL+"/update",Color);
}

export const getListColor=async()=>{
    return await axios.get(REST_API_COLOR_BASE_URL+"/list");
}


