import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './User/Component/Header';
import Slidebar from './User/Component/Slidebar';
import Dashboard from './Admin/Page/Dashboard';
import Sidebar from './Admin/Component/Sidebar';
import DilysCard from './User/Component/Card';
import Color from './Admin/Page/Color';
import Size from './Admin/Page/Size';
import Home from './User/Page/Home';
import Product from './Admin/Page/Product';
import Login from './User/Page/Login';
import SignUp from './User/Page/SignUp';
import ProductPage from './User/Page/Product';
import ProductDetail from './User/Component/ProductDetail';
import Category from './Admin/Page/Category';
import ProductDetailPage from './User/Page/ProductDetail';
import { Car } from 'lucide-react';
import Cart from './User/Component/ShoppingCart';
import CartPage from './User/Page/Cart';
import CheckoutPage from './User/Component/Checkout';
import Coupon from './Admin/Page/Coupon';
import OrderTrackingPage from './User/Page/OrderTracking';
import CategoryProductPage from './User/Page/Category-Product';
import VNPaySuccessPage from './User/Page/VNPaySuccess';
import Chat from './User/Page/Chat';
import ChatPageUser from './User/Page/ChatPageUser';
import ChatPageAdmin from './Admin/Page/ChatPageAdmin';
import AdminChat from './Admin/Page/AdminChat';
import Order from './Admin/Page/Order';
import AboutUs from './User/Component/AboutUs';
import AboutUsPage from './User/Page/AboutUs';
import CustomerService from './User/Component/Service';
import MyPurchase from './User/Component/HistoryPurchase';
import OrderDetail from './User/Component/OrderDetail';
import OrderDetailPage from './User/Page/OrderDetail';
import HistoryPurchasePage from './User/Page/HistoryPurchase';
import AdminLogin from './Admin/Page/AdminLogin';
import AdminAuth from './Admin/Component/AdminAuth';
import UserAccountPage from './User/Page/UserAccountPage';
import AccountPage from './Admin/Page/AccountPage';
import StatisticsPage from './Admin/Page/StatisticsPage';
import ProductFor from './User/Component/ProductFor';
import Comment from './Admin/Page/Comment';
function App() {
  return (
    <div className="App">
    <BrowserRouter>
     <Routes>
     <Route path="/admin" element={
      <AdminAuth>
        <Color />
      </AdminAuth>
    } />     
     <Route path="/admin/color" element={
      <AdminAuth>
        <Color />
      </AdminAuth>}/>
     <Route path="/admin/size" element={ 
      <AdminAuth>
      <Size/>
      </AdminAuth>}/>
     <Route path="/admin/product" element={<Product/>}/>
     <Route path="/admin/category" element={<Category/>}/>
     <Route path="/admin/coupon" element={<Coupon/>}/>
     <Route path="/admin/chat" element={<AdminChat/>}/>
     <Route path="/admin/order" element={<Order/>}/>
     <Route path="/admin/chat" element={<ChatPageAdmin/>}/>
     <Route path="/admin/login" element={<AdminLogin/>}/>
     <Route path="/admin/account" element={<AccountPage/>}/>
     <Route path="/admin/stats" element={<StatisticsPage/>}/>
      <Route path="/admin/comment" element={<Comment/>}/>
     <Route path="/" element={<Home/>}/>
     <Route path="/login" element={<Login/>}/>
     <Route path="/product" element={<ProductPage/>}/>
     <Route path="/sign-up" element={<SignUp/>}/>
     <Route path="/product-detail/:id" element={<ProductDetailPage/>}/>
     <Route path="/shopping-cart" element={<CartPage/>}/>
     <Route path="/check-out" element={<CheckoutPage/>}/>
     <Route path="/category-product/:id_category" element={<CategoryProductPage/>}/>
     <Route path="/payment/vnpay" element={<VNPaySuccessPage/>}/>
     <Route path="/chat" element={<ChatPageUser/>}/>
    
     <Route path="/about-us" element={<AboutUsPage/>}/>
     <Route path="/contact" element={<CustomerService/>}/>
     <Route path="/history-purchase" element={<HistoryPurchasePage/>}/>
     <Route path="/order-detail/:id_order" element={<OrderDetailPage/>}/>
     <Route path="/user-account" element={<UserAccountPage/>}/>
     <Route path="/product-for/:product_for" element={<ProductFor/>}/>
     </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
