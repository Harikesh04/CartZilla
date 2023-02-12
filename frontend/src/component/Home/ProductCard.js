import React from "react";
import { Link } from "react-router-dom";
import { Rating } from "@material-ui/lab";
import { motion } from "framer-motion";


const ProductCard = ({product}) => {
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
  const headingOptions = {
    initial: {
      y: "-100%",
      opacity: 0,
    },
    whileInView: {
      y: 0,
      opacity: 1,
    },
  };
  const buttonOptions = {
    initial: {
      y: "100%",
      opacity: 0,
    },
    whileInView: {
      y: 0,
      opacity: 1,
    },
    transition: {
      delay: 0.3,
      ease: "easeIn",
    },
  };
  const options = {
    
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  
  return (
    <Link className="productCard" to={`/product/${product._id}`}>
      <motion.img {...imgOptions} src={product.images[0].url} alt={product.name} />
      <motion.p {...headingOptions}>{product.name}</motion.p>
      <motion.div {...buttonOptions}>
        <Rating {...options} /> <span className="productCardSpan">({product.numOfReviews} Reviews)</span>
      </motion.div>
      <span>{`₹${product.price}`}</span>
    </Link>
  );
};

export default ProductCard;
