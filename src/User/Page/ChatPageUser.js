import React from "react";
import Header from "../Component/Header";
import Chat from "./Chat";
import { useLocation } from "react-router-dom";
const ChatPageUser=()=>{
    const location = useLocation();
    const { currentUser,  receiveUser,  idProduct } = location.state || {};
    return(
        <>
       <Chat currentUser={currentUser} receiverUser={ receiveUser} id_product={idProduct}/>
          </>
      )
}
export default ChatPageUser;