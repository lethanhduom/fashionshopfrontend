import axios from "axios";
const REST_API_COMMENT_BASE_URL="http://localhost:8082/identity/api/comment"
export const createReview=async(review)=>{
    return axios.post(REST_API_COMMENT_BASE_URL+"/create-comment",review);
}
export const getComment=async(id,page,size)=>{
    return axios.get(REST_API_COMMENT_BASE_URL+"/get-comment?id="+id+"&page="+page+"&size="+size);
}
export const getEmotionSummary=async()=>{
    return axios.get(REST_API_COMMENT_BASE_URL+"/summary");
}

export const getEmotionProductSummary=async()=>{
    return axios.get(REST_API_COMMENT_BASE_URL+"/summary-product");
}

export const getNegativeAlertProducts = (threshold = 3) => {
  return axios.get(`${REST_API_COMMENT_BASE_URL}/negative-alert?threshold=${threshold}`);
};

export const getFilteredComments = (productId, emotion) => {
  const params = {};
  if (productId !== null) params.productId = productId;
  if (emotion !== null) params.emotion = emotion;
  return axios.get(`${REST_API_COMMENT_BASE_URL}/filter`, { params });
};
