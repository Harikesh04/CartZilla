import React, { Fragment, useEffect } from "react";
import MetaData from "../layout/MetaData";
import { BsMouse } from "react-icons/bs";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import image from "../../images/hero-img.png";
import { motion } from "framer-motion";
import about from "../../images/about.png";
import data from "../../Data/serviceData";
import ServiceCard from "./ServiceCard";
import Footer from "../layout/Footer/Footer";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

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
      y: "-160%",
      opacity: 0,
    },
    whileInView: {
      y: 0,
      opacity: 1,
    },
  };

  const textOptions = {
    ...headingOptions,
    transition: {
      delay: 0.3,
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

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="CartZilla" />

          <div className="home-hero">
            <div className="hero-left">
              <motion.h1 {...headingOptions}>
                Order Products Faster And Easier
              </motion.h1>
              <motion.p {...textOptions}>
                Order your favorite product at any time and we will deliver them
                right to where you are.
              </motion.p>
              <motion.button data-cursorpointer={true} {...buttonOptions}>
                <a href="#container">Get Started</a>
              </motion.button>
            </div>

            <motion.div {...imgOptions} className="hero-img">
              <img src={image} alt="" />
            </motion.div>
          </div>

          <div className="home-about-section">
            <motion.div {...imgOptions}>
              <img src={about} alt="" />
            </motion.div>
            <div className="home-about-left">
              <motion.h1 {...headingOptions}>
                Find Out A Little More About Us
              </motion.h1>
              <motion.p {...textOptions}>
                We are a company dedicated to the distribution of products by
                delivery to your home or to the place where you are, with the
                best quality of delivery.
              </motion.p>
            </div>
          </div>
          <section className="product-section">
            <motion.h2 {...headingOptions} className="homeheading">
              Featured Products
            </motion.h2>
            <div className="container" id="container">
              {products &&
                products.map((product) => <ProductCard product={product} />)}
            </div>
          </section>

          <div className="home-services-contianer">
            <div className="service-header">
              <motion.h1 {...headingOptions}>Some Services We Offer</motion.h1>
              <motion.p {...textOptions}>
                With our app you can view the route of your order, from our
                local headquarters to the place where you are. Look for the app
                now!
              </motion.p>
            </div>

            <div className="service-image">
              {data.map((data) => {
                return (
                  <ServiceCard
                    bgimage={data.bgImage}
                    image={data.image}
                    title={data.title}
                    disc={data.description}
                  />
                );
              })}
            </div>
          </div>
          <Footer />
        </Fragment>
      )}
    </>
  );
};

export default Home;
