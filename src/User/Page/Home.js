import CategoryCard from "../Component/CategoryCard";
import Footer from "../Component/Footer";
import Header from "../Component/Header"
import ClothingSelection from "../Component/HomeSection";
import Slidebar from "../Component/Slidebar"
import "../Css/Home.css"
import CategoryComponent from "../Component/CategoryComponent";
const Home=()=>{
    return(
        <div className="home-space">
            <Header/>
            <Slidebar/>
          <ClothingSelection/>
          <CategoryComponent/>
          <Footer/>
        </div>
        
    )
}
export default Home;