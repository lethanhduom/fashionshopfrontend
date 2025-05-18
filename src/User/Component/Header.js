import { useEffect, useState } from "react";
import Logo from "../../Image/logo-alter-rm.png";
import "../Css/Header.css"; // Import file CSS riêng
import { Link } from "react-router-dom";
import { FaUser, FaShoppingBag, FaHeart, FaTimes, FaQuestionCircle, FaRegCommentDots, FaBox } from "react-icons/fa";
import UserDropdown from "./UserDropDown";

const menuItems = [
  {
    title: "Home",
    path: "/",
  },
  {
    title:"Product",
    path:"/product"
  },
  {
    title: "Women",
    path: "/product-for/woman",
  },
  {
    title: "Men",
    path: "/product-for/man",
  },
  
  {
    title: "About",
    path: "/about-us",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];



function Header() {

  const [isActive, setIsActive] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
   useEffect(() => {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.sub) {
        setIsLoggedIn(true);
      }
    }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); 

  return (
    <header className={`header ${isActive ? "active" : ""}`}>
      <div className="container">
        <div>
          <img className={`logo ${isActive?"active":""}`} src={Logo} alt="Logo" />
        </div>
       
       <nav className="navbar">
       <div className="nav-container">
       <ul className="nav-menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className="nav-item"
              
            >
              <Link to={item.path} className={`nav-link ${isActive?"active":""}`}>
                {item.title}
              </Link>

             
             
             
            </li>
          ))}
        </ul>
       </div>
       
       </nav>
       <div className="icon-container">
       <div className="back-icon">
       {/* <Link to={"/wish-list"}>
       <FaHeart color="black" className="icon" />
       </Link>
       */}
       </div>
       {
        isLoggedIn&&(
          <div className="back-icon">
          <Link to={"/shopping-cart"}>
          <FaShoppingBag color="black" className="icon" />
          </Link>
          
          </div>
        )
       }
         
          
       
          <UserDropdown/>
        </div>
 
        
      </div>
      
      
       
    
    </header>
     
     
    
  );
}


export default Header;
