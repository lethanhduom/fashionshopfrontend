import React from "react";
import Chat from "../../User/Page/Chat";


const ChatPageAdmin=()=>{
    const receiveUser={
        id:4,
        role:"user"
    }
    const  currentUser={
        id:7,
        role:"admin"
    }
    return(
        <>

              
       <Chat currentUser={currentUser} receiverUser={ receiveUser} id_product={1}/>
          </>
      )
}
export default ChatPageAdmin;