import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "../Css/Slidebar.css"; // Import file CSS

const slides = [
  {
    title: "SUMMER COLLECTION",
    subtitle: "WOMEN",
    image: require("../../Image/woman_slidebar.png"),
    link: "/",
  },
  {
    title: "AUTUMN COLLECTION",
    subtitle: "MEN",
    image: require("../../Image/man_slidebar.png"),
    link: "/summer",
  }
];

function Slidebar() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      <div className="hero-container">
        {/* Phần văn bản */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="hero-text"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            transition={{ duration: 0.8 }}
          >
            <div className="hero-line"></div>
            <p className="hero-new">New Trend</p>
            <h1>
              {slides[currentIndex].title} <br />
              <span>{slides[currentIndex].subtitle}</span>
            </h1>
            <Link to={slides[currentIndex].link} className="hero-link">
              Discover More
            </Link>
          </motion.div>
        </AnimatePresence>

        {/* Phần hình ảnh */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="hero-image"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.8 }}
          >
            <img src={slides[currentIndex].image} alt="Hero Slide" />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Slidebar;
