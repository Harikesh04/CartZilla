import React from "react";
import "./Home.css";
import { motion } from "framer-motion";
const ServiceCard = ({ bgimage, image, title, disc }) => {
    const imgOptions = {
        initial: {
          scale: 0.1,
          opacity: 0,
        },
        whileInView: {
          scale: 1,
          opacity: 1,
        },
        transition: {
          delay: 0.3,
        },
      };
  return (
    <>
      <motion.div {...imgOptions} className="service-container">
        <img className="innerimage" src={image} alt="" />
        <div className="ser-text">
          <h1>{title}</h1>
          <p>{disc}</p>
        </div>
      </motion.div>
    </>
  );
};

export default ServiceCard;
