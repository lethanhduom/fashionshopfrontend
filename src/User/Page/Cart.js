import React from "react";
import Header from "../Component/Header";
import Cart from "../Component/ShoppingCart";
import "../Css/Cart.css"
const CartPage=()=>{
    return (

       <div className="product-cart-space">
            <Header/>
             
            <Cart/>
        </div>

    )
}
export default CartPage;