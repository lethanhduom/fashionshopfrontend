import axios from "axios";
const   REST_API_AUTHEN_BASE_URL="http://localhost:8082/identity/api/auth";
export const signin=async(user)=>{
    return await axios.post(REST_API_AUTHEN_BASE_URL+"/sign-in",user);
}
export const active=async(user,code)=>{
    return await axios.post(REST_API_AUTHEN_BASE_URL+"/active"+"?username="+user+"&code="+code);
}
export const sign_up=async(user)=>{
    return await axios.post(REST_API_AUTHEN_BASE_URL+"/sign-up",user);
}

export const getIdCart=async(username)=>{
    return await axios.get(REST_API_AUTHEN_BASE_URL+"/id-cart?username="+username);
}
export const getInforUser=async(username)=>{
    return await axios.get(REST_API_AUTHEN_BASE_URL+"/infor-user?username="+username);
}

export const siginInAdmin=async(admin)=>{
    return await axios.post(REST_API_AUTHEN_BASE_URL+"/signin-admin",admin);
}
export const getAccounts=async(page,size,keyword)=>{
    return await axios.get(REST_API_AUTHEN_BASE_URL+"/get-accounts?page="+page+"&size="+size+"&keyword="+keyword);
}
export const createAccountByAdmin= async(data)=>{
    return await axios.post(REST_API_AUTHEN_BASE_URL+"/create-account",data);
}

export const updateAccountByUser=async(data)=>{
    return await axios.put(REST_API_AUTHEN_BASE_URL+"/update-account",data);
}
export const changePassword=async(change)=>{
    return await axios.put(REST_API_AUTHEN_BASE_URL+"/change-password",change);
}
export const actionUser=async(id)=>{
    return await axios.put(REST_API_AUTHEN_BASE_URL+"/action?id="+id);
}