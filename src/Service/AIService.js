import axios from "axios";
 export  const getSentiment= async(text)=>{
    return await axios.post("http://127.0.0.1:8000/analyze-sentiment?text="+text);
}

export const chatWithAI =async(text)=>{
    return await axios.post("http://localhost:8082/identity/api/ai-query/ask",
         { question: text } 
    );
}