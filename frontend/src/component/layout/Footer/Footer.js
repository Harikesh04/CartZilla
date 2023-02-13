import React, { Fragment } from "react";
import logo from "../../../images/logo.png";
import "./Footer.css";
import { BsInstagram } from "react-icons/bs";
import { BsLinkedin } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { AiFillGithub } from "react-icons/ai";
import { Link } from "react-router-dom";
import { MdCopyright } from "react-icons/md";

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <Fragment>
      

      <section className="footer">
        <div className="footer-section1">
          <div className="logo-footer-home">
            <img src={logo} alt="" />
          </div>
          <div className="icons">
            <AiFillGithub />
            <BsFacebook />
            <BsInstagram />
            <BsLinkedin />
            <BsTwitter />
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-heading">Contact Us</div>
          <div className="footer-navlinks">
            <Link to="/about" >
              harikeshkrsingh20@gmail.com
            </Link>
            <Link to="/about" >
              +916264841277
            </Link>
            <Link to="/about" >
              India
            </Link>
           
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-heading">Make money with us</div>
          <div className="footer-navlinks">
            <Link to="/" >
              Sell on Cartzilla
            </Link>
            <Link to="/" >
              Sell under CartZilla Accelerator
            </Link>
            <Link to="/" >
              Protect And Build your brand
            </Link>
            <Link to="/" >
              Become an Affiliate
            </Link>
          </div>
        </div>
        <div className="footer-section">
          <div className="footer-heading">Quick Links</div>
          <div className="footer-navlinks">
            <Link to="/about" >
             About Us
            </Link>
            <Link to="/about" >
              Home
            </Link>
            <Link to="/about" >
              Sign Up
            </Link>
            <Link to="/about" >
             Products
            </Link>
            <Link to="/about" >
            Contact
            </Link>
            <Link to="/about" >
            Search
            </Link>
            <Link to="/about" >
           Cart
            </Link>
          </div>
        </div>
        
      </section>
      <div className="bottom-footer"><MdCopyright/>  Copyright {year} CartZilla - All Rights Reserved </div>
    </Fragment>
  );
};

export default Footer;
