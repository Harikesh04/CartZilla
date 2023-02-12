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
      {/* <footer id="footer">
            
           <div className="leftfooter">
               <h1>Get to Know Us </h1>
              
              <a href="/about">About Us</a>
              <p>Careers</p>
              <p>Press Releases</p>
              <p>CartZilla Cares</p>
              <p>Gift a smile</p>
              
              
           </div>
           <div className="midfooter">
                <a href="/">CartZilla </a>
               
                <p>Copyrights 2022 &copy; HarikeshSingh</p>
           </div>
           <div className="rightfooter">
               <h1>Links </h1>
               <a href="https://www.linkedin.com/in/harikesh-singh-506503202/">LinkedIn</a>
               <a href="https://www.instagram.com/harikeshsingh_/">Instagram</a>
               <a href="facebook.com">Facebook</a>
               <a href="/Contact">ContactUs</a>

           </div>

          
            
           
       </footer>  */}

      <section className="footer">
        <div className="footer-section1">
          <div className="logo-footer">
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
            <Link to="/about" >
              Sell on Cartzilla
            </Link>
            <Link to="/about" >
              Sell under CartZilla Accelerator
            </Link>
            <Link to="/about" >
              Protect And Build your brand
            </Link>
            <Link to="/about" >
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
